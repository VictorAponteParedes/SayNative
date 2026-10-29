import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from '@/components';

export const BonusRewardCard: React.FC = () => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <AppText style={styles.giftEmoji}>🎁</AppText>
        <View style={styles.badgeTitleColumn}>
          <AppText style={styles.badgeTitle}>Bono de</AppText>
          <AppText style={styles.badgeTitle}>Bienvenida:</AppText>
        </View>
      </View>

      <AppText style={styles.bonusDescription} numberOfLines={1}>
        {t('register.bonusText', '50 monedas gratis al registrarte')}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    marginBottom: spacing.md,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  giftEmoji: {
    fontSize: 22,
  },
  badgeTitleColumn: {
    justifyContent: 'center',
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 15,
  },
  bonusDescription: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDarkRed,
    textAlign: 'right',
    marginLeft: spacing.sm,
  },
});

export default BonusRewardCard;