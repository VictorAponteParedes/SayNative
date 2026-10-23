import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Coins } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export const BonusRewardCard: React.FC = () => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.card}>
      <View style={styles.coinCircle}>
        <Coins size={24} color={colors.coinDark} />
      </View>

      <View style={styles.textColumn}>
        <View style={styles.badgeRow}>
          <AppText variant="caption" style={styles.badgeText}>
            {t('register.bonusBadge')}
          </AppText>
          <View style={styles.badgeDot} />
        </View>

        <AppText variant="bodySmall" style={styles.bonusDescription}>
          ¡Regístrate hoy y recibe{' '}
          <AppText style={styles.highlightText}>50 monedas gratis</AppText> para
          tus primeras videollamadas!
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF', // Suave índigo / lavanda
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    marginVertical: spacing.md,
  },
  coinCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.coinLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.coin,
  },
  textColumn: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.dangerDark,
    letterSpacing: 0.5,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.danger,
    marginLeft: 4,
  },
  bonusDescription: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  highlightText: {
    fontWeight: '800',
    color: colors.dangerDark,
  },
});
