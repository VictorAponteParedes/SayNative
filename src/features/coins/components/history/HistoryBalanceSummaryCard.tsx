import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface HistoryBalanceSummaryCardProps {
  currentBalance: number;
  totalEarned: number;
  totalConsumed: number;
}

export const HistoryBalanceSummaryCard: React.FC<
  HistoryBalanceSummaryCardProps
> = ({ currentBalance, totalEarned, totalConsumed }) => {
  const { t } = useTranslation('coins');

  return (
    <View style={styles.card}>
      {/* Encabezado: Saldo actual + Badge Sincronizado */}
      <View style={styles.topRow}>
        <AppText variant="caption" style={styles.label}>
          {t('history.balanceTitle')}
        </AppText>

        <View style={styles.syncedBadge}>
          <View style={styles.syncedDot} />
          <AppText variant="caption" style={styles.syncedText}>
            {t('history.synced')}
          </AppText>
        </View>
      </View>

      {/* Saldo Principal */}
      <View style={styles.balanceRow}>
        <AppText style={styles.coinEmoji}>🪙</AppText>
        <AppText variant="h1" style={styles.balanceNumber}>
          {currentBalance.toLocaleString()}
        </AppText>
        <AppText variant="h3" style={styles.balanceCurrency}>
          {' '}{t('history.monedas')}
        </AppText>
      </View>

      {/* Tarjetas resumen (Ganadas y Consumidas) */}
      <View style={styles.statsRow}>
        {/* Ganadas */}
        <View style={styles.statCard}>
          <View style={styles.statTitleRow}>
            <View style={[styles.statDot, { backgroundColor: colors.action }]} />
            <AppText variant="caption" style={styles.statLabel}>
              {t('history.totalEarned')}
            </AppText>
          </View>
          <AppText variant="body" style={styles.statEarnedValue}>
            +{totalEarned.toLocaleString()} 🪙
          </AppText>
        </View>

        {/* Consumidas */}
        <View style={styles.statCard}>
          <View style={styles.statTitleRow}>
            <View style={[styles.statDot, { backgroundColor: colors.coinDark }]} />
            <AppText variant="caption" style={styles.statLabel}>
              {t('history.consumed')}
            </AppText>
          </View>
          <AppText variant="body" style={styles.statConsumedValue}>
            -{totalConsumed.toLocaleString()} 🪙
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  syncedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.actionLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  syncedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.online,
    marginRight: 4,
  },
  syncedText: {
    color: colors.actionDark,
    fontSize: 11,
    fontWeight: '700',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  coinEmoji: {
    fontSize: 24,
    marginRight: spacing.xs,
  },
  balanceNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  balanceCurrency: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statLabel: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  statEarnedValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.actionDark,
  },
  statConsumedValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.dangerDark,
  },
});
