import { Platform, TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: 'Montserrat',
  android: 'Montserrat',
  default: 'System',
});

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  h2: {
    fontFamily,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  h3: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  caption: {
    fontFamily,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
  },
  button: {
    fontFamily,
    fontSize: 15,
    fontWeight: '600',
  },
};
