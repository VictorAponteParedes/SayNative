export interface OnlinePeer {
  id: string;
  name: string;
  avatarUrl: string;
  countryFlag: string;
  isOnline: boolean;
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
}

export type ChatFilterType = 'all' | 'unread' | 'videocalls';
