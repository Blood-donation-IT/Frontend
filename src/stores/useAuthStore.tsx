import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../api/api';
import { User } from '../interfaces/user';

import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from '../screens/googleLogin';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  donations: any[];
  isLoadingDonations: boolean;
  checkAuth: () => Promise<void>;
  fetchProfile: () => Promise<void>; // Додали сюди
  loginAction: (credentials: any) => Promise<any>; // Повертаємо any або data
  registerAction: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  syncWithFirebase: (firebaseUser: any, idToken: string | null) => Promise<void>;
  updateUserAction: (newData:any) => Promise<void>;
  fetchUserDonations: () => Promise<void>; // Отримати список записів юзера
  createDonationAction: (donationData: any) => Promise<any>; // Створити новий запис
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
};

export const useAuthStore = create<AuthState>((set,get) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  donations: [],
  isLoadingDonations: false,

  fetchProfile: async () => {
    try {
      const { data } = await api.get('/api/v1/users/me');
      
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
      const token = await SecureStore.getItemAsync('accessToken');
      console.log(token,"token")
      
      if (token) {
        await get().fetchProfile();
      } else {
        set({ isAuth: false, user: null });
      }
    } catch (e) {
      await SecureStore.deleteItemAsync('accessToken');
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
        await SecureStore.setItemAsync('accessToken', access_token);
        await SecureStore.setItemAsync('refreshToken', refresh_token);

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
        await SecureStore.setItemAsync('accessToken', access_token);
        await SecureStore.setItemAsync('refreshToken', refresh_token);

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
        const { data } = await api.post('/api/v1/auth/google-sync', { 
            token: idToken 
        });

        if (data.token) {
            await SecureStore.setItemAsync('accessToken', data.token);
        }

        set({ 
            user: { 
                ...DEFAULT_USER,
                id: firebaseUser.id, 
                name: data.name || firebaseUser.name,
                email: data.email || firebaseUser.email,
                avatar: data.avatar || firebaseUser.photo,
                blood_type: data.blood_type || "N/A",
                donations_count: data.donations_count || 0,
            } as User, 
            isAuth: true 
        });

    } catch (error) {
        console.error("Помилка синхронізації з бекендом:", error);

        set({ 
            user: {
                ...DEFAULT_USER,
                id: firebaseUser.id, 
                name: firebaseUser.name,
                email: firebaseUser.email,
                avatar: firebaseUser.photo,
            } as User, 
            isAuth: true 
        });
    }
  },

  updateUserAction: async (newData) => {
    try {
        const { data } = await api.patch('/api/v1/user/update', newData);
        
        set((state) => ({
          user: state.user ? { ...state.user, ...newData } : null
        }));
    } catch (error) {
        console.error("Update failed", error);
        throw error;
    }
    },

  logout: async () => {
    try {
      await signOut()
    } catch (error) {
      console.log("Google/Firebase signout error:", error);
    }

    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');

    set({ user: null, isAuth: false });
  }
}));