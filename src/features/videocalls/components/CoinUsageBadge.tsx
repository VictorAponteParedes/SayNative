import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, borderRadius } from '@/theme';
import { AppText } from '@/components';

export interface CoinUsageBadgeProps {
  coins: number;
  ratePerMinute: number;
  isTeacher?: boolean;
}

export const CoinUsageBadge: React.FC<CoinUsageBadgeProps> = ({
  coins,
  ratePerMinute,
  isTeacher = false,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.coinIcon}>🪙</AppText>
      <AppText variant="caption" style={styles.text}>
        {isTeacher ? `+${coins}` : `-${coins}`} ({ratePerMinute}/m)
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.coin,
  },
  coinIcon: {
    fontSize: 13,
  },
  text: {
    color: colors.white,
    fontWeight: '700',
  },
});

export default CoinUsageBadge;
