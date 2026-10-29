import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toast, AppAlert } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme';
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
  const logout = useAuthStore((state) => state.logout);

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
    AppAlert.confirm({
      title: t('blockedUsers.unblockConfirmTitle'),
      message: t('blockedUsers.unblockConfirmMessage', { name: user.name }),
      cancelText: t('blockedUsers.cancel'),
      confirmText: t('blockedUsers.confirm'),
      onConfirm: () => {
        setBlockedUsers((prev) => prev.filter((u) => u.id !== user.id));
        Toast.success(
          t('toasts.unblockSuccessTitle'),
          t('toasts.unblockSuccessMessage', { name: user.name })
        );
      },
    });
  };

  const handleReadGuidelines = () => {
    AppAlert.info(
      t('safeCommunity.guidelinesTitle'),
      t('safeCommunity.guidelinesMessage')
    );
  };

  const handleViewReportsStatus = () => {
    AppAlert.info(
      t('moderation.reportsModalTitle'),
      t('moderation.reportsModalMessage')
    );
  };

  const handleDeleteAccount = () => {
    AppAlert.confirm({
      title: t('moderation.deleteConfirmTitle'),
      message: t('moderation.deleteConfirmMessage'),
      cancelText: t('blockedUsers.cancel'),
      confirmText: t('moderation.deleteConfirmAction'),
      confirmColor: colors.danger,
      onConfirm: () => {
        Toast.error(
          t('toasts.accountDeletedTitle'),
          t('toasts.accountDeletedMessage')
        );
        setTimeout(() => {
          logout();
        }, 1000);
      },
    });
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
