import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  User,
  Mail,
  Lock,
  RotateCcw,
  Eye,
  EyeOff,
  Info,
  Check,
  ArrowRight,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';
import { RegisterFormData } from '../types';

export interface RegisterFormProps {
  formData: RegisterFormData;
  onChangeField: <K extends keyof RegisterFormData>(
    field: K,
    value: RegisterFormData[K]
  ) => void;
  onSubmit: () => void;
  onPressLogin: () => void;
  onPressTerms: () => void;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  onChangeField,
  onSubmit,
  onPressLogin,
  onPressTerms,
  isLoading = false,
}) => {
  const { t } = useTranslation('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <View style={styles.fieldContainer}>
        <AppText variant="bodySmall" style={styles.inputLabel}>
          {t('register.nameLabel')}
        </AppText>
        <View style={styles.inputBox}>
          <User size={18} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            value={formData.fullName}
            onChangeText={(text) => onChangeField('fullName', text)}
            placeholder={t('register.namePlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={styles.textInput}
            autoCapitalize="words"
          />
        </View>
      </View>

      {/* Campo: Correo Electrónico */}
      <View style={styles.fieldContainer}>
        <AppText variant="bodySmall" style={styles.inputLabel}>
          {t('register.emailLabel')}
        </AppText>
        <View style={styles.inputBox}>
          <Mail size={18} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            value={formData.email}
            onChangeText={(text) => onChangeField('email', text)}
            placeholder={t('register.emailPlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Campo: Contraseña */}
      <View style={styles.fieldContainer}>
        <AppText variant="bodySmall" style={styles.inputLabel}>
          {t('register.passwordLabel')}
        </AppText>
        <View style={styles.inputBox}>
          <Lock size={18} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            value={formData.password}
            onChangeText={(text) => onChangeField('password', text)}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!showPassword}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? (
              <EyeOff size={18} color={colors.textSecondary} />
            ) : (
              <Eye size={18} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.hintRow}>
          <Info size={14} color={colors.actionDark} style={styles.hintIcon} />
          <AppText variant="caption" style={styles.hintText}>
            {t('register.passwordHint')}
          </AppText>
        </View>
      </View>

      {/* Campo: Confirmar Contraseña */}
      <View style={styles.fieldContainer}>
        <AppText variant="bodySmall" style={styles.inputLabel}>
          {t('register.confirmPasswordLabel')}
        </AppText>
        <View style={styles.inputBox}>
          <RotateCcw
            size={18}
            color={colors.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            value={formData.confirmPassword}
            onChangeText={(text) => onChangeField('confirmPassword', text)}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!showConfirmPassword}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
          >
            {showConfirmPassword ? (
              <EyeOff size={18} color={colors.textSecondary} />
            ) : (
              <Eye size={18} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Checkbox: Términos y Privacidad */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onChangeField('acceptTerms', !formData.acceptTerms)}
        style={styles.checkboxRow}
      >
        <View
          style={[
            styles.checkbox,
            formData.acceptTerms && styles.checkboxActive,
          ]}
        >
          {formData.acceptTerms && (
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
          onChangeField('acceptPromotions', !formData.acceptPromotions)
        }
        style={styles.checkboxRow}
      >
        <View
          style={[
            styles.checkbox,
            formData.acceptPromotions && styles.checkboxActive,
          ]}
        >
          {formData.acceptPromotions && (
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
  fieldContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: spacing.xs,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  hintIcon: {
    marginRight: 4,
  },
  hintText: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
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
