import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaContainer, BottomTabBar } from '@/components';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { colors } from '@/theme';
import {
  ProfileHeader,
  UserIdentityCard,
  ProfileWalletCard,
  ProfileStatsRow,
  LanguagesSection,
  TeachingModeCard,
  AccountPreferencesSection,
  LanguageSelectorBottomSheet,
  ChangePhotoBottomSheet,
} from '../../components';
import { PracticeLanguageBottomSheet } from '@/features/home/components/PracticeLanguageBottomSheet';
import { useProfile } from '../../hooks/useProfile';
import { styles } from './styles';

export const ProfileScreen: React.FC = () => {
  const {
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
  } = useProfile();

  return (
    <SafeAreaContainer edges={['top']} style={styles.container}>
      <ProfileHeader onPressNotifications={() => navigate(Routes.App.Notifications)} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Identidad del Usuario: Avatar con lápiz, Nombre, Bandera, Correo y Bio */}
        <UserIdentityCard
          user={user}
          onPressEdit={handleEditProfile}
          onPressChangePhoto={handleOpenPhotoSheet}
        />

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
          onPressAddLanguage={handleOpenPracticeSheet}
          onPressEditLanguages={handleOpenPracticeSheet}
        />

        {/* Sección Modo Enseñar con Toggle persistente y Tarifa fija */}
        <TeachingModeCard
          isAvailable={user.isAvailableToTeach}
          onToggle={handleToggleTeachingMode}
          ratePerMin={user.earningRatePerMin}
          languageName={user.nativeLanguage?.name || 'Español'}
        />

        {/* Cuenta y Preferencias (con acceso a Datos Personales, Idioma, Soporte, Cerrar Sesión) */}
        <AccountPreferencesSection
          onPressPersonalInfo={handleEditProfile}
          onPressLanguage={handleOpenLanguageSheet}
          onPressLogout={handleLogout}
        />
      </ScrollView>

      {/* Selector de idioma de práctica con AppBottomSheet */}
      <PracticeLanguageBottomSheet
        visible={isPracticeSheetOpen}
        onClose={handleClosePracticeSheet}
      />

      {/* Selector de idioma de la app con AppBottomSheet */}
      <LanguageSelectorBottomSheet
        visible={isLanguageSheetOpen}
        onClose={handleCloseLanguageSheet}
      />

      {/* Selector interactivo para cambiar foto de perfil */}
      <ChangePhotoBottomSheet
        visible={isPhotoSheetOpen}
        onClose={handleClosePhotoSheet}
        onChooseFromGallery={handleChooseFromGallery}
        onTakeSelfie={handleTakeSelfie}
      />

      {/* Barra de navegación inferior */}
      <BottomTabBar activeTab="Perfil" />
    </SafeAreaContainer>
  );
};

export default ProfileScreen;
