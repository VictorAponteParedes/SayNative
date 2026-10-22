import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../componentes';
import { ExploreFilterType } from '../types';

export interface FilterPillsRowProps {
  activeFilter: ExploreFilterType;
  onSelectFilter: (filter: ExploreFilterType) => void;
}

interface FilterItem {
  key: ExploreFilterType;
  label: string;
  hasDot?: boolean;
}

const FILTERS: FilterItem[] = [
  { key: 'online', label: 'En línea ahora', hasDot: true },
  { key: 'native_english', label: '🇺🇸 Nativos en Inglés' },
  { key: 'top_rated', label: '⭐ Mejor calificados' },
];

export const FilterPillsRow: React.FC<FilterPillsRowProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((item) => {
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
                  { backgroundColor: isActive ? '#34D399' : colors.textMuted },
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
