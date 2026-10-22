export type NotificationCategory = 'all' | 'calls' | 'coins' | 'social';

export type NotificationType =
  | 'missedCall'
  | 'coinsEarned'
  | 'newMessage'
  | 'streakBonus'
  | 'tutorOnline'
  | 'reminder';

export type NotificationSection = 'today' | 'yesterday' | 'thisWeek';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  category: 'calls' | 'coins' | 'social';
  section: NotificationSection;
  titleKey: string;
  descKey: string;
  timeKey: string;
  isRead: boolean;
  coinsAmount?: number;
  actionType?: 'call' | 'claimBonus' | 'sayHello' | 'playAudio';
  actionTextKey?: string;
  partnerName?: string;
  isClaimed?: boolean;
}

export interface NotificationSectionGroup {
  sectionKey: NotificationSection;
  data: NotificationItem[];
}
