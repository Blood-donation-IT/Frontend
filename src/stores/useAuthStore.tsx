import { create } from 'zustand';
// import * as SecureStore from 'expo-secure-store';
import api from '../api/api';
import { UpdateUserPayload, User,  } from '../interfaces/user';
import { Application } from '../interfaces/application';
import { providerSignOut } from "../services/authSignOut";
import { da } from 'date-fns/locale';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  donations: Application[];
  isLoadingDonations: boolean;
  checkAuth: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  loginAction: (credentials: any) => Promise<any>;
  registerAction: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  syncWithFirebase: (firebaseUser: any, idToken: string | null) => User;
  updateUserAction: (newData: UpdateUserPayload) => Promise<void>;
  fetchUserDonations: () => Promise<void>;
  createDonationAction: (donationData: any) => Promise<Application>;
  saveHealthTest: (answersData: any, bloodType: User["blood_type"]) => Promise<void>;
  cancelDonationAction: (applicationId: string) => Promise<void>;
}

const DEFAULT_USER: User = {
  id: '',
  name: 'Гість',
  email: '',
  avatar: '',
  phone: '',
  blood_type: 'N/A',
  has_donorBook: false,
  donations_count: 0,
  last_donation: null,
  donor_status: 'Новачок',
  lives_saved_count: '0',
  test_is_done: true,
};

export const useAuthStore = create<AuthState>((set,get) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  donations: [],
  isLoadingDonations: false,

  addDonation: (newDonation: Application) => {
    set((state) => ({
      // Створюємо НОВИЙ масив: нова донація + всі старі
      donations: [newDonation, ...state.donations]
    }));
  },

  cancelDonationAction: async (applicationId: string) => {
    try {
      const response = await api.patch(`/api/v1/donations/cancel_application/${applicationId}`);

      if (response.status === 200 || response.status === 204) {
        set((state) => ({
          donations: state.donations.map((donation) =>
            donation.application_id === applicationId
              ? { ...donation, status: 'Canceled' }
              : donation
          ),
        }));
      }
    } catch (error) {
      console.error("Помилка скасування заявки:", error);
      throw error; // Викидаємо помилку далі, щоб компонент міг показати Alert
    }
  },

  fetchProfile: async () => {
    try {
      const { data } = await api.get('/api/v1/users/me');
      console.log("user me : ",data)
      const mergedUser: User = {
        ...DEFAULT_USER,
        ...data,
      }

      set({ user: mergedUser, isAuth: true });
    } catch (e) {
      console.error("Помилка завантаження профілю", e);
      get().logout(); 
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('accessToken')//await SecureStore.getItemAsync('accessToken');
      console.log(token,"token")
      
      if (token) {
        await get().fetchProfile();
      } else {
        set({ isAuth: false, user: null });
      }
    } catch (e) {
      localStorage.removeItem('accessToken')
      //await SecureStore.deleteItemAsync('accessToken');
      set({ isAuth: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  loginAction: async (credentials) => {
    try {
      const response = await api.post("/api/v1/auth/login", credentials);
      const { access_token, refresh_token, user_id } = response.data;

      if (access_token) {
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)
        // await SecureStore.setItemAsync('accessToken', access_token);
        // await SecureStore.setItemAsync('refreshToken', refresh_token);

        await get().fetchProfile();
      }
      return response.data;
    } catch (error) {
      console.log("store: ",error)
    }
    
  },

  registerAction: async (registerData) => {
    try {
      console.log(registerData)
      const response = await api.post("/api/v1/auth/register", registerData);
      
      const { access_token, refresh_token, user_id } = response.data;

      if (access_token) {
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)
        // await SecureStore.setItemAsync('accessToken', access_token);
        // await SecureStore.setItemAsync('refreshToken', refresh_token);

        await get().fetchProfile();
      }
      return response.data;
    } catch (error) {
      console.log("store: ",error)
    }
    
  },

  fetchUserDonations: async () => {
    set({ isLoadingDonations: true });
    try {
      const user_id = get().user?.id;
      const response = await api.get(`/api/v1/donations/get_applications`, {
        params: { user_id }
      });
      console.log(response.data)
      response.data.applications.push(
        {
          application_day: "2026-02-14",
          application_id: "7453810883081281536",
          application_time: "H%:00",
          blood_type: "O+",
          created_at: "2026-04-25T07:59:01.325642",
          location_id: "Saint Panteleimon Hospital",
          slot_index: 4,
          status: "pending",//Successfully
          updated_at: null,
        }
      )
      set({ donations: response.data.applications, isLoadingDonations: false });
    } catch (error) {
      console.error("Помилка отримання донацій:", error);
      set({ isLoadingDonations: false });
    }
  },

  createDonationAction: async (donationData) => {
    try { 
      
      const response = await api.post("/api/v1/donations/create_application", donationData);
      console.log(response)
      
      if (response.status === 201 || response.status === 200) {
        await get().fetchUserDonations(); 
        return response.data;
      }
    } catch (error) {
      console.error("Помилка створення заявки:", error);
      throw error;
    }
  },

  syncWithFirebase: async (firebaseUser: any, idToken: string | null) => {
    if (!firebaseUser || !idToken) return;

    try {
      console.log(firebaseUser)
      const { data } = await api.post('/api/v1/oauth/google/', { 
        id_token: idToken,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        avatar: firebaseUser.photoURL,
      });

      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token)
        //await SecureStore.setItemAsync('accessToken', data.token);
      }
      console.log(data)

      set({ 
          user: { 
              ...DEFAULT_USER,
              id: data.user_id,
              name: data.name || firebaseUser.displayName,
              email: data.email || firebaseUser.email,
              avatar: data.avatar || firebaseUser.photoURL,
              blood_type: data.blood_type || "N/A",
              donations_count: data.donations_count || 0,
              test_is_done: data.is_new_user,
          } as User, 
          isAuth: true 
      });

      return data

    } catch (error) {
        console.error("Помилка синхронізації з бекендом:", error);
        

        set({ 
            user: {
                ...DEFAULT_USER,
                id: "0",
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                avatar: firebaseUser.photoURL,
            } as User, 
            isAuth: true 
        });
    }
  },

  updateUserAction: async (newData) => {
    try {
        const { data } = await api.post('/api/v1/users/edit_profile', newData);
        
        set((state) => ({
          user: state.user ? { ...state.user, ...newData } : null
        }));
    } catch (error) {
        console.error("Update failed", error);
        throw error;
    }
  },

  saveHealthTest: async (answersData: any, bloodType: User["blood_type"]) => {
    try {
      const formattedAnswers = Object.keys(answersData).map(id => ({
        questionId: parseInt(id),
        value: answersData[id] === "true"
      }));

      console.log(answersData)

      const requestBody = {
        userId: get().user?.id || 0,
        completedAt: new Date().toISOString(),
        answers: formattedAnswers,
        bloodType: bloodType
      };

      console.log(requestBody)

      await api.post('/api/v1/users/post_test', requestBody);

      set((state) => ({
        user: state.user ? { ...state.user, blood_type: bloodType } : null
      }));

      const currentUser = get().user;
      if (currentUser) {
        localStorage.setItem('user_profile', JSON.stringify(currentUser));
      }

    } catch (error) {
      console.error("Store: Error posting health test", error);

      throw error;
    }
  },

  logout: async () => {
    try {
      await providerSignOut();
    } catch (error) {
      console.log("Google/Firebase signout error:", error);
    }

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    // await SecureStore.deleteItemAsync('accessToken');
    // await SecureStore.deleteItemAsync('refreshToken');

    set({ user: null, isAuth: false });
  }
}));