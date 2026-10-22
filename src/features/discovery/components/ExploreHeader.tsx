import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../componentes';

export interface ExploreHeaderProps {
  totalCount?: number;
  onPressHelp?: () => void;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  totalCount = 142,
  onPressHelp,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AppText variant="h2" style={styles.title}>
          Explorar Hablantes
        </AppText>
        <View style={styles.countBadge}>
          <AppText variant="caption" style={styles.countText}>
            {totalCount}
          </AppText>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressHelp}
        style={styles.helpButton}
      >
        <HelpCircle size={22} color={colors.textSecondary} />
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  countBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  helpButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
