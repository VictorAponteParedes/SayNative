import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, Toast, AppAlert } from '@/components';
import { CoinsScreenHeader } from '../../components/CoinsScreenHeader';
import { CoinsHeroSection } from '../../components/CoinsHeroSection';
import { RewardedAdCard } from '../../components/RewardedAdCard';
import { PackagesSectionHeader } from '../../components/PackagesSectionHeader';
import { PackagesCarousel } from '../../components/PackagesCarousel';
import { BenefitsGuaranteesCard } from '../../components/BenefitsGuaranteesCard';
import { LegalTrustFooter } from '../../components/LegalTrustFooter';
import { useCoinPackages } from '../../hooks/useCoinPackages';
import { CoinPackage } from '../../types';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { styles } from './styles';

export const CoinsScreen: React.FC = () => {
  const { t } = useTranslation('coins');
  const {
    packages,
    currentCoins,
    adsAvailable,
    totalAds,
    watchRewardedAd,
    purchasePackage,
  } = useCoinPackages();

  const handleProfile = () => {
    navigate(Routes.App.Profile);
  };

  const handleWatchAd = () => {
    if (adsAvailable <= 0) {
      Toast.warning(
        t('toasts.adLimitTitle'),
        t('toasts.adLimitMessage')
      );
      return;
    }

    const success = watchRewardedAd();
    if (success) {
      Toast.success(
        t('toasts.rewardEarnedTitle'),
        t('rewardedAd.rewardEarned')
      );
    }
  };

  const handleBuyPackage = (pkg: CoinPackage) => {
    AppAlert.confirm({
      title: t('dialog.purchaseTitle'),
      message: t('dialog.purchaseMessage', {
        title: t(pkg.titleKey),
        price: pkg.price,
      }),
      cancelText: t('actions.cancel', { defaultValue: 'Cancelar' }),
      confirmText: t('packages.buy', { defaultValue: 'Comprar' }),
      onConfirm: () => {
        purchasePackage(pkg);
        Toast.success(
          t('toasts.purchaseSuccessTitle'),
          t('dialog.purchaseSuccess', { coins: pkg.coinsCount })
        );
      },
    });
  };

  return (
    <SafeAreaContainer edges={['top', 'left', 'right']}>
      {/* Cabecera con flechita de volver hacia la izquierda */}
      <CoinsScreenHeader onPressProfile={handleProfile} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección Hero con saldo y cotización de minutos */}
        <CoinsHeroSection currentCoins={currentCoins} />

        {/* Tarjeta de anuncios recompensados (+5 monedas gratis) */}
        <RewardedAdCard
          availableCount={adsAvailable}
          totalCount={totalAds}
          onPressWatch={handleWatchAd}
        />

        {/* Encabezado de paquetes de monedas */}
        <PackagesSectionHeader />

        {/* Carrusel deslizante horizontal de paquetes */}
        <PackagesCarousel
          packages={packages}
          onPressBuy={handleBuyPackage}
        />

        {/* Tarjeta con lista de beneficios y garantías */}
        <BenefitsGuaranteesCard />

        {/* Insignias de seguridad, descargo de responsabilidad y enlaces */}
        <LegalTrustFooter />
      </ScrollView>
    </SafeAreaContainer>
  );
};
