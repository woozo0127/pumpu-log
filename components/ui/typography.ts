import type { TextStyle } from 'react-native';

export const typography = {
  display: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1.4,
    lineHeight: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  heading: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  body: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    lineHeight: 14,
  },
  'num-sm': {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.52,
    fontVariant: ['tabular-nums'],
    lineHeight: 13,
  },
  'num-md': {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.8,
    fontVariant: ['tabular-nums'],
    lineHeight: 20,
  },
  'num-lg': {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1.12,
    fontVariant: ['tabular-nums'],
    lineHeight: 28,
  },
  'num-xl': {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1.92,
    fontVariant: ['tabular-nums'],
    lineHeight: 48,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;

export const fontWeight = {
  regular: '500',
  medium: '600',
  semibold: '700',
  bold: '800',
} as const;

export type FontWeight = keyof typeof fontWeight;
