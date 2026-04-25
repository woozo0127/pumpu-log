import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, type Space, theme } from '#/components/ui/theme';

type CardProps = ViewProps & {
  glow?: boolean;
  padding?: Space | number;
};

function Root({ glow, padding = 'lg', style, children, ...rest }: CardProps) {
  const padValue = typeof padding === 'number' ? padding : theme.space[padding];
  return (
    <View
      style={[
        {
          backgroundColor: palette.neutral[900],
          borderRadius: theme.radius['2xl'],
          borderWidth: 1,
          borderColor: palette.alpha['white-7'],
          padding: padValue,
        },
        glow ? theme.shadow.glow : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <View style={{ marginBottom: theme.space.md, gap: 4 }}>{children}</View>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <Text typography="heading" color={palette.neutral[0]}>
      {children}
    </Text>
  );
}

function Description({ children }: { children: ReactNode }) {
  return (
    <Text typography="caption" color={palette.alpha['white-55']}>
      {children}
    </Text>
  );
}

function Content({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        marginTop: theme.space.md,
        flexDirection: 'row',
        gap: theme.space.sm,
      }}
    >
      {children}
    </View>
  );
}

export const Card = Object.assign(Root, {
  Header,
  Title,
  Description,
  Content,
  Footer,
});
