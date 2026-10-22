import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';

export interface CoinBadgeProps {
  amount?: number | string;
  label?: string;
  variant?: 'pill' | 'transparent' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export const CoinBadge: React.FC<CoinBadgeProps> = ({
  amount,
  label,
  variant = 'pill',
  size = 'md',
  style,
}) => {
  const isPill = variant === 'pill';
  const isTransparent = variant === 'transparent';

  return (
    <View
      style={[
        styles.container,
        isPill && styles.pill,
        isTransparent && styles.transparent,
        size === 'sm' && styles.small,
        style,
      ]}
    >
      <View style={styles.coinCircle}>
        <AppText style={styles.coinSymbol}>🪙</AppText>
      </View>
      {amount !== undefined && (
        <AppText
          variant={size === 'sm' ? 'caption' : 'bodyMedium'}
          style={[
            styles.amountText,
            isTransparent && styles.textWhite,
            size === 'sm' && styles.smallText,
          ]}
        >
          {amount}
        </AppText>
      )}
      {label && (
        <AppText
          variant="caption"
          style={[styles.labelText, isTransparent && styles.textWhite]}
        >
          {label}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pill: {
    backgroundColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 20,
  },
  transparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  coinCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinSymbol: {
    fontSize: 14,
  },
  amountText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  smallText: {
    fontSize: 12,
  },
  labelText: {
    color: colors.textSecondary,
  },
  textWhite: {
    color: colors.textWhite,
  },
});
