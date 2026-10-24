export interface OnlinePeer {
  id: string;
  name: string;
  avatarUrl: string;
  countryFlag: string;
  isOnline: boolean;
  ratePerMinute?: number;
}

export type ChatMessageType = 'text' | 'videocall_ended' | 'missed_call';

export interface ChatConversation {
  id: string;
  name: string;
  avatarUrl: string;
  countryFlag: string;
  isOnline: boolean;
  badge?: 'Super Tutor' | string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isRead?: boolean;
  messageType?: ChatMessageType;
  callDuration?: string;
  ratePerMinute?: number;
}

export type ChatFilterType = 'all' | 'unread' | 'videocalls';

export interface BackendUserItem {
  id: string;
  fullName?: string;
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
