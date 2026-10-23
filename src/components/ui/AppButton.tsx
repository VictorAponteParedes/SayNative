import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from './AppText';

export interface AppButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'action' | 'white' | 'secondary' | 'iconOnly';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.borderDark;
    switch (variant) {
      case 'action':
        return colors.action;
      case 'white':
        return colors.surface;
      case 'secondary':
      case 'iconOnly':
        return colors.surfaceSubtle;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'white':
        return colors.primary;
      case 'secondary':
      case 'iconOnly':
        return colors.textPrimary;
      case 'action':
      case 'primary':
      default:
        return colors.textWhite;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'iconOnly' && styles.iconOnly,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {title && (
            <AppText
              variant="button"
              style={[
                styles.text,
                { color: getTextColor() },
                icon && iconPosition === 'left' ? { marginLeft: 8 } : undefined,
                icon && iconPosition === 'right' ? { marginRight: 8 } : undefined,
                textStyle,
              ]}
            >
              {title}
            </AppText>
          )}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  iconOnly: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
});
