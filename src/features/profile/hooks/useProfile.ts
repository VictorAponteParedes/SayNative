import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { Toast } from '@/components';
import { profileApi } from '../api/profileApi';
import {
  pickImageFromGallery,
  takeSelfieWithCamera,
} from '../utils/photoPicker';
import { Alert } from 'react-native';

const isValidUuid = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export const useProfile = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore(state => state.user);
  const setAvailableToTeach = useAuthStore(state => state.setAvailableToTeach);
  const updateUserProfile = useAuthStore(state => state.updateUserProfile);
  const addCoins = useAuthStore(state => state.addCoins);
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [isPracticeSheetOpen, setIsPracticeSheetOpen] = useState(false);
  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user.id || !isValidUuid(user.id)) {
      setIsRefreshing(false);
      return;
    }

    try {
      const backendUser = await profileApi.getProfile(user.id);
      if (backendUser) {
        updateUserProfile({
          name: backendUser.fullName || user.name,
          email: backendUser.email || user.email,
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
    setIsPracticeSheetOpen(true);
  };

  const handleClosePracticeSheet = () => {
    setIsPracticeSheetOpen(false);
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
    addCoins(5);
    Toast.success(
      t('toasts.rewardEarnedTitle'),
      t('toasts.rewardEarnedMessage'),
    );
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
    Alert.alert(
      t('account.logoutConfirmTitle'),
      t('account.logoutConfirmMessage'),
      [
        { text: t('account.cancel'), style: 'cancel' },
        {
          text: t('account.confirm'),
          style: 'destructive',
          onPress: () => {
            setAuthenticated(false);
          },
        },
      ],
    );
  };

  return {
    user,
    isRefreshing,
    onRefresh,
    isLanguageSheetOpen,
    handleOpenLanguageSheet,
    handleCloseLanguageSheet,
    isPracticeSheetOpen,
    handleOpenPracticeSheet,
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
