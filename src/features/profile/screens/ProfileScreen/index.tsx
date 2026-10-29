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
  AddLanguageBottomSheet,
} from '../../components';
import { useProfile } from '../../hooks/useProfile';
import { styles } from './styles';

export const ProfileScreen: React.FC = () => {
  const {
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
        <UserIdentityCard
          user={user}
          onPressEdit={handleEditProfile}
          onPressChangePhoto={handleOpenPhotoSheet}
        />

        <ProfileWalletCard
          coins={coins}
          onPressRecharge={handleGoToCoins}
          onPressHistory={handleGoToHistory}
          onPressRewardedAd={handleWatchRewardedAd}
        />

        <ProfileStatsRow
          hoursPracticed={user.hoursPracticed}
          totalCalls={user.totalCalls}
          rating={user.rating}
        />

        <LanguagesSection
          user={user}
          onPressAddLanguage={handleOpenPracticeSheet}
          onPressEditLanguageItem={handleOpenEditLanguageItem}
          onPressRemoveLanguageItem={handleRemoveLanguageItem}
        />

        <TeachingModeCard
          isAvailable={user.isAvailableToTeach}
          onToggle={handleToggleTeachingMode}
          ratePerMin={user.earningRatePerMin}
          languageName={user.nativeLanguage?.name || 'Español'}
        />

        <AccountPreferencesSection
          onPressPersonalInfo={handleEditProfile}
          onPressLanguage={handleOpenLanguageSheet}
          onPressLogout={handleLogout}
        />
      </ScrollView>

      <AddLanguageBottomSheet
        visible={isPracticeSheetOpen}
        onClose={handleClosePracticeSheet}
        initialLanguageCode={editingLanguageCode}
      />

      <LanguageSelectorBottomSheet
        visible={isLanguageSheetOpen}
        onClose={handleCloseLanguageSheet}
      />

      <ChangePhotoBottomSheet
        visible={isPhotoSheetOpen}
        onClose={handleClosePhotoSheet}
        onChooseFromGallery={handleChooseFromGallery}
        onTakeSelfie={handleTakeSelfie}
      />

      <BottomTabBar activeTab="Perfil" />
    </SafeAreaContainer>
  );
};

export default ProfileScreen;
