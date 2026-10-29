import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText, AppBottomSheet, AppButton, Toast, AppAlert } from '@/components';
import { useAuthStore, UserLanguage } from '@/store/useAuthStore';
import { profileApi } from '../api/profileApi';

export interface AddLanguageBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialLanguageCode?: string | null;
}

interface CatalogLanguage {
  code: string;
  name: string;
  flag: string;
}

interface ProficiencyStep {
  id: 'A1' | 'A2' | 'B1' | 'B2' | 'C2';
  titleKey: string;
  shortKey: string;
  descKey: string;
  percentage: number;
  targetLevel: string;
  isNative: boolean;
}

const LANGUAGE_CATALOG: CatalogLanguage[] = [
  { code: 'en', name: 'Inglés', flag: '🇺🇸' },
  { code: 'fr', name: 'Francés', flag: '🇫🇷' },
  { code: 'pt', name: 'Portugués', flag: '🇧🇷' },
  { code: 'ja', name: 'Japonés', flag: '🇯🇵' },
  { code: 'zh', name: 'Chino', flag: '🇨🇳' },
  { code: 'de', name: 'Alemán', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', name: 'Coreano', flag: '🇰🇷' },
  { code: 'ru', name: 'Ruso', flag: '🇷🇺' },
  { code: 'ar', name: 'Árabe', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const PROFICIENCY_STEPS: ProficiencyStep[] = [
  {
    id: 'A1',
    titleKey: 'languages.levels.a1Title',
    shortKey: 'languages.levels.a1Short',
    descKey: 'languages.levels.a1Desc',
    percentage: 20,
    targetLevel: 'A2',
    isNative: false,
  },
  {
    id: 'A2',
    titleKey: 'languages.levels.a2Title',
    shortKey: 'languages.levels.a2Short',
    descKey: 'languages.levels.a2Desc',
    percentage: 40,
    targetLevel: 'B1',
    isNative: false,
  },
  {
    id: 'B1',
    titleKey: 'languages.levels.b1Title',
    shortKey: 'languages.levels.b1Short',
    descKey: 'languages.levels.b1Desc',
    percentage: 60,
    targetLevel: 'B2',
    isNative: false,
  },
  {
    id: 'B2',
    titleKey: 'languages.levels.b2Title',
    shortKey: 'languages.levels.b2Short',
    descKey: 'languages.levels.b2Desc',
    percentage: 85,
    targetLevel: 'C1',
    isNative: false,
  },
  {
    id: 'C2',
    titleKey: 'languages.levels.c2Title',
    shortKey: 'languages.levels.c2Short',
    descKey: 'languages.levels.c2Desc',
    percentage: 100,
    targetLevel: 'C2',
    isNative: true,
  },
];

const isValidUuid = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export const AddLanguageBottomSheet: React.FC<AddLanguageBottomSheetProps> = ({
  visible,
  onClose,
  initialLanguageCode,
}) => {
  const { t } = useTranslation('profile');
  const user = useAuthStore((state) => state.user);
  const addOrUpdateUserLanguage = useAuthStore(
    (state) => state.addOrUpdateUserLanguage
  );
  const removeUserLanguage = useAuthStore((state) => state.removeUserLanguage);

  const existingList = Array.isArray(user.learningLanguagesList)
    ? user.learningLanguagesList
    : [user.learningLanguage];

  const [selectedLang, setSelectedLang] = useState<CatalogLanguage>(
    LANGUAGE_CATALOG[0]
  );
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(2); // Por defecto B1 (60%)
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!visible) return;

    if (initialLanguageCode) {
      const foundInCatalog = LANGUAGE_CATALOG.find(
        (l) => l.code === initialLanguageCode
      );
      if (foundInCatalog) {
        setSelectedLang(foundInCatalog);
      }

      const existingItem = existingList.find(
        (l) => l.code === initialLanguageCode
      );
      if (existingItem) {
        const pct = existingItem.progressPercentage ?? 60;
        const matchedIdx = PROFICIENCY_STEPS.findIndex(
          (s) =>
            existingItem.isNative
              ? s.isNative
              : Math.abs(s.percentage - pct) <= 15
        );
        if (matchedIdx >= 0) {
          setSelectedStepIndex(matchedIdx);
        }
      }
      return;
    }

    // Seleccionar por defecto el primer idioma que el usuario aún no tenga
    const firstNew = LANGUAGE_CATALOG.find(
      (item) =>
        item.code !== user.nativeLanguage.code &&
        !existingList.some((e) => e.code === item.code)
    );
    if (firstNew) {
      setSelectedLang(firstNew);
      setSelectedStepIndex(0);
    }
  }, [visible, initialLanguageCode]);

  const activeStep = PROFICIENCY_STEPS[selectedStepIndex];

  const handleSelectLanguage = (lang: CatalogLanguage) => {
    setSelectedLang(lang);
    const existingItem = existingList.find((l) => l.code === lang.code);
    if (existingItem) {
      const pct = existingItem.progressPercentage ?? 60;
      const matchedIdx = PROFICIENCY_STEPS.findIndex((s) =>
        existingItem.isNative ? s.isNative : Math.abs(s.percentage - pct) <= 15
      );
      if (matchedIdx >= 0) {
        setSelectedStepIndex(matchedIdx);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const translatedLevelTitle = t(activeStep.titleKey);
    const shortLevel = t(activeStep.shortKey);

    const newLanguageEntry: UserLanguage = {
      code: selectedLang.code,
      name: selectedLang.name,
      flag: selectedLang.flag,
      level: translatedLevelTitle,
      progressPercentage: activeStep.percentage,
      targetLevel: activeStep.targetLevel,
      isNative: activeStep.isNative,
    };

    addOrUpdateUserLanguage(newLanguageEntry);

    if (user.id && isValidUuid(user.id)) {
      try {
        await profileApi.saveUserLanguage(user.id, {
          languageCode: selectedLang.code,
          languageName: selectedLang.name,
          flagEmoji: selectedLang.flag,
          type: activeStep.isNative ? 'NATIVE' : 'LEARNING',
          cefrLevel: translatedLevelTitle,
          targetLevel: activeStep.targetLevel,
          progressPercentage: activeStep.percentage,
        });
      } catch (err) {
        if (__DEV__) {
          console.log('[AddLanguageBottomSheet] Guardado local (endpoint pendiente):', err);
        }
      }
    }

    setIsSaving(false);
    onClose();

    setTimeout(() => {
      Toast.success(
        t('languages.languageSavedTitle'),
        t('languages.languageSavedMessage', {
          name: selectedLang.name,
          level: shortLevel,
        })
      );
    }, 250);
  };

  const isSelectedAlreadyInList = existingList.some(
    (e) => e.code === selectedLang.code
  );

  const handleDeleteLanguage = () => {
    AppAlert.confirm({
      title: t('languages.deleteConfirmTitle', 'Eliminar idioma'),
      message: t('languages.deleteConfirmMessage', {
        name: selectedLang.name,
        defaultValue: `¿Estás seguro de que deseas eliminar ${selectedLang.name} de tu lista de idiomas?`,
      }),
      cancelText: t('languages.cancel', 'Cancelar'),
      confirmText: t('languages.deleteConfirm', 'Eliminar'),
      confirmColor: colors.danger,
      onConfirm: async () => {
        removeUserLanguage(selectedLang.code);
        if (user.id && isValidUuid(user.id)) {
          try {
            await profileApi.removeUserLanguage(user.id, selectedLang.code);
          } catch (err) {
            if (__DEV__) {
              console.log('[AddLanguageBottomSheet] Eliminado local:', err);
            }
          }
        }
        onClose();
        setTimeout(() => {
          Toast.success(
            t('languages.languageRemovedTitle'),
            t('languages.languageRemovedMessage')
          );
        }, 250);
      },
    });
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('languages.addLanguageTitle')}
      subtitle={t('languages.addLanguageMessage')}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PASO 1: Seleccionar Idioma */}
        <AppText style={styles.sectionLabel}>
          {t('languages.selectLanguageLabel')}
        </AppText>

        <View style={styles.languageGrid}>
          {LANGUAGE_CATALOG.map((item) => {
            const isSelected = selectedLang.code === item.code;
            const isAlreadyInList =
              item.code === user.nativeLanguage.code ||
              existingList.some((e) => e.code === item.code);

            return (
              <TouchableOpacity
                key={item.code}
                activeOpacity={0.75}
                onPress={() => handleSelectLanguage(item)}
                style={[
                  styles.languageChip,
                  isSelected && styles.languageChipSelected,
                ]}
              >
                <AppText style={styles.chipFlag}>{item.flag}</AppText>
                <View style={styles.chipTextCol}>
                  <AppText
                    style={[
                      styles.chipName,
                      isSelected && styles.chipNameSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </AppText>
                  {isAlreadyInList && (
                    <AppText style={styles.alreadyAddedTag}>
                      {t('languages.alreadyAdded')}
                    </AppText>
                  )}
                </View>
                {isSelected && (
                  <View style={styles.miniCheck}>
                    <Check size={12} color={colors.white} strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PASO 2: Barra interactiva de Nivel */}
        <AppText style={[styles.sectionLabel, styles.secondSectionLabel]}>
          {t('languages.selectLevelLabel')}
        </AppText>

        <View style={styles.levelCard}>
          {/* Cabecera del nivel seleccionado */}
          <View style={styles.levelHeaderRow}>
            <View style={styles.levelTitleRow}>
              <AppText style={styles.selectedFlagPreview}>
                {selectedLang.flag}
              </AppText>
              <View>
                <AppText style={styles.activeLevelTitle}>
                  {t(activeStep.titleKey)}
                </AppText>
                <AppText style={styles.activeLevelDesc}>
                  {t(activeStep.descKey)}
                </AppText>
              </View>
            </View>

            <View
              style={[
                styles.percentageBadge,
                activeStep.isNative && styles.nativePercentageBadge,
              ]}
            >
              <AppText
                style={[
                  styles.percentageBadgeText,
                  activeStep.isNative && styles.nativePercentageBadgeText,
                ]}
              >
                {activeStep.isNative
                  ? t('languages.nativeBadge')
                  : `${activeStep.percentage}%`}
              </AppText>
            </View>
          </View>

          {/* Barra de Progreso Interactiva por Segmentos */}
          <View style={styles.interactiveBarWrapper}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${activeStep.percentage}%`,
                    backgroundColor: activeStep.isNative
                      ? colors.action
                      : colors.primary,
                  },
                ]}
              />
            </View>

            {/* Nodos táctiles sobre la barra */}
            <View style={styles.nodesRow}>
              {PROFICIENCY_STEPS.map((step, index) => {
                const isReached = index <= selectedStepIndex;
                const isCurrent = index === selectedStepIndex;

                return (
                  <TouchableOpacity
                    key={step.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedStepIndex(index)}
                    hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
                    style={styles.nodeTouchArea}
                  >
                    <View
                      style={[
                        styles.stepNode,
                        isReached &&
                          (activeStep.isNative
                            ? styles.stepNodeNative
                            : styles.stepNodeReached),
                        isCurrent && styles.stepNodeCurrent,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Botones de selección rápida de nivel debajo de la barra */}
          <View style={styles.levelPillsRow}>
            {PROFICIENCY_STEPS.map((step, index) => {
              const isCurrent = index === selectedStepIndex;
              return (
                <TouchableOpacity
                  key={step.id}
                  activeOpacity={0.75}
                  onPress={() => setSelectedStepIndex(index)}
                  style={[
                    styles.levelPill,
                    isCurrent &&
                      (step.isNative
                        ? styles.levelPillNativeActive
                        : styles.levelPillActive),
                  ]}
                >
                  <AppText
                    style={[
                      styles.levelPillCode,
                      isCurrent && styles.levelPillTextActive,
                    ]}
                  >
                    {step.id}
                  </AppText>
                  <AppText
                    style={[
                      styles.levelPillLabel,
                      isCurrent && styles.levelPillTextActive,
                    ]}
                    numberOfLines={1}
                  >
                    {t(step.shortKey)}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Botón Guardar */}
        <AppButton
          title={t('languages.saveLanguageButton')}
          onPress={handleSave}
          loading={isSaving}
          variant="primary"
          style={styles.saveButton}
        />

        {/* Botón Eliminar si el idioma ya está agregado */}
        {isSelectedAlreadyInList && (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleDeleteLanguage}
            style={styles.deleteOutlineButton}
            accessibilityRole="button"
          >
            <Trash2 size={16} color={colors.dangerDark} />
            <AppText style={styles.deleteOutlineButtonText}>
              {t('languages.deleteLanguageButton', 'Eliminar idioma')}
            </AppText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.md,
  },
  sectionLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  secondSectionLabel: {
    marginTop: spacing.md,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  languageChip: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  languageChipSelected: {
    backgroundColor: colors.primaryBgSubtle,
    borderColor: colors.primary,
  },
  chipFlag: {
    fontSize: 22,
    marginRight: spacing.xs + 2,
  },
  chipTextCol: {
    flex: 1,
  },
  chipName: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  chipNameSelected: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  alreadyAddedTag: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.textMuted,
  },
  miniCheck: {
    width: 18,
    height: 18,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  levelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  selectedFlagPreview: {
    fontSize: 26,
    marginRight: spacing.sm,
  },
  activeLevelTitle: {
    fontFamily: fonts.extraBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  activeLevelDesc: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  percentageBadge: {
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
  },
  nativePercentageBadge: {
    backgroundColor: colors.actionLight,
    borderColor: colors.actionLight,
  },
  percentageBadgeText: {
    fontFamily: fonts.extraBold,
    fontSize: 12,
    color: colors.primary,
  },
  nativePercentageBadgeText: {
    color: colors.actionDark,
  },
  interactiveBarWrapper: {
    position: 'relative',
    justifyContent: 'center',
    height: 32,
    marginVertical: spacing.xs,
  },
  barTrack: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  nodesRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  nodeTouchArea: {
    padding: 4,
  },
  stepNode: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 2.5,
    borderColor: colors.borderDark,
  },
  stepNodeReached: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  stepNodeNative: {
    borderColor: colors.action,
    backgroundColor: colors.action,
  },
  stepNodeCurrent: {
    width: 22,
    height: 22,
    backgroundColor: colors.white,
    borderWidth: 5,
  },
  levelPillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: 6,
  },
  levelPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelPillNativeActive: {
    backgroundColor: colors.action,
    borderColor: colors.action,
  },
  levelPillCode: {
    fontFamily: fonts.extraBold,
    fontSize: 11,
    color: colors.textPrimary,
  },
  levelPillLabel: {
    fontFamily: fonts.medium,
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 1,
  },
  levelPillTextActive: {
    color: colors.white,
  },
  saveButton: {
    marginTop: spacing.lg,
  },
  deleteOutlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    marginTop: spacing.sm,
    paddingVertical: spacing.sm + 4,
    borderRadius: borderRadius.md,
    backgroundColor: colors.dangerBgSubtle,
    borderWidth: 1,
    borderColor: colors.dangerLight,
  },
  deleteOutlineButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.dangerDark,
  },
});

export default AddLanguageBottomSheet;
