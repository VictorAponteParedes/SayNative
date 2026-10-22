import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { colors, typography } from '../../theme';

export interface AppTextProps extends TextProps {
  variant?: keyof typeof typography;
  color?: string;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'bodyMedium',
  color = colors.textPrimary,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        typography[variant],
        { color },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
