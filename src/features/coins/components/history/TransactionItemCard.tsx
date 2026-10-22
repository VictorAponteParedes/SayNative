import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  CreditCard,
  Video,
  GraduationCap,
  Sparkles,
  Gift,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../components';
import type { CoinTransaction, TransactionIconType } from '../../types';

export interface TransactionItemCardProps {
  transaction: CoinTransaction;
}

export const TransactionItemCard: React.FC<TransactionItemCardProps> = ({
  transaction,
}) => {
  const { t } = useTranslation('coins');

  const renderIcon = (iconType: TransactionIconType) => {
    switch (iconType) {
      case 'card':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: colors.primaryBgSubtle }]}>
            <CreditCard size={18} color={colors.primary} />
          </View>
        );
      case 'call':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: colors.dangerBgSubtle }]}>
            <Video size={18} color={colors.danger} />
          </View>
        );
      case 'tutor':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: colors.actionLight }]}>
            <GraduationCap size={18} color={colors.actionDark} />
          </View>
        );
      case 'ad':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: colors.coinLight }]}>
            <Sparkles size={18} color={colors.coinDark} />
          </View>
        );
      case 'gift':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: colors.primaryBgSubtle }]}>
            <Gift size={18} color={colors.primaryLight} />
          </View>
        );
    }
  };

  const isPositive = transaction.amount > 0;
  const formattedAmount = isPositive
    ? `+${transaction.amount}`
    : `${transaction.amount}`;

  return (
    <View style={styles.container}>
      {renderIcon(transaction.iconType)}

      <View style={styles.textContainer}>
        <AppText variant="body" numberOfLines={1} style={styles.title}>
          {t(`history.${transaction.titleKey}`)}
        </AppText>
        <AppText variant="caption" numberOfLines={1} style={styles.subtitle}>
          {t(`history.${transaction.subtitleKey}`)}
        </AppText>
      </View>

      <View
        style={[
          styles.amountPill,
          isPositive ? styles.amountPillPositive : styles.amountPillNegative,
        ]}
      >
        <AppText
          variant="bodySmall"
          style={[
            styles.amountText,
            isPositive ? styles.amountTextPositive : styles.amountTextNegative,
          ]}
        >
          {formattedAmount} 🪙
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 14,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  amountPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountPillPositive: {
    backgroundColor: colors.actionLight,
  },
  amountPillNegative: {
    backgroundColor: colors.dangerLight,
  },
  amountText: {
    fontWeight: '800',
    fontSize: 13,
  },
  amountTextPositive: {
    color: colors.actionDark,
  },
  amountTextNegative: {
    color: colors.dangerDark,
  },
});
