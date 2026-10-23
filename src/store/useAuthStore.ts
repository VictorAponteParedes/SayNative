import { create } from 'zustand';

export interface UserLanguage {
  code: string;
  name: string;
  flag: string;
  level?: string;
  progressPercentage?: number;
  targetLevel?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatarUrl: string;
  countryCode?: string;
  countryFlag?: string;
  isVerified?: boolean;
  acceptedTerms?: boolean;
  coins: number;
  nativeLanguage: UserLanguage;
  learningLanguage: UserLanguage;
  learningLanguagesList?: UserLanguage[];
  isAvailableToTeach: boolean;
  earningRatePerMin: number;
  learningCostPerMin: number;
  hoursPracticed: number;
  totalCalls: number;
  rating: number;
  reviewCount: number;
  memberSince?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
  setAuthenticated: (status: boolean) => void;
  setAvailableToTeach: (available: boolean) => void;
  updateLearningLanguage: (language: UserLanguage) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  user: {
    id: 'f28083a9-9f35-488b-857a-0d127eb5ef7d',
    name: 'Victor Aponte',
    email: 'vaponte520@gmail.com',
    phone: '',
    bio: '',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    countryCode: 'ES',
    countryFlag: '🇪🇸',
    isVerified: false,
    acceptedTerms: true,
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
      level: 'Nivel B1 · Intermedio',
      progressPercentage: 60,
      targetLevel: 'B2',
    },
    learningLanguagesList: [
      {
        code: 'en',
        name: 'Inglés',
        flag: '🇺🇸',
        level: 'Nivel B1 · Intermedio',
        progressPercentage: 60,
        targetLevel: 'B2',
      },
    ],
    isAvailableToTeach: true,
    earningRatePerMin: 7,
    learningCostPerMin: 10,
    hoursPracticed: 4.5,
    totalCalls: 12,
    rating: 4.9,
    reviewCount: 28,
    memberSince: 'Octubre 2024',
  },
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setAvailableToTeach: (available) =>
    set((state) => ({
      user: { ...state.user, isAvailableToTeach: available },
    })),
  updateLearningLanguage: (language) =>
    set((state) => ({
      user: { ...state.user, learningLanguage: language },
    })),
  updateUserProfile: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
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
