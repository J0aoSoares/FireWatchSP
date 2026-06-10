export const colors = {
  space: '#000000',
  panel: '#0D0D0D',
  panelSoft: '#1A1A1A',
  line: '#2B2B2B',

  ember: '#FF6B35',
  emberSoft: '#FF8C5A',
  signal: '#4DD4E8',
  alert: '#FF3B5C',
  ok: '#3DDC97',

  text: '#F2F2F2',
  textDim: '#9A9A9A',
  textFaint: '#666666',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 2,
  md: 4,
  lg: 4,
  pill: 4,
};

export const typography = {
  title: { fontSize: 26, fontWeight: '800', color: colors.text, letterSpacing: 0.3 },
  subtitle: { fontSize: 16, fontWeight: '600', color: colors.textDim },
  body: { fontSize: 15, color: colors.text, lineHeight: 22 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textFaint,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
};
