import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, AppBottomSheet, Toast } from '../../../components';
import { useAuthStore, UserLanguage } from '../../../store/useAuthStore';

export interface PracticeLanguageBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const AVAILABLE_PRACTICE_LANGUAGES: UserLanguage[] = [
  {
    code: 'en',
    name: 'Inglés',
    flag: '🇺🇸',
    level: 'Nivel B1 · Intermedio',
    targetLevel: 'B2',
  },
  {
    code: 'fr',
    name: 'Francés',
    flag: '🇫🇷',
    level: 'Nivel A2 · Básico',
    targetLevel: 'B1',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    level: 'Nivel B2 · Avanzado',
    targetLevel: 'C1',
  },
  {
    code: 'ja',
    name: 'Japonés',
    flag: '🇯🇵',
    level: 'Nivel A1 · Principiante',
    targetLevel: 'A2',
  },
  {
    code: 'zh',
    name: 'Chino',
    flag: '🇨🇳',
    level: 'Nivel A1 · Principiante',
    targetLevel: 'A2',
  },
  {
    code: 'de',
    name: 'Alemán',
    flag: '🇩🇪',
    level: 'Nivel A2 · Básico',
    targetLevel: 'B1',
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    level: 'Nivel B1 · Intermedio',
    targetLevel: 'B2',
  },
];

export const PracticeLanguageBottomSheet: React.FC<
  PracticeLanguageBottomSheetProps
> = ({ visible, onClose }) => {
  const { t } = useTranslation('home');
  const currentLearning = useAuthStore((state) => state.user.learningLanguage);
  const updateLearningLanguage = useAuthStore(
    (state) => state.updateLearningLanguage
  );

  const handleSelect = (lang: UserLanguage) => {
    updateLearningLanguage(lang);
    onClose();

    setTimeout(() => {
      Toast.success(
        'Idioma de práctica',
        `Ahora estás practicando ${lang.name} (${lang.level?.split('·')[0].trim() || 'B1'})`
      );
    }, 250);
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('languageFilter.selectLanguageTitle')}
      subtitle={t('languageFilter.selectLanguageMessage')}
    >
      <View style={styles.listContainer}>
        {AVAILABLE_PRACTICE_LANGUAGES.map((item) => {
          const isSelected = item.code === currentLearning.code;

          return (
            <TouchableOpacity
              key={item.code}
              activeOpacity={0.7}
              onPress={() => handleSelect(item)}
              style={[
                styles.languageRow,
                isSelected && styles.languageRowSelected,
              ]}
            >
              <View style={styles.leftContent}>
                <View style={styles.flagContainer}>
                  <AppText style={styles.flagText}>{item.flag}</AppText>
                </View>

                <View style={styles.textColumn}>
                  <AppText
                    variant="body"
                    style={[
                      styles.langName,
                      isSelected && styles.langNameSelected,
                    ]}
                  >
                    {item.name}
                  </AppText>
                  <AppText variant="caption" style={styles.langLevel}>
                    {item.level}
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
  flagText: {
    fontSize: 20,
  },
  textColumn: {
    justifyContent: 'center',
  },
  langName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  langNameSelected: {
    color: colors.primary,
  },
  langLevel: {
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
