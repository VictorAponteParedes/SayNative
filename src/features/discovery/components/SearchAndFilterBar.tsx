import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../../theme';

export interface SearchAndFilterBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPressFilterButton?: () => void;
  placeholder?: string;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  value,
  onChangeText,
  onPressFilterButton,
  placeholder = 'Buscar por nombre, país o tema...',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Search size={18} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressFilterButton}
        style={styles.filterButton}
      >
        <SlidersHorizontal size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
