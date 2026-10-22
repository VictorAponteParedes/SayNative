import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Toast } from '../../../components';
import { useAuthStore } from '../../../store/useAuthStore';
import type { BlockedUser, PrivacySettings } from '../types';

const INITIAL_BLOCKED_USERS: BlockedUser[] = [
  {
    id: 'block_1',
    name: 'Marcus_K88',
    countryCode: 'DE',
    blockedDate: '12 de Octubre',
    reasonKey: 'blockedUsers.spamReason',
  },
  {
    id: 'block_2',
    name: 'User_9104',
    countryCode: 'US',
    blockedDate: '28 de Septiembre',
    reasonKey: 'blockedUsers.behaviorReason',
  },
];

export const useSecuritySettings = () => {
  const { t } = useTranslation('security');
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    hideAge: true,
    reputationFilter: true,
    antiShock: true,
  });

  const [blockedUsers, setBlockedUsers] =
    useState<BlockedUser[]>(INITIAL_BLOCKED_USERS);

  const handleTogglePrivacy = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));

    if (key === 'antiShock' && value) {
      Toast.success(
        t('toasts.antiShockEnabledTitle'),
        t('toasts.antiShockEnabledMessage')
      );
    } else {
      Toast.success(
        t('toasts.privacyUpdatedTitle'),
        t('toasts.privacyUpdatedMessage')
      );
    }
  };

  const handleUnblockUser = (user: BlockedUser) => {
    Alert.alert(
      t('blockedUsers.unblockConfirmTitle'),
      t('blockedUsers.unblockConfirmMessage', { name: user.name }),
      [
        { text: t('blockedUsers.cancel'), style: 'cancel' },
        {
          text: t('blockedUsers.confirm'),
          onPress: () => {
            setBlockedUsers((prev) => prev.filter((u) => u.id !== user.id));
            Toast.success(
              t('toasts.unblockSuccessTitle'),
              t('toasts.unblockSuccessMessage', { name: user.name })
            );
          },
        },
      ]
    );
  };

  const handleReadGuidelines = () => {
    Alert.alert(
      t('safeCommunity.guidelinesTitle'),
      t('safeCommunity.guidelinesMessage')
    );
  };

  const handleViewReportsStatus = () => {
    Alert.alert(
      t('moderation.reportsModalTitle'),
      t('moderation.reportsModalMessage')
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('moderation.deleteConfirmTitle'),
      t('moderation.deleteConfirmMessage'),
      [
        { text: t('blockedUsers.cancel'), style: 'cancel' },
        {
          text: t('moderation.deleteConfirmAction'),
          style: 'destructive',
          onPress: () => {
            Toast.error(
              t('toasts.accountDeletedTitle'),
              t('toasts.accountDeletedMessage')
            );
            setTimeout(() => {
              setAuthenticated(false);
            }, 1000);
          },
        },
      ]
    );
  };

  return {
    privacy,
    blockedUsers,
    handleTogglePrivacy,
    handleUnblockUser,
    handleReadGuidelines,
    handleViewReportsStatus,
    handleDeleteAccount,
  };
};
