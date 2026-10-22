import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../componentes';

export interface TypingIndicatorProps {
  partnerName?: string;
  isTyping?: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  partnerName = 'Sarah',
  isTyping = true,
}) => {
  const { t } = useTranslation('chats');

  if (!isTyping) return null;

  return (
    <View style={styles.container}>
      <AppText variant="caption" style={styles.text}>
        {t('privateChat.typing', { name: partnerName })}
      </AppText>
      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: 6,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primary,
  },
});
