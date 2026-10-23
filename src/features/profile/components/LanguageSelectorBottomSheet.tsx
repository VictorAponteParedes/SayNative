import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react-native';
import { colors, spacing } from '../../../theme';
import { AppText, AppBottomSheet, Toast } from '../../../components';
import { SupportedLanguage, changeAppLanguage } from '../../../lang/i18n';

export interface LanguageItem {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const AVAILABLE_LANGUAGES: LanguageItem[] = [
  { code: 'es', name: 'Español', nativeName: 'Spanish', flag: '🇪🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', nativeName: 'Portuguese', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', nativeName: 'French', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', nativeName: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: '中文 (简体)', nativeName: 'Chinese Simplified', flag: '🇨🇳' },
];

export const getLanguageFlag = (langCode?: string): string => {
  const code = (langCode?.split('-')[0] || 'es') as SupportedLanguage;
  const match = AVAILABLE_LANGUAGES.find((lang) => lang.code === code);
  return match ? match.flag : '🇪🇸';
};

export interface LanguageSelectorBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageSelectorBottomSheet: React.FC<LanguageSelectorBottomSheetProps> = ({
  visible,
  onClose,
}) => {
  const { t, i18n } = useTranslation('profile');
  const currentLang = (i18n.language || 'es') as SupportedLanguage;

  const handleSelectLanguage = async (item: LanguageItem) => {
    if (item.code === currentLang) {
      onClose();
      return;
    }

    await changeAppLanguage(item.code);
    onClose();

    // Feedback visual con el nuevo idioma
    setTimeout(() => {
      Toast.success(
        t('toasts.languageChangedTitle'),
        t('toasts.languageChangedMessage', { lang: item.name })
      );
    }, 250);
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('account.languageSheetTitle')}
      subtitle={t('account.languageSheetSubtitle')}
    >
      <View style={styles.listContainer}>
        {AVAILABLE_LANGUAGES.map((item) => {
          const isSelected = item.code === currentLang;

          return (
            <TouchableOpacity
              key={item.code}
              activeOpacity={0.7}
              onPress={() => handleSelectLanguage(item)}
              style={[
                styles.languageRow,
                isSelected && styles.languageRowSelected,
              ]}
            >
              <View style={styles.leftContent}>
                <View style={styles.flagContainer}>
                  <AppText style={styles.flag}>{item.flag}</AppText>
                </View>
                <View style={styles.textColumn}>
                  <AppText
                    variant="body"
                    style={[
                      styles.languageName,
                      isSelected && styles.languageNameSelected,
                    ]}
                  >
                    {item.name}
                  </AppText>
                  <AppText variant="caption" style={styles.languageNative}>
                    {item.nativeName}
                  </AppText>
                </View>
              </View>

              {isSelected && (
                <View style={styles.checkCircle}>
                  <Check size={16} color={colors.white} strokeWidth={2.5} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: spacing.xs,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
    marginBottom: spacing.xs + 2,
  },
  languageRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBgSubtle,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  flag: {
    fontSize: 20,
  },
  textColumn: {
    justifyContent: 'center',
  },
  languageName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  languageNameSelected: {
    color: colors.primary,
  },
  languageNative: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
