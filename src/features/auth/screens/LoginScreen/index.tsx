import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppAlert } from '@/components';
import { LoginHeader, LoginForm } from '../../components';
import { LanguageSelectorBottomSheet } from '@/features/profile/components/LanguageSelectorBottomSheet';
import { useLogin } from '../../hooks/useLogin';
import { styles } from './styles';
import { Routes, navigate } from '@/navigation';

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation('auth');
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    isLoading,
    handleGoToRegister,
  } = useLogin();

  const handleForgotPassword = () => {
    navigate(Routes.Auth.ForgotPassword);
  };

  const handleAppleAuth = () => {
    AppAlert.info(t('login.appleButton'), t('login.socialComingSoon'));
  };

  const handleGoogleAuth = () => {
    AppAlert.info(t('login.googleButton'), t('login.socialComingSoon'));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        {...(Platform.OS === 'android' ? { backgroundColor: 'transparent', translucent: true } : {})}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardWrapper}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <LoginHeader
            onPressLanguage={() => setIsLanguageSheetOpen(true)}
          />
          <View style={styles.sheetCard}>
            <View style={styles.handleBar} />
            <LoginForm
              control={control}
              onSubmit={handleSubmit}
              onPressRegister={handleGoToRegister}
              onPressForgotPassword={handleForgotPassword}
              onPressApple={handleAppleAuth}
              onPressGoogle={handleGoogleAuth}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Selector interactivo de idioma */}
      <LanguageSelectorBottomSheet
        visible={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
      />
    </View>
  );
};

export default LoginScreen;