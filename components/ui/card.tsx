import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type CardProps = ViewProps & {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

function Root({ header, footer, style, children, ...rest }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: palette.neutral[900],
          borderRadius: theme.radius['2xl'],
          borderWidth: 1,
          borderColor: palette.alpha['white-7'],
          padding: theme.space.lg,
        },
        style,
      ]}
      {...rest}
    >
      {header ? (
        <View style={{ marginBottom: theme.space.md, gap: 4 }}>{header}</View>
      ) : null}
      {children}
      {footer ? (
        <View
          style={{
            marginTop: theme.space.md,
            flexDirection: 'row',
            gap: theme.space.sm,
          }}
        >
          {footer}
        </View>
      ) : null}
    </View>
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

export const Card = Object.assign(Root, {
  Title,
  Description,
});
