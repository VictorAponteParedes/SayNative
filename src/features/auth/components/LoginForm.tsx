import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, ControlledInput } from '@/components';
import { LoginFormData } from '../types';

export interface LoginFormProps {
  control: Control<LoginFormData>;
  onSubmit: () => void;
  onPressRegister: () => void;
  onPressForgotPassword?: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  control,
  onSubmit,
  onPressRegister,
  onPressForgotPassword,
  isLoading = false,
}) => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.container}>
      {/* Separador "o inicia sesión con tu correo" */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <AppText variant="caption" style={styles.dividerText}>
          {t('login.orDivider')}
        </AppText>
        <View style={styles.dividerLine} />
      </View>

      {/* Campo: Correo Electrónico gestionado con React Hook Form */}
      <ControlledInput
        control={control}
        name="email"
        label={t('login.emailLabel')}
        placeholder={t('login.emailPlaceholder')}
        leftIcon={<Mail size={18} color={colors.textSecondary} />}
        keyboardType="email-address"
        autoCapitalize="none"
        rules={{
          required: t('login.toasts.missingFieldsMessage'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('login.toasts.invalidEmail'),
          },
        }}
      />

      {/* Campo: Contraseña */}
      <ControlledInput
        control={control}
        name="password"
        label={t('login.passwordLabel')}
        placeholder={t('login.passwordPlaceholder')}
        isPassword
        leftIcon={<Lock size={18} color={colors.textSecondary} />}
        autoCapitalize="none"
        rules={{
          required: t('login.toasts.missingFieldsMessage'),
          minLength: {
            value: 6,
            message: t('login.toasts.shortPassword'),
          },
        }}
      />

      {/* Olvidaste tu contraseña */}
      {onPressForgotPassword && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressForgotPassword}
          style={styles.forgotPasswordContainer}
        >
          <AppText variant="caption" style={styles.forgotPasswordText}>
            {t('login.forgotPassword')}
          </AppText>
        </TouchableOpacity>
      )}

      {/* Botón Principal: Iniciar Sesión */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onSubmit}
        disabled={isLoading}
        style={styles.submitButton}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <AppText variant="button" style={styles.submitButtonText}>
              {t('login.submitButton')}
            </AppText>
            <ArrowRight size={18} color={colors.white} style={styles.arrowIcon} />
          </>
        )}
      </TouchableOpacity>

      {/* Pie de Pantalla: Ir a Registro */}
      <View style={styles.footerRow}>
        <AppText variant="bodySmall" style={styles.footerText}>
          {t('login.noAccountYet')}{' '}
        </AppText>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressRegister}>
          <AppText variant="bodySmall" style={styles.registerLinkText}>
            {t('login.registerLink')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerText: {
    paddingHorizontal: spacing.sm,
    color: colors.textSecondary,
    fontSize: 12,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -spacing.xs,
    marginBottom: spacing.lg,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  arrowIcon: {
    marginLeft: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerLinkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default LoginForm;
