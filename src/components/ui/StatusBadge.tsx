import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';

export interface StatusBadgeProps {
  label: string;
  variant?: 'online' | 'native' | 'superTutor' | 'count' | 'danger' | 'live';
  hasDot?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'count',
  hasDot = false,
  style,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'online':
        return styles.online;
      case 'native':
        return styles.native;
      case 'superTutor':
        return styles.superTutor;
      case 'danger':
        return styles.danger;
      case 'live':
        return styles.live;
      case 'count':
      default:
        return styles.count;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'online':
        return colors.actionDark;
      case 'native':
        return colors.actionDark;
      case 'superTutor':
        return colors.dangerDark;
      case 'danger':
        return colors.textWhite;
      case 'live':
        return colors.textWhite;
      case 'count':
      default:
        return colors.primary;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      {hasDot && (
        <View
          style={[
            styles.dot,
            variant === 'live' ? styles.dotMint : styles.dotGreen,
          ]}
        />
      )}
      <AppText variant="caption" style={[styles.text, { color: getTextColor() }]}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  count: {
    backgroundColor: colors.primaryBgSubtle,
  },
  online: {
    backgroundColor: colors.actionLight,
  },
  native: {
    backgroundColor: colors.actionLight,
    borderRadius: 6,
  },
  superTutor: {
    backgroundColor: colors.dangerLight,
    borderRadius: 6,
  },
  danger: {
    backgroundColor: colors.dangerDark,
  },
  live: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotGreen: {
    backgroundColor: colors.online,
  },
  dotMint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.online,
  },
  text: {
    fontWeight: '700',
    fontSize: 11,
  },
});
