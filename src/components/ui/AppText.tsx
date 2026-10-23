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
  const baseStyle = StyleSheet.flatten([
    typography[variant],
    { color },
    style,
  ]);

  const resolvedFontFamily = getFontFamilyForWeight(baseStyle?.fontWeight);

  // En React Native (especialmente Android), si fontFamily apunta a un archivo específico
  // como 'Outfit-Bold' y se mantiene fontWeight: '700'/'bold', el motor busca 'Outfit-Bold_bold.ttf'
  // y al no encontrarlo hace fallback a la fuente del sistema (Roboto).
  // Al remover fontWeight, Android e iOS cargan directamente el archivo de fuente con su peso nativo.
  const finalStyle: TextStyle = {
    ...baseStyle,
    fontFamily: resolvedFontFamily,
    fontWeight: undefined,
  };

  return (
    <Text style={finalStyle} {...props}>
      {children}
    </Text>
  );
};
