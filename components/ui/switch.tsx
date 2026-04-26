import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { palette } from '#/components/ui/theme';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 120;
const TRACK_DURATION = 200;
const THUMB_BEZIER = Easing.bezier(0.22, 1, 0.36, 1);

const AnimatedView = Animated.createAnimatedComponent(View);

export function Switch({
  value,
  onValueChange,
  disabled = false,
}: SwitchProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

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

  const onPress = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(value ? 18 : 0, {
          duration: TRACK_DURATION,
          easing: THUMB_BEZIER,
        }),
      },
    ],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <AnimatedView style={wrapStyle}>
        <View
          style={[
            styles.track,
            {
              backgroundColor: value
                ? palette.lime[400]
                : palette.alpha['white-12'],
            },
          ]}
        >
          <AnimatedView
            style={[
              styles.thumb,
              {
                backgroundColor: value
                  ? palette.neutral[1000]
                  : palette.neutral[0],
              },
              thumbStyle,
            ]}
          />
        </View>
      </AnimatedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 26,
    borderRadius: 9999,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
