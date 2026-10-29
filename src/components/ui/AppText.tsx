import React from 'react';
import { Text, TextProps, StyleProp, TextStyle, StyleSheet } from 'react-native';
import { colors, typography, fonts } from '@/theme';

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
  const variantStyle = typography[variant] || typography.bodyMedium;
  const userStyle = StyleSheet.flatten(style) || {};
  let resolvedFontFamily: string;
  if (userStyle.fontFamily) {
    resolvedFontFamily = userStyle.fontFamily;
  } else if (userStyle.fontWeight) {
    resolvedFontFamily = getFontFamilyForWeight(userStyle.fontWeight);
  } else if (variantStyle.fontFamily) {
    resolvedFontFamily = variantStyle.fontFamily;
  } else if (variantStyle.fontWeight) {
    resolvedFontFamily = getFontFamilyForWeight(variantStyle.fontWeight);
  } else {
    resolvedFontFamily = fonts.regular;
  }

  const baseStyle = StyleSheet.flatten([
    variantStyle,
    { color },
    userStyle,
  ]);
  const { fontWeight: _extractedWeight, ...styleWithoutWeight } = baseStyle || {};

  const finalStyle: TextStyle = {
    ...styleWithoutWeight,
    fontFamily: resolvedFontFamily,
  };

  return (
    <Text style={finalStyle} {...props}>
      {children}
    </Text>
  );
};
