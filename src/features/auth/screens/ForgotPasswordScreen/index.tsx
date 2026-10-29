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
import { ForgotPasswordHeader, ForgotPasswordForm } from '../../components';
import { LanguageSelectorBottomSheet } from '@/features/profile/components/LanguageSelectorBottomSheet';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { styles } from './styles';

export const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation('auth');
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const {
    control,
    handleSubmit,
    isLoading,
    handleBack,
    handleGoToLogin,
  } = useForgotPassword();

  const handleSmsRecovery = () => {
    Alert.alert(
      t('forgotPassword.smsNoticeTitle', 'Recuperación por SMS'),
      t(
        'forgotPassword.smsNoticeMessage',
        'Te enviaremos un código de seguridad por mensaje de texto.'
      )
    );
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
          {/* Header con imagen de fondo, logo AmistTalk y selector de idioma */}
          <ForgotPasswordHeader
            onBack={handleBack}
            onPressLanguage={() => setIsLanguageSheetOpen(true)}
          />

          {/* Tarjeta BottomSheet blanca scrollable superpuesta */}
          <View style={styles.sheetCard}>
            <View style={styles.handleBar} />

            {/* Formulario de Recuperación con React Hook Form */}
            <ForgotPasswordForm
              control={control}
              onSubmit={handleSubmit}
              onPressLogin={handleGoToLogin}
              onPressSmsRecovery={handleSmsRecovery}
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

export default ForgotPasswordScreen;