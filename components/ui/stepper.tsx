import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '#/components/ui/icon';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type StepperProps = {
  variant?: 'big' | 'inline';
  label?: string;
  value: number;
  unit?: string;
  step?: number;
  min?: number;
  onChange: (v: number) => void;
};

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 120;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Stepper({
  variant = 'big',
  label,
  value,
  unit,
  step = 1,
  min = 0,
  onChange,
}: StepperProps) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(value + step);

  if (variant === 'big') {
    return (
      <View style={stylesBig.wrap}>
        <Btn onPress={dec} icon="minus" />
        <View style={{ flex: 1, alignItems: 'center' }}>
          {label ? (
            <Text typography="label" color={palette.alpha['white-55']}>
              {label}
            </Text>
          ) : null}
          <View style={stylesBig.valueRow}>
            <Text typography="num-xl" color={palette.neutral[0]}>
              {value}
            </Text>
            {unit ? (
              <Text typography="caption" color={palette.alpha['white-55']}>
                {unit}
              </Text>
            ) : null}
          </View>
        </View>
        <Btn onPress={inc} icon="plus" />
      </View>
    );
  }

  return (
    <View style={stylesInline.wrap}>
      <MiniBtn onPress={dec} icon="minus" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text typography="num-md" color={palette.neutral[0]}>
          {value}
        </Text>
        {unit ? (
          <Text typography="label" color={palette.alpha['white-55']}>
            {` ${unit}`}
          </Text>
        ) : null}
      </View>
      <MiniBtn onPress={inc} icon="plus" />
    </View>
  );
}

function Btn({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: 'plus' | 'minus';
}) {
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
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[stylesBig.btn, animatedStyle]}
    >
      <Icon name={icon} color={palette.neutral[0]} size={18} />
    </AnimatedPressable>
  );
}

function MiniBtn({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: 'plus' | 'minus';
}) {
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
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[stylesInline.btn, animatedStyle]}
    >
      <Icon name={icon} color={palette.alpha['white-55']} size={14} />
    </AnimatedPressable>
  );
}

const stylesBig = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: theme.radius.lg,
    backgroundColor: palette.alpha['white-3'],
  },
  valueRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.neutral[800],
    borderWidth: 1,
    borderColor: palette.alpha['white-7'],
  },
});

const stylesInline = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 11,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  btn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
