import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';
import type { TypographyToken } from '#/components/ui/typography';

// ── Sub-components ──────────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <Text
      color={palette.alpha['white-55']}
      style={{
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        lineHeight: 14,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Text>
  );
}

type ValueProps = {
  children: ReactNode;
  typography?: TypographyToken;
};

function Value({ children, typography = 'num-md' }: ValueProps) {
  return (
    <Text typography={typography} color={palette.neutral[0]}>
      {children}
    </Text>
  );
}

function Unit({ children }: { children: ReactNode }) {
  return (
    <Text
      typography="caption"
      weight="semibold"
      color={palette.alpha['white-55']}
    >
      {children}
    </Text>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function renderLabel(label: ReactNode | undefined): ReactNode {
  if (label == null) return null;
  if (typeof label === 'string') return <Label>{label}</Label>;
  return label;
}

function renderValue(value: ReactNode): ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return <Value>{String(value)}</Value>;
  }
  return value;
}

function renderUnit(unit: ReactNode | undefined): ReactNode {
  if (unit == null) return null;
  if (typeof unit === 'string') return <Unit>{unit}</Unit>;
  return unit;
}

// ── Root ─────────────────────────────────────────────────────────────────────

type StatTileProps = ViewProps & {
  label?: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  surface?: boolean;
};

function Root({
  label,
  value,
  unit,
  surface = false,
  style,
  ...rest
}: StatTileProps) {
  const surfaceStyle = surface
    ? {
        backgroundColor: palette.neutral[900],
        borderWidth: 1,
        borderColor: palette.alpha['white-7'],
        borderRadius: theme.radius.lg,
        padding: 14,
      }
    : {
        backgroundColor: 'transparent',
      };

  return (
    <View style={[surfaceStyle, style]} {...rest}>
      {renderLabel(label)}
      <View
        style={[
          { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
          label != null ? { marginTop: 6 } : null,
        ]}
      >
        {renderValue(value)}
        {renderUnit(unit)}
      </View>
    </View>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────

export const StatTile = Object.assign(Root, { Label, Value, Unit });
