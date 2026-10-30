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
  partnerId?: string;
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

export interface BackendChatFilterOption {
  key: string;
  label: string;
  description: string;
  count: number;
  icon: string;
}

export type ChatFilterType = 'all' | 'unread' | 'videocalls' | 'tutors' | 'online' | string;

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

export interface ChatRoom {
  id: string;
  partnerId?: string;
  partner?: {
    id: string;
    fullName?: string;
    avatar?: { url?: string } | null;
    countryFlag?: string | null;
    isOnline?: boolean;
    learningCostPerMin?: number;
  };
  lastMessage?: string;
  updatedAt?: string;
}

export interface BackendChatMessage {
  id: string;
  roomId?: string;
  senderId: string;
  recipientId?: string;
  text?: string;
  content?: string;
  translatedText?: string;
  isAudio?: boolean;
  audioUrl?: string;
  audioDuration?: string;
  audioSpeed?: string;
  transcription?: string;
  createdAt: string;
  isRead?: boolean;
}

export interface SendMessagePayload {
  roomId?: string;
  recipientId?: string;
  text: string;
  translatedText?: string;
  isAudio?: boolean;
  audioUrl?: string;
  audioDuration?: string;
  transcription?: string;
}

