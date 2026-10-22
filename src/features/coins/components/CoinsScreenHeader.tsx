import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';
import { goBack } from '../../../navigation/NavigationRef';

export interface CoinsScreenHeaderProps {
  onPressProfile?: () => void;
}

export const CoinsScreenHeader: React.FC<CoinsScreenHeaderProps> = ({
  onPressProfile,
}) => {
  const { t } = useTranslation('coins');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={styles.backButton}
      >
        <ArrowLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <AppText variant="h3" style={styles.title}>
        {t('headerTitle')}
      </AppText>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressProfile}
        style={styles.profileButton}
      >
        <User size={18} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
