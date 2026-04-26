import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'accent';

type BadgeProps = {
  variant?: BadgeVariant;
  size?: 'small' | 'medium';
  children: ReactNode;
};

const BG: Record<BadgeVariant, string> = {
  default: palette.alpha['white-7'],
  secondary: palette.neutral[800],
  outline: 'transparent',
  accent: palette.lime[400],
};
const FG: Record<BadgeVariant, string> = {
  default: palette.alpha['white-55'],
  secondary: palette.neutral[0],
  outline: palette.neutral[0],
  accent: palette.neutral[950],
};

export function Badge({
  variant = 'default',
  size = 'medium',
  children,
}: BadgeProps) {
  const HEIGHT = size === 'small' ? 18 : 22;
  const PADDING_H = size === 'small' ? 7 : 8;
  const FONT_SIZE = size === 'small' ? 9 : 11;
  const LETTER_SPACING = size === 'small' ? 0.4 : 1.2;

  return (
    <View
      style={{
        height: HEIGHT,
        paddingHorizontal: PADDING_H,
        borderRadius: theme.radius.pill,
        backgroundColor: BG[variant],
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor:
          variant === 'outline' ? palette.alpha['white-7'] : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
      }}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            fontSize: FONT_SIZE,
            fontWeight: '700',
            letterSpacing: LETTER_SPACING,
            textTransform: 'uppercase',
          }}
          color={FG[variant]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
