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
import { SocialAuthButtons } from './SocialAuthButtons';
import { LoginFormData } from '../types';

export interface LoginFormProps {
  control: Control<LoginFormData>;
  onSubmit: () => void;
  onPressRegister: () => void;
  onPressForgotPassword?: () => void;
  onPressApple?: () => void;
  onPressGoogle?: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  control,
  onSubmit,
  onPressRegister,
  onPressForgotPassword,
  onPressApple,
  onPressGoogle,
  isLoading = false,
}) => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.container}>
      {/* Pestañas: Iniciar Sesión (activa) | Registrarse (inactiva) */}
      <View style={styles.tabsRow}>
        <View style={styles.tabItemActive}>
          <AppText style={styles.tabTextActive}>
            {t('login.tabLogin', 'Iniciar Sesión')}
          </AppText>
          <View style={styles.activeTabIndicator} />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressRegister}
          style={styles.tabItemInactive}
          accessibilityRole="button"
        >
          <AppText style={styles.tabTextInactive}>
            {t('login.tabRegister', 'Registrarse')}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Campo: CORREO ELECTRÓNICO */}
      <ControlledInput
        control={control}
        name="email"
        label={t('login.emailLabel', 'CORREO ELECTRÓNICO')}
        placeholder={t('login.emailPlaceholder', 'tu@email.com')}
        leftIcon={<Mail size={20} color={colors.primaryLight} />}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputBox}
        labelStyle={styles.inputLabel}
        placeholderTextColor={colors.textMuted}
        rules={{
          required: t('login.toasts.missingFieldsMessage'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('login.toasts.invalidEmail'),
          },
        }}
      />

      {/* Campo: CONTRASEÑA */}
      <ControlledInput
        control={control}
        name="password"
        label={t('login.passwordLabel', 'CONTRASEÑA')}
        placeholder={t('login.passwordPlaceholder', '•••••••••••••')}
        isPassword
        leftIcon={<Lock size={20} color={colors.primaryLight} />}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputBox}
        labelStyle={styles.inputLabel}
        placeholderTextColor={colors.textMuted}
        rules={{
          required: t('login.toasts.missingFieldsMessage'),
          minLength: {
            value: 6,
            message: t('login.toasts.shortPassword'),
          },
        }}
      />

      {/* ¿Olvidaste tu contraseña? */}
      {onPressForgotPassword && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressForgotPassword}
          style={styles.forgotPasswordContainer}
          accessibilityRole="button"
        >
          <AppText style={styles.forgotPasswordText}>
            {t('login.forgotPassword')}
          </AppText>
        </TouchableOpacity>
      )}

      {/* Botón Principal: Iniciar Sesión ➔ */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onSubmit}
        disabled={isLoading}
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        accessibilityRole="button"
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <View style={styles.submitButtonContent}>
            <AppText style={styles.submitButtonText}>
              {t('login.submitButton')}
            </AppText>
            <ArrowRight size={19} color={colors.white} style={styles.arrowIcon} />
          </View>
        )}
      </TouchableOpacity>

      {/* Separador "o inicia con" */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <AppText style={styles.dividerText}>
          {t('login.orDivider', 'o inicia con')}
        </AppText>
        <View style={styles.dividerLine} />
      </View>

      {/* Botones de Autenticación Social (Google & Apple) */}
      <SocialAuthButtons
        onPressApple={onPressApple}
        onPressGoogle={onPressGoogle}
      />

      {/* Pie de pantalla: ¿Aún no tienes cuenta? Regístrate gratis */}
      <View style={styles.footerRow}>
        <AppText style={styles.footerText}>
          {t('login.noAccountYet')}{' '}
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressRegister}
          accessibilityRole="button"
        >
          <AppText style={styles.registerLinkText}>
            {t('login.registerLink')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  tabItemActive: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabTextActive: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  activeTabIndicator: {
    height: 3,
    width: 84,
    borderRadius: borderRadius.xs,
    backgroundColor: colors.primary,
    marginTop: spacing.xs + 2,
  },
  tabItemInactive: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabTextInactive: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  inputFieldContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textTag,
    letterSpacing: 0.6,
    marginBottom: spacing.xs + 2,
  },
  inputBox: {
    height: 54,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.md - 2,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  submitButton: {
    height: 54,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  arrowIcon: {
    marginLeft: spacing.sm,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    paddingHorizontal: spacing.md,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '400',
  },
  registerLinkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default LoginForm;