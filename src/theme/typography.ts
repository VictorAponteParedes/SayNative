import { TextStyle } from 'react-native';

export const fonts = {
  regular: 'Outfit-Regular',
  medium: 'Outfit-Medium',
  semiBold: 'Outfit-SemiBold',
  bold: 'Outfit-Bold',
  extraBold: 'Outfit-ExtraBold',
  black: 'Outfit-Black',
} as const;

export type FontKeys = typeof fonts;

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  h3: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyLarge: {
    fontFamily: fonts.medium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  caption: {
    fontFamily: fonts.medium,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    fontWeight: '600',
  },
};
