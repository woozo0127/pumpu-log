export const palette = {
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#1A1A1A',
    950: '#0A0B0A',
    1000: '#000000',
  },
  lime: { 300: '#E4FF66', 400: '#D4FF00', 500: '#B8E000' },
  orange: { 400: '#FF7A00' },
  red: { 400: '#FF3B5C' },
  green: { 400: '#7AE0AA' },
  alpha: {
    'white-3': 'rgba(255,255,255,0.04)',
    'white-6': 'rgba(255,255,255,0.06)',
    'white-7': 'rgba(255,255,255,0.07)',
    'white-12': 'rgba(255,255,255,0.12)',
    'white-32': 'rgba(255,255,255,0.32)',
    'white-55': 'rgba(255,255,255,0.55)',
    'black-15': 'rgba(0,0,0,0.15)',
  },
} as const;

export const theme = {
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 18, '2xl': 22, '3xl': 28, pill: 9999 },
  shadow: {
    none: { shadowColor: 'transparent' },
    glow: {
      shadowColor: palette.lime[400],
      shadowOpacity: 0.34,
      shadowRadius: 32,
      shadowOffset: { width: 0, height: 0 },
      elevation: 8,
    },
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
      elevation: 6,
    },
  },
  motion: { fast: 200, base: 320, slow: 800 },
} as const;

export type Space = keyof typeof theme.space;
export type Radius = keyof typeof theme.radius;
