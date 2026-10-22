import React from 'react';
import { Text, TextProps, StyleProp, TextStyle, StyleSheet } from 'react-native';
import { colors, typography, fonts } from '../../theme';

export interface AppTextProps extends TextProps {
  variant?: keyof typeof typography;
  color?: string;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const getFontFamilyForWeight = (fontWeight?: TextStyle['fontWeight']): string => {
  switch (fontWeight) {
    case '900':
      return fonts.black;
    case '800':
      return fonts.extraBold;
    case '700':
    case 'bold':
      return fonts.bold;
    case '600':
      return fonts.semiBold;
    case '500':
      return fonts.medium;
    case '400':
    case 'normal':
    default:
      return fonts.regular;
  }
};

export const AppText: React.FC<AppTextProps> = ({
  variant = 'bodyMedium',
  color = colors.textPrimary,
  style,
  children,
  ...props
}) => {
  const baseStyle = StyleSheet.flatten([
    typography[variant],
    { color },
    style,
  ]);

  const resolvedFontFamily = getFontFamilyForWeight(baseStyle?.fontWeight);

  return (
    <Text
      style={[
        baseStyle,
        { fontFamily: resolvedFontFamily },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
