import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RegisterHeader, RegisterForm } from '../../components';
import { LanguageSelectorBottomSheet } from '@/features/profile/components/LanguageSelectorBottomSheet';
import { useRegister } from '../../hooks/useRegister';
import { styles } from './styles';
import { Routes, navigate } from '@/navigation';

export const RegisterScreen: React.FC = () => {
  const { t } = useTranslation('auth');
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    errors,
    handleBack,
    isLoading,
  } = useRegister();

  const handleTerms = () => {
    Alert.alert(
      t('register.termsModalTitle'),
      t('register.termsModalMessage'),
    );
  };

  const handleGoToLogin = () => {
    navigate(Routes.Auth.Login);
  };

  const handleAppleAuth = () => {
    Alert.alert(t('register.appleButton'), t('register.socialComingSoon'));
  };

  const handleGoogleAuth = () => {
    Alert.alert(t('register.googleButton'), t('register.socialComingSoon'));
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
          {/* Header con imagen de fondo, icono morado, SayNative y selector de idioma */}
          <RegisterHeader
            onBack={handleBack}
            onPressLanguage={() => setIsLanguageSheetOpen(true)}
          />

          {/* Tarjeta BottomSheet blanca scrollable superpuesta */}
          <View style={styles.sheetCard}>
            <View style={styles.handleBar} />

            {/* Formulario de Registro con Tabs, React Hook Form y Botones Sociales */}
            <RegisterForm
              control={control}
              watch={watch}
              setValue={setValue}
              errors={errors}
              onSubmit={handleSubmit}
              onPressLogin={handleGoToLogin}
              onPressTerms={handleTerms}
              onPressApple={handleAppleAuth}
              onPressGoogle={handleGoogleAuth}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Selector de idioma */}
      <LanguageSelectorBottomSheet
        visible={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
      />
    </View>
  );
};

export default RegisterScreen;