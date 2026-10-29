import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCoinsStore } from '@/features/coins/store/useCoinsStore';
import {
  AuthState,
  EMPTY_USER,
} from './types/auth.types';
import { mapBackendUserToUserProfile } from './utils/authMappers';

export * from './types/auth.types';
export * from './utils/authMappers';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      user: EMPTY_USER,
      isHydrated: false,
      setHydrated: (status) => set({ isHydrated: status }),
      setTokens: ({ token, refreshToken }) =>
        set((state) => ({
          token: token !== undefined ? token : state.token,
          refreshToken:
            refreshToken !== undefined ? refreshToken : state.refreshToken,
        })),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
          isAuthenticated: true,
        })),
      setUserFromBackend: (backendUser) => {
        if (backendUser.coins !== undefined) {
          useCoinsStore.getState().setCoins(Number(backendUser.coins));
        }
        set((state) => ({
          isAuthenticated: true,
          user: mapBackendUserToUserProfile(state.user, backendUser),
        }));
      },
      setAvailableToTeach: (available) =>
        set((state) => ({
          user: { ...state.user, isAvailableToTeach: available },
        })),
      updateLearningLanguage: (language) =>
        set((state) => ({
          user: { ...state.user, learningLanguage: language },
        })),
      addOrUpdateUserLanguage: (language) =>
        set((state) => {
          const currentList = Array.isArray(state.user.learningLanguagesList)
            ? [...state.user.learningLanguagesList]
            : [state.user.learningLanguage];

          // Si el usuario edita o marca el idioma nativo principal
          if (language.code === state.user.nativeLanguage.code && language.isNative) {
            return {
              user: {
                ...state.user,
                nativeLanguage: {
                  ...language,
                  isNative: true,
                },
              },
            };
          }

          const existingIdx = currentList.findIndex(
            (item) => item.code === language.code
          );

          if (existingIdx >= 0) {
            currentList[existingIdx] = language;
          } else {
            currentList.push(language);
          }

          return {
            user: {
              ...state.user,
              learningLanguage: language.isNative
                ? state.user.learningLanguage
                : language,
              learningLanguagesList: currentList,
            },
          };
        }),
      removeUserLanguage: (code) =>
        set((state) => {
          const currentList = Array.isArray(state.user.learningLanguagesList)
            ? state.user.learningLanguagesList
            : [state.user.learningLanguage];

          const filtered = currentList.filter((item) => item.code !== code);
          const nextLearning =
            filtered.find((item) => !item.isNative) ||
            filtered[0] ||
            state.user.learningLanguage;

          return {
            user: {
              ...state.user,
              learningLanguage: nextLearning,
              learningLanguagesList: filtered,
            },
          };
        }),
      updateUserProfile: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),
      logout: () => {
        useCoinsStore.getState().resetCoins();
        set({
          isAuthenticated: false,
          token: null,
          refreshToken: null,
          user: EMPTY_USER,
        });
      },
    }),
    {
      name: 'saynative-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
