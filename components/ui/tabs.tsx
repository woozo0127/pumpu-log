import { createContext, type ReactNode, useContext } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ScrollArea } from '#/components/ui/scroll-area';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type TabsContextValue = {
  value: unknown;
  onValueChange: (v: unknown) => void;
};
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs subcomponent must be used inside <Tabs>');
  return ctx;
}

type TabsProps<T> = {
  value: T;
  onValueChange: (v: T) => void;
  children: ReactNode;
};

function Root<T>({ value, onValueChange, children }: TabsProps<T>) {
  return (
    <TabsContext.Provider
      // generic T를 context의 unknown으로 erase (React Context API 한계 — contravariance 에러)
      value={{ value, onValueChange: onValueChange as (v: unknown) => void }}
    >
      <View>{children}</View>
    </TabsContext.Provider>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <ScrollArea
      orientation="horizontal"
      contentContainerStyle={{
        flexDirection: 'row',
        gap: 6,
        paddingHorizontal: 16,
      }}
    >
      {children}
    </ScrollArea>
  );
}

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 120;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TriggerProps<T> = { value: T; children: ReactNode };

function Trigger<T>({ value, children }: TriggerProps<T>) {
  const ctx = useTabs();
  const active = ctx.value === value;

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
      onPress={() => ctx.onValueChange(value)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: theme.radius.md,
          backgroundColor: active ? palette.lime[400] : palette.neutral[900],
        },
        animatedStyle,
      ]}
    >
      <Text
        typography="caption"
        color={active ? palette.neutral[950] : palette.neutral[0]}
        weight="semibold"
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
}

type ContentProps<T> = { value: T; children: ReactNode };

function Content<T>({ value, children }: ContentProps<T>) {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return <View>{children}</View>;
}

export const Tabs = Object.assign(Root, { List, Trigger, Content });
