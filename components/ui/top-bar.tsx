import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '#/components/ui/icon';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type TopBarProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
  variant?: 'default' | 'onGradient';
};

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 120;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TopBar({
  title,
  subtitle,
  onBack,
  right,
  variant = 'default',
}: TopBarProps) {
  const fg =
    variant === 'onGradient' ? palette.neutral[950] : palette.neutral[0];
  const dim =
    variant === 'onGradient' ? 'rgba(0,0,0,0.6)' : palette.alpha['white-55'];
  const backBg =
    variant === 'onGradient'
      ? palette.alpha['black-15']
      : palette.alpha['white-7'];

  const insets = useSafeAreaInsets();

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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: insets.top + 8,
        paddingBottom: 14,
        minHeight: 44,
      }}
    >
      <View
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}
      >
        {onBack ? (
          <AnimatedPressable
            onPress={onBack}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
              {
                width: 36,
                height: 36,
                borderRadius: theme.radius.md,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backBg,
              },
              animatedStyle,
            ]}
          >
            <Icon name="chev-left" color={fg} size={16} />
          </AnimatedPressable>
        ) : null}
        <View>
          {subtitle ? (
            <Text typography="label" color={dim}>
              {subtitle}
            </Text>
          ) : null}
          {title ? (
            <Text typography="heading" color={fg}>
              {title}
            </Text>
          ) : null}
        </View>
      </View>
      {right}
    </View>
  );
}
