import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Calendar } from 'lucide-react-native';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from './AppText';
import { DatePickerBottomSheet } from './DatePickerBottomSheet';

export interface ControlledDateInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, FieldPath<T>>;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  maxDate?: Date;
  minDate?: Date;
}

export const ControlledDateInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Selecciona una fecha',
  rules,
  error,
  containerStyle,
  maxDate,
  minDate,
}: ControlledDateInputProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const hasError = Boolean(error || fieldError?.message);
        const displayValue = value ? String(value) : '';

        return (
          <View style={[styles.wrapper, containerStyle]}>
            {label && (
              <AppText variant="caption" style={styles.label}>
                {label}
              </AppText>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOpen(true)}
              style={[
                styles.inputContainer,
                hasError && styles.inputError,
                isOpen && styles.inputFocused,
              ]}
            >
              <Calendar size={18} color={displayValue ? colors.primary : colors.textMuted} />
              <AppText
                variant="bodyMedium"
                style={[
                  styles.valueText,
                  !displayValue && styles.placeholderText,
                ]}
              >
                {displayValue || placeholder}
              </AppText>
            </TouchableOpacity>

            {(error || fieldError?.message) && (
              <AppText variant="caption" style={styles.errorText}>
                {error || fieldError?.message}
              </AppText>
            )}

            <DatePickerBottomSheet
              visible={isOpen}
              onClose={() => setIsOpen(false)}
              value={displayValue}
              onSelectDate={(newDate) => {
                onChange(newDate);
              }}
              title={label || 'Seleccionar fecha'}
              maxDate={maxDate}
              minDate={minDate}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.surface,
  },
  valueText: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textMuted,
  },
  errorText: {
    color: colors.danger,
    marginTop: spacing.xs,
    fontSize: 12,
  },
});

export default ControlledDateInput;
