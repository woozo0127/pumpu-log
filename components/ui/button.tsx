import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '#/components/ui/text';
import { palette } from '#/components/ui/theme';

type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive';
type ButtonSize = 'xsmall' | 'small' | 'medium';

type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
};

const HEIGHT: Record<ButtonSize, number> = {
  xsmall: 32,
  small: 40,
  medium: 56,
};
const RADIUS: Record<ButtonSize, number> = {
  xsmall: 10,
  small: 12,
  medium: 18,
};
const PADDING_H: Record<ButtonSize, number> = {
  xsmall: 10,
  small: 14,
  medium: 22,
};
const FONT_SIZE: Record<ButtonSize, number> = {
  xsmall: 12,
  small: 13,
  medium: 16,
};

const VARIANT_BG: Record<ButtonVariant, string> = {
  default: palette.lime[400],
  secondary: palette.alpha['white-7'],
  ghost: 'transparent',
  outline: 'transparent',
  destructive: palette.red[400],
};
const VARIANT_FG: Record<ButtonVariant, string> = {
  default: palette.neutral[950],
  secondary: palette.neutral[0],
  ghost: palette.neutral[0],
  outline: palette.neutral[0],
  destructive: palette.neutral[0],
};

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 120;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  variant = 'default',
  size = 'medium',
  loading,
  iconLeft,
  iconRight,
  children,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const bg = VARIANT_BG[variant];
  const fg = VARIANT_FG[variant];
  const isDisabled = disabled || loading;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const onPressIn = () => {
    scale.value = withTiming(0.96, {
      duration: DURATION,
      easing: PRESS_BEZIER,
    });
    opacity.value = withTiming(0.85, {
      duration: DURATION,
      easing: PRESS_BEZIER,
    });
  };
  const onPressOut = () => {
    scale.value = withTiming(1, { duration: DURATION, easing: PRESS_BEZIER });
    opacity.value = withTiming(1, { duration: DURATION, easing: PRESS_BEZIER });
  };

  return (
    <AnimatedPressable
      disabled={isDisabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.base,
        {
          height: HEIGHT[size],
          borderRadius: RADIUS[size],
          paddingHorizontal: PADDING_H[size],
          backgroundColor: bg,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor:
            variant === 'outline' ? palette.alpha['white-7'] : 'transparent',
          opacity: isDisabled ? 0.5 : 1,
        },
        typeof style === 'function' ? null : style,
        animatedStyle,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={fg} />
        ) : (
          <>
            {iconLeft}
            {typeof children === 'string' ? (
              <Text
                style={{ fontSize: FONT_SIZE[size], fontWeight: '700' }}
                color={fg}
              >
                {children}
              </Text>
            ) : (
              children
            )}
            {iconRight}
          </>
        )}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
