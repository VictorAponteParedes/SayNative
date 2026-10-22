import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../../../theme';
import { AppText } from '../../../componentes';

export interface DailyTipCardProps {
  onPress?: () => void;
}

export const DailyTipCard: React.FC<DailyTipCardProps> = ({ onPress }) => {
  const { t } = useTranslation('chats');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.iconCircle}>
        <MessageSquare size={20} color={colors.surface} />
      </View>

      <View style={styles.textContainer}>
        <AppText variant="bodyLarge" style={styles.title}>
          {t('tipCard.title')}
        </AppText>
        <AppText variant="caption" style={styles.subtitle}>
          {t('tipCard.subtitle')}
        </AppText>
      </View>

      <ChevronRight size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.action,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
