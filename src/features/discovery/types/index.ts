export interface SpeakerUser {
  id: string;
  name: string;
  age?: number | null;
  avatarUrl: string;
  countryFlag: string;
  isOnline: boolean;
  isVerified?: boolean;
  badge?: 'SUPER TUTOR' | string;
  rating: number;
  reviewsCount: number;
  ratePerMinute: number;
  nativeLanguages: string;
  learningLanguages: string;
  tags: string[];
}

export interface BackendUserItem {
  id: string;
  fullName?: string;
  birthDate?: string | Date | null;
  avatar?: { url?: string } | null;
  countryFlag?: string | null;
  countryCode?: string | null;
  isVerified?: boolean;
  isAvailableToTeach?: boolean;
  earningRatePerMin?: number;
  learningCostPerMin?: number;
  coins?: number;
  rating?: number;
  reviewCount?: number;
  bio?: string | null;
  userLanguages?: {
    languageCode: string;
    proficiencyLevel: string;
    isNative: boolean;
  }[];
}

export type ExploreFilterType = 'online' | 'native_english' | 'top_rated';
export type ExploreSortType = 'relevant' | 'rating' | 'price_low' | 'price_high';
