import { create } from 'zustand';

interface AppConfigState {
  currentTab: 'Inicio' | 'Explorar' | 'Chats' | 'Perfil';
  unreadNotifications: number;
  setCurrentTab: (tab: 'Inicio' | 'Explorar' | 'Chats' | 'Perfil') => void;
}

export const useAppConfigStore = create<AppConfigState>((set) => ({
  currentTab: 'Inicio',
  unreadNotifications: 2,
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
