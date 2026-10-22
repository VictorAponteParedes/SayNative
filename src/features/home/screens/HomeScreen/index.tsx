import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaContainer, BottomTabBar } from '../../../../componentes';
import { HomeHeader } from '../../components/HomeHeader';
import { UserProfileBar } from '../../components/UserProfileBar';
import { LanguageFilterBar } from '../../components/LanguageFilterBar';
import { InstantPracticeBanner } from '../../components/InstantPracticeBanner';
import { TeachingAvailabilityCard } from '../../components/TeachingAvailabilityCard';
import { FeaturedPeersSection } from '../../components/FeaturedPeersSection';
import { useHomeFeed } from '../../hooks/useHomeFeed';
import { PeerUser } from '../../types';
import { styles } from './styles';

export const HomeScreen: React.FC = () => {
  const { peers, onlineCount, startInstantMatch } = useHomeFeed();

  const handleNotifications = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones pendientes.');
  };

  const handleProfile = () => {
    Alert.alert('Perfil', 'Abriendo perfil del usuario...');
  };

  const handleAddCoins = () => {
    Alert.alert(
      'Billetera de Monedas',
      'Compra paquetes de monedas o mira videos recompensados para obtener saldo.'
    );
  };

  const handleSelectLearningLanguage = () => {
    Alert.alert(
      'Seleccionar Idioma',
      'Elige el idioma que deseas practicar y tu nivel CEFR.'
    );
  };

  const handleStartSearch = () => {
    startInstantMatch();
    Alert.alert(
      'Práctica Instantánea',
      'Buscando hablante nativo disponible en vivo...'
    );
  };

  const handleCallPeer = (peer: PeerUser) => {
    Alert.alert(
      'Iniciar Llamada',
      `¿Deseas iniciar videollamada con ${peer.name}? Tarifa: ${peer.ratePerMinute} monedas/min.`
    );
  };

  const handleChatPeer = (peer: PeerUser) => {
    Alert.alert('Chat', `Abriendo conversación directa con ${peer.name}.`);
  };

  const handleViewAllPeers = () => {
    Alert.alert(
      'Compañeros',
      'Navegando a la pestaña Explorar con todos los usuarios en línea.'
    );
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
        <UserProfileBar onPressAddCoins={handleAddCoins} />

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
      <BottomTabBar />
    </SafeAreaContainer>
  );
};
