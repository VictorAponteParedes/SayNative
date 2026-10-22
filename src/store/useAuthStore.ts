import { create } from 'zustand';

export interface UserLanguage {
  code: string;
  name: string;
  flag: string;
  level?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  coins: number;
  nativeLanguage: UserLanguage;
  learningLanguage: UserLanguage;
  isAvailableToTeach: boolean;
  earningRatePerMin: number;
  learningCostPerMin: number;
}

interface AuthState {
  user: UserProfile;
  setAvailableToTeach: (available: boolean) => void;
  updateLearningLanguage: (language: UserLanguage) => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'usr_victor_1',
    name: 'Victor',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coins: 150,
    nativeLanguage: {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',
    },
    learningLanguage: {
      code: 'en',
      name: 'Inglés',
      flag: '🇺🇸',
      level: 'B1',
    },
    isAvailableToTeach: true,
    earningRatePerMin: 7,
    learningCostPerMin: 10,
  },
  setAvailableToTeach: (available) =>
    set((state) => ({
      user: { ...state.user, isAvailableToTeach: available },
    })),
  updateLearningLanguage: (language) =>
    set((state) => ({
      user: { ...state.user, learningLanguage: language },
    })),
  addCoins: (amount) =>
    set((state) => ({
      user: { ...state.user, coins: state.user.coins + amount },
    })),
  deductCoins: (amount) =>
    set((state) => ({
      user: { ...state.user, coins: Math.max(0, state.user.coins - amount) },
    })),
}));
