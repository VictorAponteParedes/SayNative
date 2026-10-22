import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, BottomTabBar } from '../../../../components';
import { HomeHeader } from '../../components/HomeHeader';
import { UserProfileBar } from '../../components/UserProfileBar';
import { LanguageFilterBar } from '../../components/LanguageFilterBar';
import { InstantPracticeBanner } from '../../components/InstantPracticeBanner';
import { TeachingAvailabilityCard } from '../../components/TeachingAvailabilityCard';
import { FeaturedPeersSection } from '../../components/FeaturedPeersSection';
import { useHomeFeed } from '../../hooks/useHomeFeed';
import { navigate } from '../../../../navigation/NavigationRef';
import { Routes } from '../../../../navigation/routes';
import { PeerUser } from '../../types';
import { styles } from './styles';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation('home');
  const { peers, onlineCount, startInstantMatch } = useHomeFeed();

  const handleNotifications = () => {
    Alert.alert(
      t('header.notificationsTitle'),
      t('header.noNotifications')
    );
  };

  const handleProfile = () => {
    navigate(Routes.App.Profile);
  };

  const handleAddCoins = () => {
    navigate(Routes.App.Coins);
  };

  const handleSelectLearningLanguage = () => {
    Alert.alert(
      t('languageFilter.selectLanguageTitle'),
      t('languageFilter.selectLanguageMessage')
    );
  };

  const handleStartSearch = () => {
    startInstantMatch();
    Alert.alert(
      t('instantPractice.searchingTitle'),
      t('instantPractice.searchingMessage')
    );
  };

  const handleCallPeer = (peer: PeerUser) => {
    Alert.alert(
      t('featuredPeers.callDialogTitle'),
      t('featuredPeers.callDialogMessage', {
        name: peer.name,
        rate: peer.ratePerMinute,
      })
    );
  };

  const handleChatPeer = (peer: PeerUser) => {
    Alert.alert(
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
          onlineCount={onlineCount}
          onPressViewAll={handleViewAllPeers}
          onPressCall={handleCallPeer}
          onPressChat={handleChatPeer}
        />
      </ScrollView>

      {/* Barra de navegación inferior */}
      <BottomTabBar activeTab="Inicio" />
    </SafeAreaContainer>
  );
};
