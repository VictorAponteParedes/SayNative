import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing } from '@/theme';
import { AppText } from './AppText';

export interface TagProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

export const Tag: React.FC<TagProps> = ({ label, style }) => {
  return (
    <View style={[styles.container, style]}>
      <AppText variant="caption" color={colors.textTag} style={styles.text}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pillTagBg,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
    fontSize: 11,
  },
});
