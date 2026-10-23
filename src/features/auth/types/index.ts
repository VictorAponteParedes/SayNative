export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPromotions: boolean;
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
  acceptedTerms: boolean;
  termsAcceptedAt?: string | null;
  acceptedPromotions: boolean;
  userLanguages?: UserLanguageItem[];
  createdAt: string;
  updatedAt: string;
}
