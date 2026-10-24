import { UserLanguage } from '@/store/useAuthStore';

export interface ProfileStats {
  hoursPracticed: number;
  totalCalls: number;
  rating: number;
}

export interface EditProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  birthDate?: string;
  avatarUrl?: string;
  countryCode?: string;
  countryFlag?: string;
}

export interface UserLanguageProgress extends UserLanguage {
  progressPercentage?: number;
  targetLevel?: string;
}
