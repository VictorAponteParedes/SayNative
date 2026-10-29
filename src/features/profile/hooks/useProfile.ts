import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { useCoinsStore } from '@/features/coins';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { Toast, AppAlert } from '@/components';
import { profileApi } from '../api/profileApi';
import {
  pickImageFromGallery,
  takeSelfieWithCamera,
} from '../utils/photoPicker';
import { resolveAvatarUrl } from '@/utils/resolveAvatarUrl';

const isValidUuid = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export const useProfile = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore(state => state.user);
  const setAvailableToTeach = useAuthStore(state => state.setAvailableToTeach);
  const updateUserProfile = useAuthStore(state => state.updateUserProfile);
  const setUserFromBackend = useAuthStore(state => state.setUserFromBackend);
  const removeUserLanguage = useAuthStore(state => state.removeUserLanguage);
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const coins = useCoinsStore(state => state.coins);
  const watchRewardedAd = useCoinsStore(state => state.watchRewardedAd);
  const setCoins = useCoinsStore(state => state.setCoins);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [isPracticeSheetOpen, setIsPracticeSheetOpen] = useState(false);
  const [editingLanguageCode, setEditingLanguageCode] = useState<string | null>(
    null,
  );
  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user.id || !isValidUuid(user.id)) {
      setIsRefreshing(false);
      return;
    }

    try {
      const backendUser = await profileApi.getProfile(user.id);
      if (backendUser) {
        if (backendUser.coins !== undefined) {
          setCoins(Number(backendUser.coins));
        }
        if (backendUser.userLanguages && backendUser.userLanguages.length > 0) {
          setUserFromBackend(backendUser);
        } else {
          updateUserProfile({
            name: backendUser.fullName || user.name,
            email: backendUser.email || user.email,
            avatarUrl: resolveAvatarUrl(backendUser.avatar?.url) || user.avatarUrl,
            phone: backendUser.phone ?? user.phone,
            bio: backendUser.bio ?? user.bio,
            countryCode: backendUser.countryCode || user.countryCode,
            countryFlag: backendUser.countryFlag || user.countryFlag,
            isVerified: backendUser.isVerified,
            isAvailableToTeach: backendUser.isAvailableToTeach,
            earningRatePerMin:
              backendUser.earningRatePerMin ?? user.earningRatePerMin,
            learningCostPerMin:
              backendUser.learningCostPerMin ?? user.learningCostPerMin,
            rating:
              backendUser.rating !== undefined && backendUser.rating !== null
                ? Number(backendUser.rating)
                : user.rating,
            totalCalls: backendUser.totalCalls ?? user.totalCalls,
            hoursPracticed:
              backendUser.hoursPracticed !== undefined &&
              backendUser.hoursPracticed !== null
                ? Number(backendUser.hoursPracticed)
                : user.hoursPracticed,
            reviewCount: backendUser.reviewCount ?? user.reviewCount,
          });
        }
      }
    } catch (err: unknown) {
      if (__DEV__) {
        console.log('[useProfile] Backend fetch error:', err);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [
    user.id,
    user.name,
    user.email,
    user.phone,
    user.bio,
    user.countryCode,
    user.countryFlag,
    user.earningRatePerMin,
    user.learningCostPerMin,
    user.rating,
    user.totalCalls,
    user.hoursPracticed,
    user.reviewCount,
    updateUserProfile,
  ]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchProfile();
  }, [fetchProfile]);

  const handleOpenLanguageSheet = () => {
    setIsLanguageSheetOpen(true);
  };

  const handleCloseLanguageSheet = () => {
    setIsLanguageSheetOpen(false);
  };

  const handleOpenPracticeSheet = () => {
    setEditingLanguageCode(null);
    setIsPracticeSheetOpen(true);
  };

  const handleOpenEditLanguageItem = (languageCode: string) => {
    setEditingLanguageCode(languageCode);
    setIsPracticeSheetOpen(true);
  };

  const handleClosePracticeSheet = () => {
    setIsPracticeSheetOpen(false);
    setEditingLanguageCode(null);
  };

  const handleRemoveLanguageItem = async (languageCode: string) => {
    removeUserLanguage(languageCode);
    if (user.id && isValidUuid(user.id)) {
      try {
        await profileApi.removeUserLanguage(user.id, languageCode);
      } catch (err) {
        if (__DEV__) {
          console.log('[useProfile] Eliminado local (endpoint pendiente):', err);
        }
      }
    }
    Toast.success(
      t('languages.languageRemovedTitle'),
      t('languages.languageRemovedMessage'),
    );
  };

  const handleOpenPhotoSheet = () => {
    setIsPhotoSheetOpen(true);
  };

  const handleClosePhotoSheet = () => {
    setIsPhotoSheetOpen(false);
  };

  const handleChooseFromGallery = async () => {
    const uri = await pickImageFromGallery();
    if (uri) {
      updateUserProfile({ avatarUrl: uri });
      if (user.id && isValidUuid(user.id)) {
        try {
          const res = await profileApi.uploadAvatar(user.id, uri);
          if (res.avatar?.url) {
            const resolved = resolveAvatarUrl(res.avatar.url);
            updateUserProfile({ avatarUrl: resolved });
            Toast.success(
              t('changePhotoSheet.photoUpdatedTitle'),
              t('changePhotoSheet.photoUpdatedMessage'),
            );
            return;
          }
        } catch (uploadError) {
          if (__DEV__) {
            console.log('[useProfile] Error al subir avatar inmediato:', uploadError);
          }
        }
      }
      Toast.success(
        t('changePhotoSheet.photoUpdatedTitle'),
        t('changePhotoSheet.photoUpdatedMessage'),
      );
    }
  };

  const handleTakeSelfie = async () => {
    const uri = await takeSelfieWithCamera();
    if (uri) {
      updateUserProfile({ avatarUrl: uri });
      if (user.id && isValidUuid(user.id)) {
        try {
          const res = await profileApi.uploadAvatar(user.id, uri);
          if (res.avatar?.url) {
            const resolved = resolveAvatarUrl(res.avatar.url);
            updateUserProfile({ avatarUrl: resolved });
            Toast.success(
              t('changePhotoSheet.photoUpdatedTitle'),
              t('changePhotoSheet.photoUpdatedMessage'),
            );
            return;
          }
        } catch (uploadError) {
          if (__DEV__) {
            console.log('[useProfile] Error al subir selfie inmediato:', uploadError);
          }
        }
      }
      Toast.success(
        t('changePhotoSheet.photoUpdatedTitle'),
        t('changePhotoSheet.photoUpdatedMessage'),
      );
    }
  };

  const handleEditProfile = () => {
    navigate(Routes.App.EditProfile);
  };

  const handleGoToCoins = () => {
    navigate(Routes.App.Coins);
  };

  const handleGoToHistory = () => {
    navigate(Routes.App.CoinsHistory);
  };

  const handleWatchRewardedAd = () => {
    const success = watchRewardedAd();
    if (success) {
      Toast.success(
        t('toasts.rewardEarnedTitle'),
        t('toasts.rewardEarnedMessage'),
      );
    } else {
      Toast.warning(
        'Límite de anuncios alcanzado',
        'Has visto todos los anuncios disponibles por el día de hoy.'
      );
    }
  };

  const handleToggleTeachingMode = async (value: boolean) => {
    setAvailableToTeach(value);

    if (user.id && isValidUuid(user.id)) {
      try {
        await profileApi.toggleTeachingMode(user.id, value);
      } catch (err: unknown) {
        if (__DEV__) {
          console.log(
            '[useProfile] Error toggling teaching mode on backend:',
            err,
          );
        }
      }
    }

    if (value) {
      Toast.success(
        t('toasts.teachingEnabledTitle'),
        t('toasts.teachingEnabledMessage'),
      );
    } else {
      Toast.warning(
        t('toasts.teachingDisabledTitle'),
        t('toasts.teachingDisabledMessage'),
      );
    }
  };

  const handleLogout = () => {
    AppAlert.confirm({
      title: t('account.logoutConfirmTitle'),
      message: t('account.logoutConfirmMessage'),
      cancelText: t('account.cancel'),
      confirmText: t('account.confirm'),
      onConfirm: () => {
        setAuthenticated(false);
      },
    });
  };

  return {
    user,
    coins,
    isRefreshing,
    onRefresh,
    isLanguageSheetOpen,
    handleOpenLanguageSheet,
    handleCloseLanguageSheet,
    isPracticeSheetOpen,
    editingLanguageCode,
    handleOpenPracticeSheet,
    handleOpenEditLanguageItem,
    handleRemoveLanguageItem,
    handleClosePracticeSheet,
    isPhotoSheetOpen,
    handleOpenPhotoSheet,
    handleClosePhotoSheet,
    handleChooseFromGallery,
    handleTakeSelfie,
    handleEditProfile,
    handleGoToCoins,
    handleGoToHistory,
    handleWatchRewardedAd,
    handleToggleTeachingMode,
    handleLogout,
  };
};

export default useProfile;
