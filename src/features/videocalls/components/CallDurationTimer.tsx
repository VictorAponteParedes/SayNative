import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, borderRadius } from '@/theme';
import { AppText } from '@/components';

export interface CallDurationTimerProps {
  formattedTime: string;
}

export const CallDurationTimer: React.FC<CallDurationTimerProps> = ({ formattedTime }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <AppText variant="bodyMedium" style={styles.timerText}>
        {formattedTime}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  timerText: {
    color: colors.white,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});

export default CallDurationTimer;
