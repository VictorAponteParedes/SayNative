export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPromotions: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  user?: RegisteredUser;
  id?: string;
  email?: string;
  fullName?: string;
  name?: string;
  [key: string]: unknown;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  acceptedTerms: boolean;
  acceptedPromotions?: boolean;
  countryCode?: string;
  countryFlag?: string;
  nativeLanguageCode?: string;
  learningLanguageCode?: string;
}

export interface UserLanguageItem {
  id: string;
  languageCode: string;
  languageName: string;
  flagEmoji: string;
  type: 'NATIVE' | 'LEARNING';
  cefrLevel?: string | null;
  targetLevel?: string | null;
  progressPercentage?: number;
}

export interface RegisteredUser {
  id: string;
  email: string;
  fullName: string;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  phone?: string | null;
  bio?: string | null;
  countryCode?: string | null;
  countryFlag?: string | null;
  isVerified: boolean;
  isAvailableToTeach: boolean;
  earningRatePerMin: number;
  learningCostPerMin: number;
  rating: number;
  totalCalls: number;
  hoursPracticed: number;
  reviewCount: number;
  coins?: number;
  acceptedTerms: boolean;
  termsAcceptedAt?: string | null;
  acceptedPromotions: boolean;
  userLanguages?: UserLanguageItem[];
  createdAt: string;
  updatedAt: string;
}
