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
  RotateCcw,
  Check,
  ArrowRight,
} from 'lucide-react-native';
import {
  Control,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, ControlledInput } from '../../../components';
import { RegisterFormData } from '../types';

export interface RegisterFormProps {
  control: Control<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
  setValue: UseFormSetValue<RegisterFormData>;
  onSubmit: () => void;
  onPressLogin: () => void;
  onPressTerms: () => void;
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
  isLoading = false,
}) => {
  const { t } = useTranslation('auth');
  const acceptTerms = watch('acceptTerms');
  const acceptPromotions = watch('acceptPromotions');

  return (
    <View style={styles.container}>
      {/* Separador "o regístrate con tu correo" */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <AppText variant="caption" style={styles.dividerText}>
          {t('register.orDivider')}
        </AppText>
        <View style={styles.dividerLine} />
      </View>

      {/* Campo: Nombre o Apodo */}
      <ControlledInput
        control={control}
        name="fullName"
        label={t('register.nameLabel')}
        placeholder={t('register.namePlaceholder')}
        leftIcon={<User size={18} color={colors.textSecondary} />}
        autoCapitalize="words"
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          minLength: {
            value: 2,
            message: 'Mínimo 2 caracteres',
          },
        }}
      />

      {/* Campo: Correo Electrónico */}
      <ControlledInput
        control={control}
        name="email"
        label={t('register.emailLabel')}
        placeholder={t('register.emailPlaceholder')}
        leftIcon={<Mail size={18} color={colors.textSecondary} />}
        keyboardType="email-address"
        autoCapitalize="none"
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('register.toasts.invalidEmail'),
          },
        }}
      />

      {/* Campo: Contraseña */}
      <ControlledInput
        control={control}
        name="password"
        label={t('register.passwordLabel')}
        placeholder="••••••••"
        isPassword
        leftIcon={<Lock size={18} color={colors.textSecondary} />}
        hint={t('register.passwordHint')}
        autoCapitalize="none"
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          minLength: {
            value: 8,
            message: t('register.toasts.shortPassword'),
          },
        }}
      />

      {/* Campo: Confirmar Contraseña */}
      <ControlledInput
        control={control}
        name="confirmPassword"
        label={t('register.confirmPasswordLabel')}
        placeholder="••••••••"
        isPassword
        leftIcon={<RotateCcw size={18} color={colors.textSecondary} />}
        autoCapitalize="none"
        rules={{
          required: t('register.toasts.missingFieldsMessage'),
          validate: (val) =>
            val === watch('password') || t('register.toasts.passwordsDoNotMatch'),
        }}
      />

      {/* Checkbox: Términos y Privacidad */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setValue('acceptTerms', !acceptTerms, { shouldValidate: true })}
        style={styles.checkboxRow}
      >
        <View
          style={[
            styles.checkbox,
            acceptTerms && styles.checkboxActive,
          ]}
        >
          {acceptTerms && (
            <Check size={14} color={colors.white} strokeWidth={3} />
          )}
        </View>
        <AppText variant="caption" style={styles.checkboxText}>
          Acepto los{' '}
          <AppText
            variant="caption"
            style={styles.linkText}
            onPress={onPressTerms}
          >
            Términos de Servicio
          </AppText>{' '}
          y la{' '}
          <AppText
            variant="caption"
            style={styles.linkText}
            onPress={onPressTerms}
          >
            Política de Privacidad
          </AppText>
          .
        </AppText>
      </TouchableOpacity>

      {/* Checkbox: Promociones */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          setValue('acceptPromotions', !acceptPromotions, { shouldValidate: true })
        }
        style={styles.checkboxRow}
      >
        <View
          style={[
            styles.checkbox,
            acceptPromotions && styles.checkboxActive,
          ]}
        >
          {acceptPromotions && (
            <Check size={14} color={colors.white} strokeWidth={3} />
          )}
        </View>
        <AppText variant="caption" style={styles.checkboxText}>
          {t('register.promotionsAccept')}
        </AppText>
      </TouchableOpacity>

      {/* Botón Principal: Crear Cuenta y Reclamar Monedas */}
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
              {t('register.submitButton')}
            </AppText>
            <ArrowRight size={18} color={colors.white} style={styles.arrowIcon} />
          </>
        )}
      </TouchableOpacity>

      {/* Pie de Pantalla: Iniciar Sesión */}
      <View style={styles.footerRow}>
        <AppText variant="bodySmall" style={styles.footerText}>
          {t('register.alreadyHaveAccount')}{' '}
        </AppText>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressLogin}>
          <AppText variant="bodySmall" style={styles.loginLinkText}>
            {t('register.loginLink')}
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm + 2,
    paddingHorizontal: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 1,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  arrowIcon: {
    marginLeft: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  loginLinkText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
});

export default RegisterForm;
