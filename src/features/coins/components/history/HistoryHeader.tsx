import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Calendar } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText, AppLogo, AppAlert } from '@/components';
import { goBack } from '@/navigation/NavigationRef';

export interface HistoryHeaderProps {
  onPressCalendar?: () => void;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({
  onPressCalendar,
}) => {
  const { t } = useTranslation('coins');

  const handleCalendar = () => {
    if (onPressCalendar) {
      onPressCalendar();
    } else {
      AppAlert.info(
        t('history.support.calendarTitle'),
        t('history.support.calendarMessage')
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={styles.circleButton}
      >
        <ArrowLeft size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <AppLogo size={24} />
        <AppText variant="h3" style={styles.title}>
          {t('history.headerTitle')}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleCalendar}
        style={styles.circleButton}
      >
        <Calendar size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
