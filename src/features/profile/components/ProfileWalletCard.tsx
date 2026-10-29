import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Plus, Play } from 'lucide-react-native';
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

  return (
    <View style={styles.card}>
      {/* Encabezado: Badge Billetera Virtual y Enlace a Historial */}
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
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
          accessibilityLabel="Ver historial de consumos"
        >
          <AppText style={styles.historyText}>
            {t('wallet.historyLink', 'Historial')}
          </AppText>
          <ChevronRight size={13} color={colors.textDarkAmber} />
        </TouchableOpacity>
      </View>

      {/* Saldo de Monedas con insignia dorada */}
      <View style={styles.balanceRow}>
        <View style={styles.coinBadgeCircle}>
          <AppText style={styles.coinBadgeSymbol}>🪙</AppText>
        </View>
        <AppText style={styles.balanceNumber}>
          {coins}
        </AppText>
        <AppText style={styles.balanceLabel}>
          Monedas
        </AppText>
      </View>

      {/* Botones de Acción redondeados */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressRecharge}
          style={styles.rechargeButton}
          accessibilityRole="button"
          accessibilityLabel="Recargar monedas"
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
          accessibilityLabel="Ver anuncio para ganar 5 monedas gratis"
        >
          <Play size={13} color={colors.coinDark} fill={colors.coinDark} style={styles.buttonIcon} />
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
    backgroundColor: '#FEF9C3',
    borderRadius: 22,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1.5,
    borderColor: '#FEF08A',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.coin,
    marginRight: 6,
  },
  badgeText: {
    fontFamily: fonts.bold,
    color: colors.textDarkAmber,
    letterSpacing: 0.8,
    fontSize: 11,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  historyText: {
    fontFamily: fonts.bold,
    color: colors.textDarkAmber,
    fontSize: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  coinBadgeCircle: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    backgroundColor: '#FDE047',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    shadowColor: colors.coin,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  coinBadgeSymbol: {
    fontSize: 20,
  },
  balanceNumber: {
    fontFamily: fonts.extraBold,
    fontSize: 34,
    color: colors.textPrimary,
    marginRight: 6,
  },
  balanceLabel: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDarkAmber,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
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
  },
  adButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEFCE8',
    paddingVertical: 12,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#FDE047',
  },
  adButtonText: {
    fontFamily: fonts.bold,
    color: colors.coinDark,
    fontSize: 14,
  },
});
