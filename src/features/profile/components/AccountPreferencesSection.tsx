import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  User,
  Globe,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';
import { navigate } from '../../../navigation/NavigationRef';
import { Routes } from '../../../navigation/routes';

export interface AccountPreferencesSectionProps {
  onPressPersonalInfo: () => void;
  onPressLanguage: () => void;
  onPressLogout: () => void;
}

export const AccountPreferencesSection: React.FC<
  AccountPreferencesSectionProps
> = ({ onPressPersonalInfo, onPressLanguage, onPressLogout }) => {
  const { t, i18n } = useTranslation('profile');

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'es':
        return 'Español 🇪🇸';
      case 'en':
        return 'English 🇺🇸';
      case 'pt':
        return 'Português 🇧🇷';
      case 'fr':
        return 'Français 🇫🇷';
      case 'ja':
        return '日本語 🇯🇵';
      case 'zh':
        return '中文 (简体) 🇨🇳';
      default:
        return 'Español 🇪🇸';
    }
  };

  const handleSimpleAlert = (titleKey: string, message: string) => {
    Alert.alert(t(titleKey), message);
  };

  return (
    <View style={styles.container}>
      <AppText variant="h3" style={styles.sectionTitle}>
        {t('account.sectionTitle')}
      </AppText>

      <View style={styles.card}>
        {/* Datos Personales (Acceso directo al correo y datos de cuenta) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressPersonalInfo}
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
            <User size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.rowTitle}>
              {t('account.personalInfo')}
            </AppText>
            <AppText variant="caption" style={styles.rowSubtitle}>
              {t('account.personalInfoSubtitle')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Idioma de la Aplicación */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressLanguage}
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
            <Globe size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.rowTitle}>
              {t('account.appLanguage')}
            </AppText>
            <AppText variant="caption" style={styles.rowSubtitle}>
              {getLanguageLabel(i18n.language)}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Notificaciones */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate(Routes.App.Notifications)}
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
            <Bell size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.rowTitle}>
              {t('account.notifications')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Seguridad y Moderación */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate(Routes.App.Security)}
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
            <Shield size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.rowTitle}>
              {t('account.security')}
            </AppText>
            <AppText variant="caption" style={styles.rowSubtitle}>
              {t('account.securitySubtitle')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Ayuda y Soporte */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate(Routes.App.Support)}
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
            <HelpCircle size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.rowTitle}>
              {t('account.help')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Términos y Privacidad */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            handleSimpleAlert(
              'account.terms',
              'Términos y condiciones del servicio y política de privacidad.'
            )
          }
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.surfaceSubtle }]}>
            <FileText size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.rowTitle}>
              {t('account.terms')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Cerrar Sesión */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressLogout}
          style={styles.menuRow}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.dangerLight }]}>
            <LogOut size={18} color={colors.dangerDark} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={[styles.rowTitle, { color: colors.dangerDark }]}>
              {t('account.logout')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.dangerDark} />
        </TouchableOpacity>
      </View>

      {/* Footer de Versión */}
      <AppText variant="caption" style={styles.footerVersion}>
        {t('footer.version')}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textColumn: {
    flex: 1,
  },
  rowTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 14,
  },
  rowSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  footerVersion: {
    textAlign: 'center',
    color: colors.textMuted,
    marginVertical: spacing.md,
    fontSize: 12,
  },
});
