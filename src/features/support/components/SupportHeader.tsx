import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, AppLogo } from '../../../components';

export interface SupportHeaderProps {
  onBack: () => void;
}

export const SupportHeader: React.FC<SupportHeaderProps> = ({ onBack }) => {
  const { t } = useTranslation('support');

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.backButton}
      >
        <ArrowLeft size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      <AppText variant="h3" style={styles.title}>
        {t('header.title')}
      </AppText>

      <AppLogo size={32} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 38,
  },
});
