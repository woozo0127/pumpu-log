/**
 * Design token colors extracted from tailwind.config.ts.
 * Use these for non-className contexts (e.g. icon color props, inline styles).
 */
export const colors = {
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
} as const;
