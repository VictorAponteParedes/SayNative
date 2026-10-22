import { UserLanguage } from '../../../store/useAuthStore';

export interface ProfileStats {
  hoursPracticed: number;
  totalCalls: number;
  rating: number;
}

export interface EditProfileFormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
  countryCode: string;
  countryFlag: string;
}

export interface UserLanguageProgress extends UserLanguage {
  progressPercentage?: number;
  targetLevel?: string;
}
