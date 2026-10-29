import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  User,
  Mail,
  Lock,
  Check,
  ArrowRight,
  Info,
} from 'lucide-react-native';
import {
  Control,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText, ControlledInput } from '@/components';
import { BonusRewardCard } from './BonusRewardCard';
import { SocialAuthButtons } from './SocialAuthButtons';
import { RegisterFormData } from '../types';

export interface RegisterFormProps {
  control: Control<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
  setValue: UseFormSetValue<RegisterFormData>;
  onSubmit: () => void;
  onPressLogin: () => void;
  onPressTerms: () => void;
  onPressApple?: () => void;
  onPressGoogle?: () => void;
  errors?: FieldErrors<RegisterFormData>;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  control,
  watch,
  setValue,
  onSubmit,
  onPressLogin,
  onPressTerms,
  onPressApple,
  onPressGoogle,
  errors,
  isLoading = false,
}) => {
  const { t } = useTranslation('auth');
  const acceptTerms = watch('acceptTerms');

  return (
    <View style={styles.container}>
      {/* Pestañas: Iniciar Sesión (inactiva) | Registrarse (activa) */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressLogin}
          style={styles.tabItemInactive}
          accessibilityRole="button"
        >
          <AppText style={styles.tabTextInactive}>
            {t('login.tabLogin', 'Iniciar Sesión')}
          </AppText>
        </TouchableOpacity>

        <View style={styles.tabItemActive}>
          <AppText style={styles.tabTextActive}>
            {t('login.tabRegister', 'Registrarse')}
          </AppText>
          <View style={styles.activeTabIndicator} />
        </View>
      </View>

      {/* Tarjeta compacta del Bono de Bienvenida (+50 monedas) */}
      <BonusRewardCard />

      {/* Campo: NOMBRE O APODO */}
      <ControlledInput
        control={control}
        name="fullName"
        label={t('register.nameLabel', 'NOMBRE O APODO')}
        placeholder={t('register.namePlaceholder', 'Ej. Victor Aponte')}
        leftIcon={<User size={20} color={colors.primaryLight} />}
        autoCapitalize="words"
        autoCorrect={false}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputBox}
        labelStyle={styles.inputLabel}
        placeholderTextColor={colors.textMuted}
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          minLength: {
            value: 2,
            message: t('register.minChars2', 'Mínimo 2 caracteres'),
          },
        }}
      />

      {/* Campo: CORREO ELECTRÓNICO */}
      <ControlledInput
        control={control}
        name="email"
        label={t('register.emailLabel', 'CORREO ELECTRÓNICO')}
        placeholder={t('register.emailPlaceholder', 'tu@email.com')}
        leftIcon={<Mail size={20} color={colors.primaryLight} />}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputBox}
        labelStyle={styles.inputLabel}
        placeholderTextColor={colors.textMuted}
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('register.toasts.invalidEmail'),
          },
        }}
      />

      {/* Campo: CONTRASEÑA */}
      <ControlledInput
        control={control}
        name="password"
        label={t('register.passwordLabel', 'CONTRASEÑA')}
        placeholder={t('register.passwordPlaceholder', '••••••••')}
        isPassword
        leftIcon={<Lock size={20} color={colors.primaryLight} />}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.passwordContainer}
        inputContainerStyle={styles.inputBox}
        labelStyle={styles.inputLabel}
        placeholderTextColor={colors.textMuted}
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          minLength: {
            value: 8,
            message: t('register.toasts.shortPassword'),
          },
        }}
      />

      {/* Indicador de contraseña mínima */}
      <View style={styles.passwordHintRow}>
        <Info size={14} color={colors.textSecondary} style={styles.infoIcon} />
        <AppText style={styles.passwordHintText}>
          {t('register.passwordHint', 'Mínimo 8 caracteres')}
        </AppText>
      </View>

      {/* Checkbox: Términos de Servicio y Privacidad */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setValue('acceptTerms', !acceptTerms, { shouldValidate: true })}
        style={styles.checkboxRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: acceptTerms }}
      >
        <View
          style={[
            styles.checkbox,
            acceptTerms && styles.checkboxActive,
            Boolean(errors?.acceptTerms) && styles.checkboxError,
          ]}
        >
          {acceptTerms && (
            <Check size={14} color={colors.white} strokeWidth={3} />
          )}
        </View>
        <AppText style={styles.checkboxText}>
          {t('register.termsPrefix', 'Acepto los')}{' '}
          <AppText style={styles.linkText} onPress={onPressTerms}>
            {t('register.termsOfService', 'Términos de Servicio')}
          </AppText>{' '}
          {t('register.andConjunction', 'y')}{' '}
          <AppText style={styles.linkText} onPress={onPressTerms}>
            {t('register.privacyPolicy', 'Privacidad')}
          </AppText>
        </AppText>
      </TouchableOpacity>
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
              {t('register.submitButton', 'Crear cuenta')}
            </AppText>
            <ArrowRight size={19} color={colors.white} style={styles.arrowIcon} />
          </View>
        )}
      </TouchableOpacity>

      {/* Separador "o regístrate con" */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <AppText style={styles.dividerText}>
          {t('register.orDivider', 'o regístrate con')}
        </AppText>
        <View style={styles.dividerLine} />
      </View>

      {/* Botones de Registro Social (Google & Apple) */}
      <SocialAuthButtons
        onPressApple={onPressApple}
        onPressGoogle={onPressGoogle}
      />

      {/* Pie de pantalla: ¿Ya tienes cuenta? Inicia sesión */}
      <View style={styles.footerRow}>
        <AppText style={styles.footerText}>
          {t('register.alreadyHaveAccount', '¿Ya tienes cuenta?')}{' '}
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressLogin}
          accessibilityRole="button"
        >
          <AppText style={styles.loginLinkText}>
            {t('register.loginLink', 'Inicia sesión')}
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
    marginBottom: spacing.md,
    paddingTop: spacing.xs,
  },
  tabItemActive: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabTextActive: {
    fontFamily: fonts.extraBold,
    fontSize: 18,
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
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.textSecondary,
  },
  inputFieldContainer: {
    marginBottom: spacing.md,
  },
  passwordContainer: {
    marginBottom: spacing.xs,
  },
  inputLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
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
  passwordHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  infoIcon: {
    marginRight: spacing.xs,
  },
  passwordHintText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs / 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.xs + 2,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerBgSubtle,
  },
  checkboxText: {
    fontFamily: fonts.regular,
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  linkText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 13,
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
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 16,
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
    fontFamily: fonts.medium,
    paddingHorizontal: spacing.md,
    color: colors.textSecondary,
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  footerText: {
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLinkText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 14,
  },
});

export default RegisterForm;