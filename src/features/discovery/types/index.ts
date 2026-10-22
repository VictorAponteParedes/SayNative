export interface SpeakerUser {
  id: string;
  name: string;
  age: number;
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

export type ExploreFilterType = 'online' | 'native_english' | 'top_rated';
export type ExploreSortType = 'relevant' | 'rating' | 'price_low' | 'price_high';
