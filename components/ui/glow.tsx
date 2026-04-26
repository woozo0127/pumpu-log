import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { theme } from '#/components/ui/theme';

type GlowVariant = 'default' | 'card';

type GlowProps = ViewProps & {
  variant?: GlowVariant;
  color?: string;
  intensity?: number;
  children: ReactNode;
};

const BASE_SHADOW: Record<
  GlowVariant,
  typeof theme.shadow.glow | typeof theme.shadow.card
> = {
  default: theme.shadow.glow,
  card: theme.shadow.card,
} as const;

export function Glow({
  variant = 'default',
  color,
  intensity = 1,
  children,
  style,
  ...rest
}: GlowProps) {
  const base = BASE_SHADOW[variant];
  const resolvedColor =
    color ?? (variant === 'card' ? '#000' : theme.shadow.glow.shadowColor);
  return (
    <View
      style={[
        {
          shadowColor: resolvedColor,
          shadowOpacity: base.shadowOpacity * intensity,
          shadowRadius: base.shadowRadius,
          shadowOffset: base.shadowOffset,
          elevation: Math.round(base.elevation * intensity),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
