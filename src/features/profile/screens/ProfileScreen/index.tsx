import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaContainer, BottomTabBar } from '@/components';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import {
  ProfileHeader,
  UserIdentityCard,
  ProfileWalletCard,
  ProfileStatsRow,
  LanguagesSection,
  TeachingModeCard,
  AccountPreferencesSection,
  LanguageSelectorBottomSheet,
} from '../../components';
import { useProfile } from '../../hooks/useProfile';
import { styles } from './styles';

export const ProfileScreen: React.FC = () => {
  const {
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
  } = useProfile();

  return (
    <SafeAreaContainer edges={['top']} style={styles.container}>
      <ProfileHeader onPressNotifications={() => navigate(Routes.App.Notifications)} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Identidad del Usuario: Avatar con lápiz, Nombre, Bandera, Correo y Bio */}
        <UserIdentityCard user={user} onPressEdit={handleEditProfile} />

        {/* Billetera Virtual: Saldo, botón Recargar y botón +5 gratis */}
        <ProfileWalletCard
          coins={user.coins}
          onPressRecharge={handleGoToCoins}
          onPressHistory={handleGoToHistory}
          onPressRewardedAd={handleWatchRewardedAd}
        />

        {/* Fila de Métricas: Horas Practicadas, Llamadas y Reputación */}
        <ProfileStatsRow
          hoursPracticed={user.hoursPracticed}
          totalCalls={user.totalCalls}
          rating={user.rating}
        />

        {/* Sección Mis Idiomas (Nativo y en aprendizaje con barra de progreso) */}
        <LanguagesSection
          user={user}
          onPressAddLanguage={handleAddLanguage}
          onPressEditLanguages={handleEditProfile}
        />

        {/* Sección Modo Enseñar con Toggle y Tarifa fija */}
        <TeachingModeCard
          isAvailable={user.isAvailableToTeach}
          onToggle={handleToggleTeachingMode}
          ratePerMin={user.earningRatePerMin}
          languageName={user.nativeLanguage.name}
        />

        {/* Cuenta y Preferencias (con acceso a Datos Personales, Idioma, Soporte, Cerrar Sesión) */}
        <AccountPreferencesSection
          onPressPersonalInfo={handleEditProfile}
          onPressLanguage={handleOpenLanguageSheet}
          onPressLogout={handleLogout}
        />
      </ScrollView>

      {/* Selector de idioma con AppBottomSheet */}
      <LanguageSelectorBottomSheet
        visible={isLanguageSheetOpen}
        onClose={handleCloseLanguageSheet}
      />

      {/* Barra de navegación inferior */}
      <BottomTabBar activeTab="Perfil" />
    </SafeAreaContainer>
  );
};

export default ProfileScreen;
