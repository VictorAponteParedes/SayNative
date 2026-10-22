import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import { navigate } from '../../../navigation/NavigationRef';
import { Routes } from '../../../navigation/routes';
import { Toast } from '../../../components';

export const useProfile = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore((state) => state.user);
  const setAvailableToTeach = useAuthStore((state) => state.setAvailableToTeach);
  const addCoins = useAuthStore((state) => state.addCoins);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);

  const handleOpenLanguageSheet = () => {
    setIsLanguageSheetOpen(true);
  };

  const handleCloseLanguageSheet = () => {
    setIsLanguageSheetOpen(false);
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
      t('toasts.rewardEarnedMessage')
    );
  };

  const handleToggleTeachingMode = (value: boolean) => {
    setAvailableToTeach(value);
    if (value) {
      Toast.success(
        t('toasts.teachingEnabledTitle'),
        t('toasts.teachingEnabledMessage')
      );
    } else {
      Toast.warning(
        t('toasts.teachingDisabledTitle'),
        t('toasts.teachingDisabledMessage')
      );
    }
  };

  const handleAddLanguage = () => {
    handleOpenLanguageSheet();
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
      ]
    );
  };

  return {
    user,
    isLanguageSheetOpen,
    handleOpenLanguageSheet,
    handleCloseLanguageSheet,
    handleEditProfile,
    handleGoToCoins,
    handleGoToHistory,
    handleWatchRewardedAd,
    handleToggleTeachingMode,
    handleAddLanguage,
    handleLogout,
  };
};
