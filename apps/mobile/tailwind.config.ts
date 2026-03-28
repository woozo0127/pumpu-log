import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui-kit/src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
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
        foreground: {
          DEFAULT: '#f0f0f0',
          secondary: '#8b949e',
          tertiary: '#6b7280',
          'on-color': '#0d1117',
        },
        'tab-inactive': '#484f58',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
