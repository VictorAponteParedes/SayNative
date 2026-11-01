import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PrivacySettings } from '../types';

interface PrivacyState {
  settings: PrivacySettings;
  updateSetting: <K extends keyof PrivacySettings>(key: K, value: PrivacySettings[K]) => void;
  setAllSettings: (settings: Partial<PrivacySettings>) => void;
}

export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set) => ({
      settings: {
        hideAge: true,
        reputationFilter: true,
        readReceipts: true,
      },
      updateSetting: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      setAllSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
    }),
    {
      name: '@saynative_privacy_settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
