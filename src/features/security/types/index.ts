export interface BlockedUser {
  id: string;
  name: string;
  countryCode: string;
  avatarUrl?: string;
  blockedDate: string;
  reasonKey: string;
}

export interface PrivacySettings {
  hideAge: boolean;
  reputationFilter: boolean;
  antiShock: boolean;
}
