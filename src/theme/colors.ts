export const colors = {
  // Fondos y superficies
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  surfaceHighlight: '#EEF2FF',
  surfaceInput: '#F8FAFC',

  // Primarios (Azul / Índigo)
  primary: '#4338CA',
  primaryLight: '#6366F1',
  primaryLighter: '#A5B4FC',
  primaryDark: '#3730A3',
  primaryBgSubtle: '#EEF2FF',

  // Acciones y Estados de Éxito (Verde Teal)
  action: '#0D695A',
  actionHover: '#0B574A',
  actionLight: '#CCFBF1',
  actionDark: '#0F766E',
  online: '#10B981',

  // Monedas y Gamificación (Ámbar)
  coin: '#F59E0B',
  coinLight: '#FEF3C7',
  coinDark: '#92400E',

  // Errores, Llamadas Perdidas y Alertas (Rojo)
  danger: '#EF4444',
  dangerDark: '#DC2626',
  dangerLight: '#FEE2E2',
  dangerBgSubtle: '#FFE4E6',

  // Textos
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',
  textDarkRed: '#DC2626',
  textDarkTeal: '#0F766E',
  textDarkAmber: '#92400E',
  textTag: '#475569',

  // Bordes y separadores
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderDark: '#CBD5E1',
  borderDashed: '#CBD5E1',
  borderHighlight: '#E0E7FF',

  // Pills y Badges de Idiomas / Intereses
  pillSkyBg: '#E0F2FE',
  pillTagBg: '#EEF2F6',

  // Burbujas de Chat
  chatUserBubble: '#4338CA',
  chatPartnerBubble: '#FFFFFF',

  // Formas de onda de audio (Waveform)
  waveformPurple: '#6366F1',
  waveformIndigo: '#4338CA',
  waveformPink: '#EC4899',
  waveformRed: '#E11D48',
  waveformRose: '#F43F5E',
  waveformLavender: '#A5B4FC',
  waveformSlate: '#94A3B8',
  waveformLight: '#CBD5E1',

  // Estrellas de valoración
  star: '#F59E0B',
  starRed: '#F87171',
} as const;

export type Colors = typeof colors;
