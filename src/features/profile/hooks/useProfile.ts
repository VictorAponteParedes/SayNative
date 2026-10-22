import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import { navigate } from '../../../navigation/NavigationRef';
import { Routes } from '../../../navigation/routes';

export const useProfile = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore((state) => state.user);
  const setAvailableToTeach = useAuthStore((state) => state.setAvailableToTeach);
  const addCoins = useAuthStore((state) => state.addCoins);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

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
    Alert.alert(
      t('wallet.freeAdButton'),
      t('wallet.freeAdButton'),
      [
        {
          text: t('account.confirm'),
          onPress: () => {
            addCoins(5);
            Alert.alert('🪙 +5 Monedas', '¡Has ganado 5 monedas gratis por ver el anuncio!');
          },
        },
      ]
    );
  };

  const handleToggleTeachingMode = (value: boolean) => {
    setAvailableToTeach(value);
  };

  const handleAddLanguage = () => {
    Alert.alert(
      t('languages.addLanguageTitle'),
      t('languages.addLanguageMessage')
    );
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
    handleEditProfile,
    handleGoToCoins,
    handleGoToHistory,
    handleWatchRewardedAd,
    handleToggleTeachingMode,
    handleAddLanguage,
    handleLogout,
  };
};
