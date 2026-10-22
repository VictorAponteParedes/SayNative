import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import { Toast } from '../../../components';
import { navigate } from '../../../navigation/NavigationRef';
import { Routes } from '../../../navigation/routes';
import type {
  NotificationItem,
  NotificationCategory,
  NotificationSectionGroup,
} from '../types';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'missedCall',
    category: 'calls',
    section: 'today',
    titleKey: 'items.missedCallTitle',
    descKey: 'items.missedCallDesc',
    timeKey: 'items.time15m',
    isRead: false,
    actionType: 'call',
    actionTextKey: 'items.missedCallAction',
    partnerName: 'Sarah J.',
  },
  {
    id: 'notif-2',
    type: 'coinsEarned',
    category: 'coins',
    section: 'today',
    titleKey: 'items.coinsEarnedTitle',
    descKey: 'items.coinsEarnedDesc',
    timeKey: 'items.time2h',
    isRead: false,
    coinsAmount: 42,
  },
  {
    id: 'notif-3',
    type: 'newMessage',
    category: 'social',
    section: 'today',
    titleKey: 'items.newMessageTitle',
    descKey: 'items.newMessageDesc',
    timeKey: 'items.time4h',
    isRead: false,
    actionType: 'playAudio',
    actionTextKey: 'items.newMessageAudio',
    partnerName: 'Emma W.',
  },
  {
    id: 'notif-4',
    type: 'streakBonus',
    category: 'coins',
    section: 'yesterday',
    titleKey: 'items.streakTitle',
    descKey: 'items.streakDesc',
    timeKey: 'items.time1830',
    isRead: true,
    actionType: 'claimBonus',
    actionTextKey: 'items.streakAction',
    isClaimed: false,
  },
  {
    id: 'notif-5',
    type: 'tutorOnline',
    category: 'social',
    section: 'yesterday',
    titleKey: 'items.tutorOnlineTitle',
    descKey: 'items.tutorOnlineDesc',
    timeKey: 'items.time1120',
    isRead: true,
    actionType: 'sayHello',
    actionTextKey: 'items.tutorOnlineAction',
    partnerName: 'Liam Davies',
  },
  {
    id: 'notif-6',
    type: 'reminder',
    category: 'social',
    section: 'thisWeek',
    titleKey: 'items.practiceReminderTitle',
    descKey: 'items.practiceReminderDesc',
    timeKey: 'items.time3d',
    isRead: true,
  },
];

export const useNotifications = () => {
  const { t } = useTranslation('notifications');
  const addCoins = useAuthStore((state) => state.addCoins);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] =
    useState<NotificationCategory>('all');

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    return notifications.filter((item) => item.category === activeFilter);
  }, [notifications, activeFilter]);

  const sections = useMemo<NotificationSectionGroup[]>(() => {
    const sectionKeys: ('today' | 'yesterday' | 'thisWeek')[] = [
      'today',
      'yesterday',
      'thisWeek',
    ];

    return sectionKeys
      .map((key) => ({
        sectionKey: key,
        data: filteredNotifications.filter((item) => item.section === key),
      }))
      .filter((group) => group.data.length > 0);
  }, [filteredNotifications]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true }))
    );
    Toast.success(
      t('toasts.markedAllReadTitle'),
      t('toasts.markedAllReadMessage')
    );
  };

  const handleAction = (item: NotificationItem) => {
    if (item.actionType === 'claimBonus') {
      if (item.isClaimed) {
        Toast.warning(
          t('items.streakClaimed'),
          t('toasts.alreadyClaimed')
        );
        return;
      }
      addCoins(10);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === item.id ? { ...n, isClaimed: true, isRead: true } : n
        )
      );
      Toast.success(
        t('toasts.bonusClaimedTitle'),
        t('toasts.bonusClaimedMessage')
      );
    } else if (item.actionType === 'call') {
      navigate(Routes.App.CallLobby, {
        peerId: 'sarah_1',
        peerName: item.partnerName || 'Sarah J.',
      });
    } else if (item.actionType === 'sayHello') {
      Toast.success(
        t('toasts.greetingSentTitle'),
        t('toasts.greetingSentMessage')
      );
    } else if (item.actionType === 'playAudio') {
      navigate(Routes.App.PrivateChat, {
        chatId: 'chat_emma_1',
        partnerName: item.partnerName || 'Emma W.',
      });
    }
  };

  return {
    notifications: filteredNotifications,
    sections,
    unreadCount,
    activeFilter,
    setActiveFilter,
    handleMarkAllAsRead,
    handleAction,
  };
};
