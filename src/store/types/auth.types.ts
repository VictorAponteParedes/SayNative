export interface UserLanguage {
  code: string;
  name: string;
  flag: string;
  level?: string;
  progressPercentage?: number;
  targetLevel?: string;
  isNative?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  birthDate?: string | null;
  avatarUrl: string;
  countryCode: string;
  countryFlag: string;
  isVerified: boolean;
  acceptedTerms: boolean;
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
  coins: number;
  memberSince?: string;
}

export interface BackendUserPayload {
  id: string;
  email: string;
  fullName?: string;
  name?: string;
  phone?: string | null;
  bio?: string | null;
  birthDate?: string | Date | null;
  avatar?: { url?: string } | null;
  avatarUrl?: string | null;
  avatarId?: string | null;
  countryCode?: string | null;
  countryFlag?: string | null;
  isVerified?: boolean;
  settings?: {
    isAvailableToTeach?: boolean;
    earningRatePerMin?: number;
    learningCostPerMin?: number;
    acceptedTerms?: boolean;
    termsAcceptedAt?: string | null;
    acceptedPromotions?: boolean;
  };
  stats?: {
    rating?: number | string;
    totalCalls?: number;
    hoursPracticed?: number | string;
    reviewCount?: number;
  };
  wallet?: {
    id?: string;
    balance?: number;
  };
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
    progressPercentage: 20,
    targetLevel: 'A2',
  },
  learningLanguagesList: [
    {
      code: 'en',
      name: 'Inglés',
      flag: '🇺🇸',
      level: 'Nivel A1 · Principiante',
      progressPercentage: 20,
      targetLevel: 'A2',
    },
  ],
  isAvailableToTeach: false,
  earningRatePerMin: 7,
  learningCostPerMin: 10,
  hoursPracticed: 0,
  totalCalls: 0,
  rating: 5.0,
  reviewCount: 0,
  coins: 0,
  memberSince: '',
};

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: UserProfile;
  isHydrated: boolean;
  setAuthenticated: (status: boolean) => void;
  setTokens: (tokens: { token?: string | null; refreshToken?: string | null }) => void;
  setUser: (userData: Partial<UserProfile>) => void;
  setUserFromBackend: (backendUser: BackendUserPayload) => void;
  setAvailableToTeach: (available: boolean) => void;
  updateLearningLanguage: (language: UserLanguage) => void;
  addOrUpdateUserLanguage: (language: UserLanguage) => void;
  removeUserLanguage: (code: string) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
  setHydrated: (status: boolean) => void;
}
