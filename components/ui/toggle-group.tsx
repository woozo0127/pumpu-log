import { createContext, type ReactNode, useContext } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type ToggleGroupContextValue =
  | { type: 'single'; value: unknown; onValueChange: (v: unknown) => void }
  | {
      type: 'multiple';
      value: unknown[];
      onValueChange: (v: unknown[]) => void;
    };

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroup() {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx)
    throw new Error(
      'ToggleGroup subcomponent must be used inside <ToggleGroup>',
    );
  return ctx;
}

type ToggleGroupProps<T> =
  | {
      type: 'single';
      value: T;
      onValueChange: (v: T) => void;
      children: ReactNode;
    }
  | {
      type: 'multiple';
      value: T[];
      onValueChange: (v: T[]) => void;
      children: ReactNode;
    };

function Root<T>(props: ToggleGroupProps<T>) {
  // generic T를 context의 unknown으로 erase (React Context API 한계 — contravariance 에러)
  const ctx =
    props.type === 'single'
      ? {
          type: 'single' as const,
          value: props.value as unknown,
          onValueChange: props.onValueChange as (v: unknown) => void,
        }
      : {
          type: 'multiple' as const,
          value: props.value as unknown[],
          onValueChange: props.onValueChange as (v: unknown[]) => void,
        };
  return (
    <ToggleGroupContext.Provider value={ctx}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          backgroundColor: palette.alpha['white-6'],
          padding: 2,
          borderRadius: theme.radius.md,
        }}
      >
        {props.children}
      </View>
    </ToggleGroupContext.Provider>
  );
}

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 120;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ItemProps<T> = { value: T; children: ReactNode };

function Item<T>({ value, children }: ItemProps<T>) {
  const ctx = useToggleGroup();
  const active =
    ctx.type === 'single' ? ctx.value === value : ctx.value.includes(value);
  const onPress = () => {
    if (ctx.type === 'single') {
      ctx.onValueChange(value);
    } else {
      const next = ctx.value.includes(value)
        ? ctx.value.filter((v) => v !== value)
        : [...ctx.value, value];
      ctx.onValueChange(next);
    }
  };

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
      style={[
        {
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: theme.radius.md,
          backgroundColor: active ? palette.lime[400] : 'transparent',
        },
        animatedStyle,
      ]}
    >
      <Text
        typography="caption"
        color={active ? palette.neutral[950] : palette.alpha['white-55']}
        weight="semibold"
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
}

export const ToggleGroup = Object.assign(Root, { Item });
