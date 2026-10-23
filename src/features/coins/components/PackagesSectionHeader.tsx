import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Lock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export const PackagesSectionHeader: React.FC = () => {
  const { t } = useTranslation('coins');

  return (
    <View style={styles.container}>
      <AppText variant="h3" style={styles.title}>
        {t('packagesSection.title')}
      </AppText>

      <View style={styles.rightTag}>
        <Lock size={12} color={colors.textSecondary} />
        <AppText variant="caption" style={styles.rightText}>
          {t('packagesSection.oneTimePayment')}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  rightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rightText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
