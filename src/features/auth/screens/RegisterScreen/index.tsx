import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText } from '../../../../components';
import {
  RegisterHeader,
  BonusRewardCard,
  SocialAuthButtons,
  RegisterForm,
} from '../../components';
import { useRegister } from '../../hooks/useRegister';
import { styles } from './styles';
import { navigate } from '../../../../navigation/NavigationRef';
import { Routes } from '../../../../navigation/routes';

export const RegisterScreen: React.FC = () => {
  const { t } = useTranslation('auth');
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
      'Términos y Privacidad',
      'SayNative es una comunidad segura de intercambio de idiomas. Al crear tu cuenta aceptas nuestras normas de respeto mutuo y políticas de datos.'
    );
  };

  const handleGoToLogin = () => {
    navigate(Routes.Auth.Login);
  };

  return (
    <SafeAreaContainer edges={['top']} style={styles.container}>
      <RegisterHeader onBack={handleBack} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Título y Subtítulo */}
          <AppText variant="h1" style={styles.title}>
            {t('register.title')}
          </AppText>
          <AppText variant="bodySmall" style={styles.subtitle}>
            {t('register.subtitle')}
          </AppText>

          {/* Tarjeta de Bono Exclusivo (+50 monedas gratis) */}
          <BonusRewardCard />

          {/* Botones de Registro Social (Apple & Google) */}
          <SocialAuthButtons />

          {/* Formulario Principal de Registro con Validación */}
          <RegisterForm
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
            onSubmit={handleSubmit}
            onPressLogin={handleGoToLogin}
            onPressTerms={handleTerms}
            isLoading={isLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default RegisterScreen;
