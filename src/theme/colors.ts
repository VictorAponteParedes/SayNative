export const colors = {
  // Paleta principal según contexto y reglas
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  surfaceHighlight: '#EEF2FF',

  // Primarios
  primary: '#4338CA', // Azul / Índigo principal
  primaryLight: '#6366F1',
  primaryDark: '#3730A3',
  primaryGradientStart: '#4338CA',
  primaryGradientEnd: '#3B82F6',

  // Acciones y estados
  action: '#0D695A', // Verde Teal
  actionHover: '#0B574A',
  actionLight: '#E6F4F1',

  // Monedas y Gamificación
  coin: '#F59E0B', // Ámbar
  coinLight: '#FEF3C7',
  coinDark: '#D97706',

  // Textos
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',

  // Bordes y separadores
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderDark: '#CBD5E1',

  // Indicadores
  online: '#22C55E',
  danger: '#EF4444',
  star: '#F59E0B',
} as const;

export type Colors = typeof colors;
