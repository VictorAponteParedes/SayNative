import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Plus, Play } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';

export interface ProfileWalletCardProps {
  coins: number;
  onPressRecharge: () => void;
  onPressHistory: () => void;
  onPressRewardedAd: () => void;
}

export const ProfileWalletCard: React.FC<ProfileWalletCardProps> = ({
  coins,
  onPressRecharge,
  onPressHistory,
  onPressRewardedAd,
}) => {
  const { t } = useTranslation('profile');

  return (
    <View style={styles.card}>
      {/* Encabezado: Badge y Enlace a Historial */}
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
          <View style={styles.amberDot} />
          <AppText variant="caption" style={styles.badgeText}>
            {t('wallet.badge')}
          </AppText>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressHistory}
          style={styles.historyButton}
        >
          <AppText variant="caption" style={styles.historyText}>
            {t('wallet.historyLink')}
          </AppText>
          <ChevronRight size={14} color={colors.textDarkAmber} />
        </TouchableOpacity>
      </View>

      {/* Saldo de Monedas */}
      <View style={styles.balanceRow}>
        <AppText style={styles.coinEmoji}>🪙</AppText>
        <AppText variant="h1" style={styles.balanceNumber}>
          {coins}
        </AppText>
        <AppText variant="h3" style={styles.balanceLabel}>
          {' '}Monedas
        </AppText>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressRecharge}
          style={styles.rechargeButton}
        >
          <Plus size={18} color={colors.surface} strokeWidth={2.5} style={styles.actionIcon} />
          <AppText variant="button" style={styles.rechargeButtonText}>
            {t('wallet.rechargeButton')}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressRewardedAd}
          style={styles.adButton}
        >
          <Play size={16} color={colors.coinDark} fill={colors.coinDark} style={styles.actionIcon} />
          <AppText variant="button" style={styles.adButtonText}>
            {t('wallet.freeAdButton')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.coinLight,
    borderRadius: 18,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amberDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.coinDark,
    marginRight: 6,
  },
  badgeText: {
    color: colors.textDarkAmber,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontSize: 11,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  historyText: {
    color: colors.textDarkAmber,
    fontWeight: '700',
    fontSize: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  coinEmoji: {
    fontSize: 26,
    marginRight: spacing.xs,
  },
  balanceNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.coinDark,
  },
  balanceLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.coinDark,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  rechargeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 11,
    borderRadius: 12,
  },
  actionIcon: {
    marginRight: 6,
  },
  rechargeButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 14,
  },
  adButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  adButtonText: {
    color: colors.coinDark,
    fontWeight: '700',
    fontSize: 14,
  },
});
