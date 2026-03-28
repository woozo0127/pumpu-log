import type { Config } from 'tailwindcss';

// nativewind does not export ESM — require() is intentional
const { hairlineWidth } = require('nativewind/theme');
const nativewindPreset = require('nativewind/preset');

const config: Config = {
  presets: [nativewindPreset],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        card: {
          DEFAULT: '#161b22',
          hover: '#1c2333',
        },
        input: '#0d1117',
        border: {
          DEFAULT: '#21262d',
          subtle: '#30363d',
        },
        lime: {
          DEFAULT: '#a3e635',
          hover: '#bef264',
          active: '#8bc62e',
          dim: '#1a2e0a',
          disabled: '#3a4a1a',
        },
        destructive: '#ef4444',
        yellow: '#fbbf24',
        foreground: '#f0f0f0',
        'foreground-secondary': '#8b949e',
        'foreground-tertiary': '#6b7280',
        'foreground-on-color': '#0d1117',
        'tab-inactive': '#484f58',
      },
      fontSize: {
        '2xl': ['32px', { lineHeight: '40px' }],
        xl: ['24px', { lineHeight: '32px' }],
        lg: ['18px', { lineHeight: '28px' }],
        md: ['16px', { lineHeight: '24px' }],
        base: ['14px', { lineHeight: '20px' }],
        sm: ['12px', { lineHeight: '16px' }],
        xs: ['10px', { lineHeight: '14px' }],
      },
      spacing: {
        '2xs': '2px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '9999px',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};

export default config;
