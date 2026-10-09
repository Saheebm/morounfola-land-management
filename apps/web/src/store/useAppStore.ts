import { create } from 'zustand';

export type UserRole =
  | 'citizen'
  | 'dolil-lekhok'
  | 'sub-registrar'
  | 'mutation-officer'
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

interface AppState {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  unreadNotificationsCount: number;
  setUnreadNotificationsCount: (count: number) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeRole: 'citizen',
  setActiveRole: (role) => set({ activeRole: role }),
  language: 'bn',
  setLanguage: (lang) => set({ language: lang }),
  unreadNotificationsCount: 0,
  setUnreadNotificationsCount: (count) => set({ unreadNotificationsCount: count }),
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4500);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
