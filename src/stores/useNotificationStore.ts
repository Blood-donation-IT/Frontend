import { create } from 'zustand';
import api from '../api/api'; 
import { Notification } from '../interfaces/notification';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  markAsRead: (ids: number | number[]) => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/api/v1/notifications/get_notifications');
      const data = response.data.notifications.map((n: any) => ({
        ...n,
        date: new Date(n.created_at) 
      }));
      set({ notifications: data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ loading: false });
    }
  },

  markAsRead: async (ids) => {
    const idArray = Array.isArray(ids) ? ids : [ids];
    
    if (idArray.length === 0) return;

    try {
      await api.post('/notifications/mark_read', {
        notification_ids: idArray
      });

      set({
        notifications: get().notifications.map(n => 
          idArray.includes(n.notification_id) ? { ...n, is_read: true } : n
        )
      });
    } catch (error) {
      console.error("Помилка при позначанні прочитаним:", error);
    }
  },
}));