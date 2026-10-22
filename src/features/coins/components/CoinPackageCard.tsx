import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Zap, CheckCircle2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../../../theme';
import { AppText } from '../../../components';
import { CoinPackage } from '../types';

export interface CoinPackageCardProps {
  pkg: CoinPackage;
  onPressBuy: (pkg: CoinPackage) => void;
}

export const CoinPackageCard: React.FC<CoinPackageCardProps> = ({
  pkg,
  onPressBuy,
}) => {
  const { t } = useTranslation('coins');

  const isPopular = pkg.type === 'popular';
  const isBestValue = pkg.type === 'bestValue';

  const getButtonBg = () => {
    if (isBestValue) return colors.action;
    if (isPopular) return colors.primary;
    return colors.surfaceHighlight;
  };

  const getButtonTextColor = () => {
    if (isBestValue || isPopular) return colors.textWhite;
    return colors.primary;
  };

  return (
    <View style={styles.cardContainer}>
      {/* Floating Badge (Más Popular o Mejor Valor) */}
      {pkg.floatingBadge && (
        <View
          style={[
            styles.floatingBadge,
            isBestValue ? styles.floatingBestValue : styles.floatingPopular,
          ]}
        >
          <AppText variant="caption" style={styles.floatingBadgeText}>
            {pkg.floatingBadge}
          </AppText>
        </View>
      )}

      {/* Cabecera de la tarjeta con badges y precio */}
      <View style={styles.cardHeader}>
        <View style={styles.titleInfo}>
          {pkg.badge && (
            <AppText variant="caption" style={styles.categoryBadge}>
              {pkg.badge}
            </AppText>
          )}
          {pkg.promoBadge && (
            <View
              style={[
                styles.promoBadge,
                isBestValue ? styles.promoBestValue : styles.promoPopular,
              ]}
            >
              <AppText variant="caption" style={styles.promoBadgeText}>
                {pkg.promoBadge}
              </AppText>
            </View>
          )}
          <AppText variant="h3" style={styles.title} numberOfLines={1}>
            {t(pkg.titleKey)}
          </AppText>
        </View>

        <View style={styles.priceContainer}>
          <AppText variant="h2" style={styles.priceText}>
            {pkg.price}
          </AppText>
          <AppText variant="caption" style={styles.currencyText}>
            {pkg.currency}
          </AppText>
        </View>
      </View>

      {/* Recuadro de monedas y detalles */}
      <View style={styles.coinsBox}>
        <View style={styles.coinsAmountRow}>
          <View style={styles.coinIconCircle}>
            <AppText style={styles.coinIconEmoji}>
              {pkg.iconType === 'crown' ? '👑' : '🪙'}
            </AppText>
          </View>
          <View style={styles.amountTextGroup}>
            <View style={styles.amountNumbers}>
              <AppText
                variant="h2"
                style={[
                  styles.coinsAmountText,
                  isPopular && styles.popularAmountColor,
                ]}
              >
                {pkg.coinsCount}
              </AppText>
              {pkg.originalCoinsCount && (
                <AppText variant="bodySmall" style={styles.strikethroughText}>
                  {pkg.originalCoinsCount}
                </AppText>
              )}
              <AppText variant="bodyMedium" style={styles.monedasLabel}>
                monedas
              </AppText>
            </View>
            <AppText variant="caption" style={styles.durationSubtitle}>
              {t(pkg.subtitleKey)}
            </AppText>
          </View>
        </View>
      </View>

      {/* Botón CTA */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPressBuy(pkg)}
        style={[styles.buyButton, { backgroundColor: getButtonBg() }]}
      >
        {isPopular && (
          <Zap size={16} color={colors.surface} fill={colors.surface} style={styles.btnIcon} />
        )}
        {isBestValue && (
          <CheckCircle2 size={16} color={colors.surface} style={styles.btnIcon} />
        )}
        <AppText
          variant="button"
          style={[styles.buyButtonText, { color: getButtonTextColor() }]}
        >
          {t(pkg.buttonKey)}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    position: 'relative',
    marginTop: spacing.sm,
  },
  floatingBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  floatingPopular: {
    backgroundColor: colors.primary,
  },
  floatingBestValue: {
    backgroundColor: colors.action,
  },
  floatingBadgeText: {
    color: colors.textWhite,
    fontWeight: '800',
    fontSize: 11,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  titleInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  categoryBadge: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  promoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  promoPopular: {
    backgroundColor: colors.dangerLight,
  },
  promoBestValue: {
    backgroundColor: colors.actionLight,
  },
  promoBadgeText: {
    fontWeight: '700',
    fontSize: 11,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  currencyText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  coinsBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  coinsAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  coinIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.dangerBgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinIconEmoji: {
    fontSize: 22,
  },
  amountTextGroup: {
    flex: 1,
  },
  amountNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  coinsAmountText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  popularAmountColor: {
    color: colors.coinDark,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
    fontSize: 13,
  },
  monedasLabel: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  durationSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: borderRadius.md,
  },
  btnIcon: {
    marginRight: 6,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
