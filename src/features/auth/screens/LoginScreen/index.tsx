import React, { useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText } from '@/components';
import {
  LoginHeader,
  SocialAuthButtons,
  LoginForm,
} from '../../components';
import { LanguageSelectorBottomSheet } from '@/features/profile/components/LanguageSelectorBottomSheet';
import { useLogin } from '../../hooks/useLogin';
import { styles } from './styles';

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation('auth');
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    isLoading,
    handleBack,
    handleGoToRegister,
  } = useLogin();

  const handleForgotPassword = () => {
    Alert.alert(
      t('login.forgotPassword'),
      'Te enviaremos las instrucciones de recuperación a tu correo electrónico.',
    );
  };

  return (
    <SafeAreaContainer edges={['top']} style={styles.container}>
      <LoginHeader
        onBack={handleBack}
        onPressLanguage={() => setIsLanguageSheetOpen(true)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardWrapper}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Título y Subtítulo de Bienvenida */}
          <AppText variant="h1" style={styles.title}>
            {t('login.title')}
          </AppText>
          <AppText variant="bodySmall" style={styles.subtitle}>
            {t('login.subtitle')}
          </AppText>

          {/* Botones de Autenticación Social (Apple & Google) */}
          <SocialAuthButtons />

          {/* Formulario Principal de Login con React Hook Form */}
          <LoginForm
            control={control}
            onSubmit={handleSubmit}
            onPressRegister={handleGoToRegister}
            onPressForgotPassword={handleForgotPassword}
            isLoading={isLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Selector interactivo de idioma */}
      <LanguageSelectorBottomSheet
        visible={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
      />
    </SafeAreaContainer>
  );
};

export default LoginScreen;
