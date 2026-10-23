import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';

export interface CoinsHeroSectionProps {
  currentCoins: number;
}

export const CoinsHeroSection: React.FC<CoinsHeroSectionProps> = ({
  currentCoins,
}) => {
  const { t } = useTranslation('coins');

  return (
    <View style={styles.container}>
      {/* Icono de Cofre / Monedas */}
      <View style={styles.chestIconContainer}>
        <AppText style={styles.chestEmoji}>🎁</AppText>
      </View>

      {/* Título de la sección */}
      <AppText variant="h2" style={styles.title}>
        {t('hero.title')}
      </AppText>

      {/* Píldora de saldo actual - Clic para ver historial de transacciones */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigate(Routes.App.CoinsHistory)}
        style={styles.balancePill}
      >
        <AppText style={styles.coinIcon}>🪙</AppText>
        <AppText variant="bodySmall" style={styles.balanceText}>
          {t('hero.balance', { count: currentCoins })}
        </AppText>
      </TouchableOpacity>

      {/* Explicación de la tarifa */}
      <AppText variant="caption" style={styles.rateExplanation}>
        <AppText style={styles.rateHighlight}>10 monedas</AppText> = 1 minuto de videollamada con hablantes nativos
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  chestIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryBgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  chestEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  balancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
    borderRadius: 20,
    gap: 6,
    marginBottom: spacing.xs + 2,
  },
  coinIcon: {
    fontSize: 14,
  },
  balanceText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  rateExplanation: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  rateHighlight: {
    color: colors.primary,
    fontWeight: '700',
  },
});
