import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@/theme';
import { SafeAreaContainer, BottomTabBar, AppAlert } from '@/components';
import { HomeHeader } from '../../components/HomeHeader';
import { UserProfileBar } from '../../components/UserProfileBar';
import { LanguageFilterBar } from '../../components/LanguageFilterBar';
import { PracticeLanguageBottomSheet } from '../../components/PracticeLanguageBottomSheet';
import { InstantPracticeBanner } from '../../components/InstantPracticeBanner';
import { TeachingAvailabilityCard } from '../../components/TeachingAvailabilityCard';
import { FeaturedPeersSection } from '../../components/FeaturedPeersSection';
import { useHomeFeed } from '../../hooks/useHomeFeed';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { PeerUser } from '../../types';
import { useCallSessionStore } from '@/features/videocalls';
import { useCoinsStore } from '@/features/coins';
import { styles } from './styles';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation('home');
  const {
    peers,
    onlineCount,
    isLoading,
    isRefreshing,
    onRefresh,
    startInstantMatch,
  } = useHomeFeed();
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);

  const handleNotifications = () => {
    navigate(Routes.App.Notifications);
  };

  const handleProfile = () => {
    navigate(Routes.App.Profile);
  };

  const handleAddCoins = () => {
    navigate(Routes.App.Coins);
  };

  const handleSelectLearningLanguage = () => {
    setIsLanguageSheetOpen(true);
  };

  const handleStartSearch = () => {
    const userCoins = useCoinsStore.getState().coins;
    if (!__DEV__ && userCoins < 10) {
      AppAlert.info(
        t('errors.insufficientCoins', { defaultValue: 'Monedas insuficientes' }),
        t('lobby.balanceWarning', {
          minutes: 0,
          defaultValue: 'No tienes monedas suficientes para iniciar una sesión de práctica.',
        })
      );
      return;
    }

    startInstantMatch();
    navigate(Routes.App.CallLobby, {
      isInstantMatch: true,
      ratePerMinute: 10,
    });
  };

  const handleCallPeer = (peer: PeerUser) => {
    const userCoins = useCoinsStore.getState().coins;
    if (!__DEV__ && userCoins < peer.ratePerMinute) {
      AppAlert.info(
        t('errors.insufficientCoins', { defaultValue: 'Monedas insuficientes' }),
        t('lobby.balanceWarning', {
          minutes: 0,
          defaultValue: 'No tienes monedas suficientes para iniciar esta llamada.',
        })
      );
      return;
    }

    // Inicializar sesión directamente en estado 'calling'
    useCallSessionStore.getState().initCallSession(
      {
        id: peer.id,
        name: peer.name,
        avatarUrl: peer.avatarUrl,
        countryFlag: peer.countryFlag,
        role: 'caller',
        ratePerMinute: peer.ratePerMinute,
      },
      'calling'
    );

    // Navegar directamente a la llamada activa
    navigate(Routes.App.ActiveCall, {
      peerId: peer.id,
      peerName: peer.name,
      peerAvatar: peer.avatarUrl,
      peerFlag: peer.countryFlag,
      ratePerMinute: peer.ratePerMinute,
    });
  };

  const handleChatPeer = (peer: PeerUser) => {
    AppAlert.info(
      t('featuredPeers.chatDialogTitle'),
      t('featuredPeers.chatDialogMessage', { name: peer.name })
    );
  };

  const handleViewAllPeers = () => {
    navigate(Routes.App.Explore);
  };

  return (
    <SafeAreaContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Cabecera superior: Logo, título Inicio, Notificaciones y Perfil */}
        <HomeHeader
          onPressNotifications={handleNotifications}
          onPressProfile={handleProfile}
        />

        {/* Saludo, avatar y balance de monedas con botón '+' */}
        <UserProfileBar
          onPressAddCoins={handleAddCoins}
          onPressCoins={() => navigate(Routes.App.CoinsHistory)}
        />

        {/* Selector de idioma a practicar y nativo */}
        <LanguageFilterBar
          onPressSelectLearningLanguage={handleSelectLearningLanguage}
        />

        {/* Banner de Práctica Instantánea (Hero) */}
        <InstantPracticeBanner onPressStartSearch={handleStartSearch} />

        {/* Modo Disponible para Enseñar con Toggle Switch */}
        <TeachingAvailabilityCard />

        {/* Sección de Compañeros Destacados */}
        <FeaturedPeersSection
          peers={peers}
          isLoading={isLoading}
          onlineCount={onlineCount}
          onPressViewAll={handleViewAllPeers}
          onPressCall={handleCallPeer}
          onPressChat={handleChatPeer}
        />
      </ScrollView>

      {/* Selector de idioma a practicar con AppBottomSheet */}
      <PracticeLanguageBottomSheet
        visible={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
      />

      {/* Barra de navegación inferior */}
      <BottomTabBar activeTab="Inicio" />
    </SafeAreaContainer>
  );
};
