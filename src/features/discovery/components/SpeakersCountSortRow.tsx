import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../componentes';

export interface SpeakersCountSortRowProps {
  count: number;
  currentSortLabel?: string;
  onPressSort?: () => void;
}

export const SpeakersCountSortRow: React.FC<SpeakersCountSortRowProps> = ({
  count,
  currentSortLabel = 'Más relevantes',
  onPressSort,
}) => {
  return (
    <View style={styles.container}>
      <AppText variant="bodySmall" color={colors.textSecondary}>
        {count} hablantes disponibles
      </AppText>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressSort}
        style={styles.sortButton}
      >
        <AppText variant="bodySmall" style={styles.sortLabel}>
          {currentSortLabel}
        </AppText>
        <ChevronDown size={14} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortLabel: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 13,
  },
});
