import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';
import { ExploreFilterType } from '../types';

export interface FilterPillsRowProps {
  activeFilter: ExploreFilterType;
  onSelectFilter: (filter: ExploreFilterType) => void;
}

export const FilterPillsRow: React.FC<FilterPillsRowProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  const { t } = useTranslation('explore');

  const filters = [
    { key: 'online' as ExploreFilterType, label: t('filters.online'), hasDot: true },
    { key: 'native_english' as ExploreFilterType, label: t('filters.nativeEnglish') },
    { key: 'top_rated' as ExploreFilterType, label: t('filters.topRated') },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((item) => {
        const isActive = activeFilter === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.8}
            onPress={() => onSelectFilter(item.key)}
            style={[styles.pill, isActive ? styles.activePill : styles.inactivePill]}
          >
            {item.hasDot && (
              <View
                style={[
                  styles.dot,
                  { backgroundColor: isActive ? colors.online : colors.textMuted },
                ]}
              />
            )}
            <AppText
              variant="bodySmall"
              style={[
                styles.pillText,
                isActive ? styles.activeText : styles.inactiveText,
              ]}
            >
              {item.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 24,
    gap: 6,
  },
  activePill: {
    backgroundColor: colors.primary,
  },
  inactivePill: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  pillText: {
    fontWeight: '600',
    fontSize: 13,
  },
  activeText: {
    color: colors.textWhite,
  },
  inactiveText: {
    color: colors.textPrimary,
  },
});
