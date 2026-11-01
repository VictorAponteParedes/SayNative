import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Plus, Play, Coins, Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText } from '@/components';

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
  const safeCoins = Number(coins) || 0;
  const practiceMinutes = Math.floor(safeCoins / 10);

  return (
    <View style={styles.card}>
      {/* Encabezado: Badge Billetera Virtual y Enlace a Historial */}
      <View style={styles.topRow}>
        <View style={styles.badgePill}>
          <View style={styles.amberDot} />
          <AppText style={styles.badgeText}>
            {t('wallet.badge', 'BILLETERA VIRTUAL')}
          </AppText>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressHistory}
          style={styles.historyButton}
          accessibilityRole="button"
          accessibilityLabel={t('wallet.historyLink', 'Historial de consumos')}
        >
          <AppText style={styles.historyText}>
            {t('wallet.historyLink', 'Historial de consumos')}
          </AppText>
          <ChevronRight size={13} color="#92400E" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Saldo de Monedas con insignia vectorial premium */}
      <View style={styles.balanceContainer}>
        <View style={styles.coinBadgeCircle}>
          <View style={styles.coinInnerCircle}>
            <Coins size={24} color="#D97706" strokeWidth={2.4} />
          </View>
        </View>

        <View style={styles.balanceInfo}>
          <View style={styles.balanceNumberRow}>
            <AppText style={styles.balanceNumber}>
              {safeCoins.toLocaleString()}
            </AppText>
            <View style={styles.currencyBadge}>
              <AppText style={styles.currencyBadgeText}>
                {t('wallet.coinsLabel', 'MONEDAS')}
              </AppText>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Sparkles size={11} color="#D97706" />
            <AppText style={styles.metaText}>
              {practiceMinutes > 0
                ? t('wallet.practiceEquivalent', {
                    minutes: practiceMinutes,
                    defaultValue: `~${practiceMinutes} min de videollamada`,
                  })
                : t('wallet.availableBalance', 'Saldo disponible')}
            </AppText>
          </View>
        </View>
      </View>

      {/* Botones de Acción redondeados */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressRecharge}
          style={styles.rechargeButton}
          accessibilityRole="button"
          accessibilityLabel={t('wallet.rechargeButton', 'Recargar')}
        >
          <Plus size={16} color={colors.white} strokeWidth={2.6} style={styles.buttonIcon} />
          <AppText style={styles.rechargeButtonText}>
            {t('wallet.rechargeButton', 'Recargar')}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressRewardedAd}
          style={styles.adButton}
          accessibilityRole="button"
          accessibilityLabel={t('wallet.freeAdButton', { count: 5, defaultValue: '+5 gratis' })}
        >
          <Play size={13} color="#92400E" fill="#92400E" style={styles.buttonIcon} />
          <AppText style={styles.adButtonText}>
            {t('wallet.freeAdButton', { count: 5, defaultValue: '+5 gratis' })}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF0',
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md + 2,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  amberDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 6,
  },
  badgeText: {
    fontFamily: fonts.bold,
    color: '#92400E',
    letterSpacing: 0.8,
    fontSize: 10,
    fontWeight: '800',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
  },
  historyText: {
    fontFamily: fonts.bold,
    color: '#92400E',
    fontSize: 11,
    fontWeight: '700',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
    paddingVertical: 2,
  },
  coinBadgeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  coinInnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  balanceNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceNumber: {
    fontFamily: fonts.extraBold,
    fontSize: 34,
    lineHeight: 38,
    color: '#0F172A',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  currencyBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  currencyBadgeText: {
    fontFamily: fonts.bold,
    color: '#B45309',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaText: {
    fontFamily: fonts.medium,
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  rechargeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: borderRadius.full,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 5,
  },
  rechargeButtonText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  adButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 12,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#FCD34D',
  },
  adButtonText: {
    fontFamily: fonts.bold,
    color: '#92400E',
    fontSize: 14,
    fontWeight: '700',
  },
});
