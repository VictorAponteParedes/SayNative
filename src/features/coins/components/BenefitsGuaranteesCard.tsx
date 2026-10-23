import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from '@/components';

export const BenefitsGuaranteesCard: React.FC = () => {
  const { t } = useTranslation('coins');

  const benefits = [
    t('benefits.noExpiry'),
    t('benefits.instantConnection'),
    t('benefits.securePurchase'),
  ];

  return (
    <View style={styles.card}>
      {benefits.map((benefit, index) => (
        <View key={`benefit_${index}`} style={styles.itemRow}>
          <View style={styles.checkCircle}>
            <Check size={14} color={colors.surface} strokeWidth={3} />
          </View>
          <AppText variant="bodyMedium" style={styles.benefitText}>
            {benefit}
          </AppText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.online,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
  },
});
