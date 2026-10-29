import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  KeyRound,
  AtSign,
  Shield,
  Send,
  MessageSquare,
} from 'lucide-react-native';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, ControlledInput } from '@/components';
import { ForgotPasswordFormData } from '../types';

export interface ForgotPasswordFormProps {
  control: Control<ForgotPasswordFormData>;
  onSubmit: () => void;
  onPressLogin: () => void;
  onPressSmsRecovery?: () => void;
  isLoading?: boolean;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  control,
  onSubmit,
  onPressLogin,
  onPressSmsRecovery,
  isLoading = false,
}) => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.container}>
      {/* Icono central de llave con fondo lavanda suave */}
      <View style={styles.keyIconWrapper}>
        <View style={styles.keyIconCircle}>
          <KeyRound size={26} color={colors.primary} />
        </View>
      </View>

      {/* Título y Subtítulo explicativo */}
      <AppText style={styles.cardTitle}>
        {t('forgotPassword.cardTitle', '¿Olvidaste tu contraseña?')}
      </AppText>
      <AppText style={styles.cardSubtitle}>
        {t(
          'forgotPassword.cardSubtitle',
          'Ingresa el correo electrónico asociado y te enviaremos un enlace seguro para restablecerla.'
        )}
      </AppText>

      {/* Campo: CORREO ELECTRÓNICO */}
      <ControlledInput
        control={control}
        name="email"
        label={t('forgotPassword.emailLabel', 'CORREO ELECTRÓNICO')}
        placeholder={t('forgotPassword.emailPlaceholder', 'tu@email.com')}
        leftIcon={<AtSign size={20} color={colors.textSecondary} />}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputBox}
        labelStyle={styles.inputLabel}
        placeholderTextColor={colors.textMuted}
        rules={{
          required: t('forgotPassword.toasts.missingFieldsMessage', 'Por favor ingresa tu correo electrónico.'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('forgotPassword.toasts.invalidEmail', 'Ingresa un correo electrónico válido.'),
          },
        }}
      />

      {/* Banner de Aviso de Seguridad / Spam */}
      <View style={styles.spamNoticeCard}>
        <Shield size={20} color={colors.primary} style={styles.shieldIcon} />
        <AppText style={styles.spamNoticeText}>
          {t(
            'forgotPassword.spamNotice',
            'Revisa también tu bandeja de spam si no recibes el correo en los próximos 2 minutos.'
          )}
        </AppText>
      </View>

      {/* Botón Principal: Enviar enlace ➔ */}
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
              {t('forgotPassword.submitButton', 'Enviar enlace')}
            </AppText>
            <Send size={18} color={colors.white} style={styles.sendIcon} />
          </View>
        )}
      </TouchableOpacity>

      {/* Opción alternativa: Recuperar por SMS */}
      {onPressSmsRecovery && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressSmsRecovery}
          style={styles.smsRecoveryButton}
          accessibilityRole="button"
        >
          <MessageSquare size={16} color={colors.textPrimary} style={styles.smsIcon} />
          <AppText style={styles.smsRecoveryText}>
            {t('forgotPassword.smsRecovery', '¿Sin acceso a tu correo? Recuperar por SMS')}
          </AppText>
        </TouchableOpacity>
      )}

      {/* Pie de pantalla: ¿Recordaste tu contraseña? Iniciar Sesión */}
      <View style={styles.footerRow}>
        <AppText style={styles.footerText}>
          {t('forgotPassword.rememberPassword', '¿Recordaste tu contraseña?')}{' '}
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressLogin}
          accessibilityRole="button"
        >
          <AppText style={styles.loginLinkText}>
            {t('forgotPassword.loginLink', 'Iniciar Sesión')}
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
  keyIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  keyIconCircle: {
    width: 58,
    height: 58,
    borderRadius: borderRadius.md + 4,
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs + 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
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
  spamNoticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    paddingVertical: spacing.md - 2,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  shieldIcon: {
    flexShrink: 0,
  },
  spamNoticeText: {
    flex: 1,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    lineHeight: 18,
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
    marginBottom: spacing.lg,
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
  sendIcon: {
    marginLeft: spacing.sm,
  },
  smsRecoveryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  smsIcon: {
    marginRight: spacing.xs + 2,
  },
  smsRecoveryText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '400',
  },
  loginLinkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ForgotPasswordForm;