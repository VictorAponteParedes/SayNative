import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Eye, EyeOff, AlertCircle, Info } from 'lucide-react-native';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText } from './AppText';

export interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  labelRight?: React.ReactNode;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  hintStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  labelRight,
  error,
  hint,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  hintStyle,
  disabled = false,
  onFocus,
  onBlur,
  secureTextEntry,
  placeholderTextColor = colors.textMuted,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const hasError = Boolean(error);
  const isSecure = isPassword ? !showPassword : secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label || labelRight ? (
        <View style={styles.labelRow}>
          {label ? (
            <AppText variant="bodySmall" style={[styles.label, labelStyle]}>
              {label}
            </AppText>
          ) : (
            <View />
          )}
          {labelRight}
        </View>
      ) : null}

      <View
        style={[
          styles.inputBox,
          isFocused && styles.inputBoxFocused,
          hasError && styles.inputBoxError,
          disabled && styles.inputBoxDisabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}

        <TextInput
          editable={!disabled}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isSecure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.textInput,
            disabled && styles.textInputDisabled,
            inputStyle,
          ]}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.rightIconButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {showPassword ? (
              <EyeOff size={18} color={colors.textSecondary} />
            ) : (
              <Eye size={18} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        ) : null}
      </View>

      {/* Mensaje de error con icono */}
      {hasError ? (
        <View style={styles.feedbackRow}>
          <AlertCircle size={14} color={colors.danger} style={styles.feedbackIcon} />
          <AppText variant="caption" style={[styles.errorText, errorStyle]}>
            {error}
          </AppText>
        </View>
      ) : hint ? (
        <View style={styles.feedbackRow}>
          <Info size={14} color={colors.actionDark} style={styles.feedbackIcon} />
          <AppText variant="caption" style={[styles.hintText, hintStyle]}>
            {hint}
          </AppText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  inputBoxFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHighlight,
  },
  inputBoxError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerBgSubtle,
  },
  inputBoxDisabled: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.border,
    opacity: 0.7,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  textInputDisabled: {
    color: colors.textMuted,
  },
  rightIconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  feedbackIcon: {
    marginRight: 4,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  hintText: {
    color: colors.textSecondary,
    fontSize: 11,
    flex: 1,
  },
});

export default AppInput;
