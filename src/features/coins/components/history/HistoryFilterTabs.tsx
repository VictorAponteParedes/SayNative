import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../components';
import type { TransactionFilter } from '../../types';

export interface HistoryFilterTabsProps {
  activeFilter: TransactionFilter;
  onSelectFilter: (filter: TransactionFilter) => void;
}

interface FilterOption {
  key: TransactionFilter;
  labelKey: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', labelKey: 'history.filters.all' },
  { key: 'purchases', labelKey: 'history.filters.purchases' },
  { key: 'earned', labelKey: 'history.filters.earned' },
  { key: 'spent', labelKey: 'history.filters.spent' },
];

export const HistoryFilterTabs: React.FC<HistoryFilterTabsProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  const { t } = useTranslation('coins');

  return (
    <View style={styles.container}>
      {FILTER_OPTIONS.map((option) => {
        const isSelected = activeFilter === option.key;

        return (
          <TouchableOpacity
            key={option.key}
            activeOpacity={0.7}
            onPress={() => onSelectFilter(option.key)}
            style={[
              styles.tabPill,
              isSelected ? styles.tabPillActive : styles.tabPillInactive,
            ]}
          >
            <AppText
              variant="bodySmall"
              style={[
                styles.tabText,
                isSelected ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {t(option.labelKey)}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  tabPill: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPillActive: {
    backgroundColor: colors.primary,
  },
  tabPillInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 13,
  },
  tabTextActive: {
    color: colors.textWhite,
  },
  tabTextInactive: {
    color: colors.textSecondary,
  },
});
