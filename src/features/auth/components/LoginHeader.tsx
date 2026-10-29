import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, AppLogo } from '@/components';
import { getLanguageFlag } from '@/features/profile/components/LanguageSelectorBottomSheet';

export interface LoginHeaderProps {
  onBack?: () => void;
  onPressLanguage?: () => void;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  onBack,
  onPressLanguage,
}) => {
  const { t, i18n } = useTranslation('auth');
  const insets = useSafeAreaInsets();
  const activeFlag = getLanguageFlag(i18n.language);
  const activeLangCode = (i18n.language || 'es').split('-')[0].toUpperCase();

  return (
    <ImageBackground
      source={require('../../../../assets/images/logoLoginFondo.png')}
      style={[styles.heroBackground, { paddingTop: Math.max(insets.top, 16) }]}
      resizeMode="cover"
    >
      {/* Overlay oscuro para legibilidad del texto y contraste */}
      <View style={styles.overlay} />

      {/* Barra superior: selector de idioma a la derecha (reemplaza '1.4k activos') */}
      <View style={styles.topBar}>
        {onBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.backButton}
            accessibilityLabel="Volver"
            accessibilityRole="button"
          >
            <ChevronLeft size={22} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideSpacer} />
        )}

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onPressLanguage}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.languagePill}
          accessibilityLabel="Cambiar idioma"
          accessibilityRole="button"
        >
          <AppText style={styles.flagText}>{activeFlag}</AppText>
          <AppText style={styles.languageCodeText}>{activeLangCode}</AppText>
          <ChevronDown size={14} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.heroCenterContent}>
        <View style={styles.logoBadgeContainer}>
          <AppLogo size={46} rounded />
        </View>
        <AppText style={styles.heroBrandTitle}>AmisTalk</AppText>
        <AppText style={styles.heroBrandSubtitle}>
          {t('login.heroSubtitle', 'Habla con nativos de todo el mundo.')}
        </AppText>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  heroBackground: {
    width: '100%',
    height: 310,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    zIndex: 2,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    backgroundColor: colors.overlay,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideSpacer: {
    width: 38,
    height: 38,
  },
  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    gap: spacing.xs + 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  flagText: {
    fontSize: 15,
  },
  languageCodeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  heroCenterContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  logoBadgeContainer: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  heroBrandTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    marginTop: spacing.sm,
    letterSpacing: 0.3,
  },
  heroBrandSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.92,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

export default LoginHeader;