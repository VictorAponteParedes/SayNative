import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Toast, AppAlert } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme';
import { moderationApi } from '../api/moderationApi';
import type { BlockedUser, PrivacySettings } from '../types';

export const useSecuritySettings = () => {
  const { t } = useTranslation('security');
  const logout = useAuthStore((state) => state.logout);

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    hideAge: true,
    reputationFilter: true,
    antiShock: true,
  });

  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [isLoadingBlocked, setIsLoadingBlocked] = useState(false);

  const fetchBlockedUsers = useCallback(async () => {
    try {
      setIsLoadingBlocked(true);
      const res = await moderationApi.getBlockedUsers();
      const rawList = Array.isArray(res)
        ? res
        : res && typeof res === 'object' && 'data' in res && Array.isArray((res as unknown as { data: unknown[] }).data)
        ? (res as unknown as { data: unknown[] }).data
        : [];

      setBlockedUsers(
        rawList.map((item: unknown) => {
          const b = item as {
            id?: string;
            blockedUserId?: string;
            name?: string;
            countryCode?: string;
            countryFlag?: string;
            avatarUrl?: string;
            blockedAt?: string;
            reason?: string;
          };
          return {
            id: b.blockedUserId || b.id || '',
            name: b.name || 'Usuario',
            countryCode: b.countryCode || b.countryFlag || '🌐',
            avatarUrl: b.avatarUrl || undefined,
            blockedDate: b.blockedAt
              ? new Date(b.blockedAt).toLocaleDateString()
              : 'Reciente',
            reasonKey: b.reason || 'blockedUsers.behaviorReason',
          };
        })
      );
    } catch (error) {
      console.log('[useSecuritySettings] Error fetching blocked users:', error);
    } finally {
      setIsLoadingBlocked(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBlockedUsers();
    }, [fetchBlockedUsers])
  );

  useEffect(() => {
    fetchBlockedUsers();
  }, [fetchBlockedUsers]);

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
      onConfirm: async () => {
        try {
          await moderationApi.unblockUser(user.id);
          setBlockedUsers((prev) => prev.filter((u) => u.id !== user.id));
          Toast.success(
            t('toasts.unblockSuccessTitle'),
            t('toasts.unblockSuccessMessage', { name: user.name })
          );
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          Toast.error(
            'Error',
            err?.response?.data?.message || 'No se pudo desbloquear al usuario.'
          );
        }
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
    isLoadingBlocked,
    refetchBlockedUsers: fetchBlockedUsers,
    handleTogglePrivacy,
    handleUnblockUser,
    handleReadGuidelines,
    handleViewReportsStatus,
    handleDeleteAccount,
  };
};
