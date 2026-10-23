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
  countryCode: string;
  countryFlag: string;
  isVerified: boolean;
  acceptedTerms: boolean;
  coins: number;
  nativeLanguage: UserLanguage;
  learningLanguage: UserLanguage;
  learningLanguagesList: UserLanguage[];
  isAvailableToTeach: boolean;
  earningRatePerMin: number;
  learningCostPerMin: number;
  hoursPracticed: number;
  totalCalls: number;
  rating: number;
  reviewCount: number;
  memberSince?: string;
}

export interface BackendUserPayload {
  id: string;
  email: string;
  fullName?: string;
  name?: string;
  phone?: string | null;
  bio?: string | null;
  avatar?: { url?: string } | null;
  avatarUrl?: string | null;
  avatarId?: string | null;
  countryCode?: string | null;
  countryFlag?: string | null;
  isVerified?: boolean;
  isAvailableToTeach?: boolean;
  earningRatePerMin?: number;
  learningCostPerMin?: number;
  rating?: number | string;
  totalCalls?: number;
  hoursPracticed?: number | string;
  reviewCount?: number;
  acceptedTerms?: boolean;
  coins?: number;
  userLanguages?: Array<{
    id?: string;
    languageCode: string;
    languageName: string;
    flagEmoji?: string;
    type: 'NATIVE' | 'LEARNING';
    cefrLevel?: string | null;
    targetLevel?: string | null;
    progressPercentage?: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export const EMPTY_USER: UserProfile = {
  id: '',
  name: '',
  email: '',
  phone: '',
  bio: '',
  avatarUrl: '',
  countryCode: 'ES',
  countryFlag: '🇪🇸',
  isVerified: false,
  acceptedTerms: false,
  coins: 0,
  nativeLanguage: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  },
  learningLanguage: {
    code: 'en',
    name: 'Inglés',
    flag: '🇺🇸',
    level: 'Nivel A1 · Principiante',
    progressPercentage: 0,
    targetLevel: 'B2',
  },
  learningLanguagesList: [
    {
      code: 'en',
      name: 'Inglés',
      flag: '🇺🇸',
      level: 'Nivel A1 · Principiante',
      progressPercentage: 0,
      targetLevel: 'B2',
    },
  ],
  isAvailableToTeach: false,
  earningRatePerMin: 7,
  learningCostPerMin: 10,
  hoursPracticed: 0,
  totalCalls: 0,
  rating: 5.0,
  reviewCount: 0,
  memberSince: '',
};

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
  setAuthenticated: (status: boolean) => void;
  setUser: (userData: Partial<UserProfile>) => void;
  setUserFromBackend: (backendUser: BackendUserPayload) => void;
  setAvailableToTeach: (available: boolean) => void;
  updateLearningLanguage: (language: UserLanguage) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: EMPTY_USER,
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
      isAuthenticated: true,
    })),
  setUserFromBackend: (backendUser) =>
    set((state) => {
      let nativeLang = state.user.nativeLanguage;
      let learningLang = state.user.learningLanguage;
      const learningList: UserLanguage[] = [];

      if (backendUser.userLanguages && backendUser.userLanguages.length > 0) {
        for (const ul of backendUser.userLanguages) {
          const mapped: UserLanguage = {
            code: ul.languageCode,
            name: ul.languageName,
            flag: ul.flagEmoji || '🌐',
            level: ul.cefrLevel || undefined,
            targetLevel: ul.targetLevel || undefined,
            progressPercentage: ul.progressPercentage ?? 0,
          };
          if (ul.type === 'NATIVE') {
            nativeLang = mapped;
          } else {
            learningList.push(mapped);
          }
        }
        if (learningList.length > 0) {
          learningLang = learningList[0];
        }
      }

      const formattedMemberSince = backendUser.createdAt
        ? new Date(backendUser.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
          })
        : state.user.memberSince || 'Reciente';

      return {
        isAuthenticated: true,
        user: {
          ...state.user,
          id: backendUser.id,
          name: backendUser.fullName || backendUser.name || state.user.name,
          email: backendUser.email || state.user.email,
          phone: backendUser.phone ?? state.user.phone,
          bio: backendUser.bio ?? state.user.bio,
          avatarUrl:
            backendUser.avatar?.url ||
            backendUser.avatarUrl ||
            state.user.avatarUrl ||
            '',
          countryCode: backendUser.countryCode || state.user.countryCode,
          countryFlag: backendUser.countryFlag || state.user.countryFlag,
          isVerified: backendUser.isVerified ?? state.user.isVerified,
          isAvailableToTeach:
            backendUser.isAvailableToTeach ?? state.user.isAvailableToTeach,
          earningRatePerMin:
            backendUser.earningRatePerMin ?? state.user.earningRatePerMin,
          learningCostPerMin:
            backendUser.learningCostPerMin ?? state.user.learningCostPerMin,
          rating:
            backendUser.rating !== undefined
              ? Number(backendUser.rating)
              : state.user.rating,
          totalCalls: backendUser.totalCalls ?? state.user.totalCalls,
          hoursPracticed:
            backendUser.hoursPracticed !== undefined
              ? Number(backendUser.hoursPracticed)
              : state.user.hoursPracticed,
          reviewCount: backendUser.reviewCount ?? state.user.reviewCount,
          acceptedTerms: backendUser.acceptedTerms ?? state.user.acceptedTerms,
          coins: backendUser.coins !== undefined ? backendUser.coins : state.user.coins,
          nativeLanguage: nativeLang,
          learningLanguage: learningLang,
          learningLanguagesList:
            learningList.length > 0 ? learningList : state.user.learningLanguagesList,
          memberSince: formattedMemberSince,
        },
      };
    }),
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
  logout: () =>
    set({
      isAuthenticated: false,
      user: EMPTY_USER,
    }),
}));
