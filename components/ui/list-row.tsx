import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevRightIcon } from '#/components/ui/icon';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type ListRowProps = {
  leading?: ReactNode;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  trailing?: ReactNode;
  chevron?: boolean;
  divider?: boolean;
  surface?: boolean;
  onPress?: () => void;
};

function Title({ children }: { children: ReactNode }) {
  return (
    <Text typography="body" weight="semibold" color={palette.neutral[0]}>
      {children}
    </Text>
  );
}

function Subtitle({ children }: { children: ReactNode }) {
  return (
    <Text typography="caption" color={palette.alpha['white-55']}>
      {children}
    </Text>
  );
}

function renderTitle(slot: ListRowProps['title']) {
  if (slot == null) return null;
  return typeof slot === 'string' ? <Title>{slot}</Title> : slot;
}

function renderSubtitle(slot: ListRowProps['subtitle']) {
  if (slot == null) return null;
  return typeof slot === 'string' ? <Subtitle>{slot}</Subtitle> : slot;
}

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Root({
  leading,
  title,
  subtitle,
  trailing,
  chevron,
  divider,
  surface,
  onPress,
}: ListRowProps) {
  // Hooks ALWAYS at top of function (Rules of Hooks)
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const onPressIn = () => {
    scale.value = withTiming(0.985, { duration: 140, easing: PRESS_BEZIER });
    opacity.value = withTiming(0.92, { duration: 140, easing: PRESS_BEZIER });
  };
  const onPressOut = () => {
    scale.value = withTiming(1, { duration: 140, easing: PRESS_BEZIER });
    opacity.value = withTiming(1, { duration: 140, easing: PRESS_BEZIER });
  };

  const containerStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.space.md,
    paddingVertical: 14,
    paddingHorizontal: theme.space.lg,
    backgroundColor: surface ? palette.neutral[900] : 'transparent',
    borderWidth: surface ? 1 : 0,
    borderColor: surface ? palette.alpha['white-7'] : 'transparent',
    borderRadius: surface ? theme.radius.xl : 0,
    borderBottomWidth: divider ? 1 : 0,
    borderBottomColor: divider ? palette.alpha['white-7'] : 'transparent',
  };

  const center = (
    <View style={{ flex: 1, gap: 2 }}>
      {renderTitle(title)}
      {renderSubtitle(subtitle)}
    </View>
  );

  const right = (
    <>
      {trailing}
      {chevron ? (
        <ChevRightIcon color={palette.alpha['white-32']} size={14} />
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[containerStyle, animatedStyle]}
        accessibilityRole="button"
        accessibilityLabel={typeof title === 'string' ? title : undefined}
      >
        {leading}
        {center}
        {right}
      </AnimatedPressable>
    );
  }

  return (
    <View style={containerStyle}>
      {leading}
      {center}
      {right}
    </View>
  );
}

export const ListRow = Object.assign(Root, { Title, Subtitle });
