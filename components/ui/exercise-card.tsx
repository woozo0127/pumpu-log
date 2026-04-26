import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '#/components/ui/icon';
import { ScrollArea } from '#/components/ui/scroll-area';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type Set = { w: number; r: number };

type ExerciseCardProps = {
  index: number;
  title: string;
  subtitle?: string;
  pr?: string;
  sets?: Set[];
  onPress?: () => void;
};

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const DURATION = 140;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ExerciseCard({
  index,
  title,
  subtitle,
  pr,
  sets,
  onPress,
}: ExerciseCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const onPressIn = () => {
    scale.value = withTiming(0.985, {
      duration: DURATION,
      easing: PRESS_BEZIER,
    });
    opacity.value = withTiming(0.92, {
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
      disabled={!onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          backgroundColor: palette.neutral[900],
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: palette.alpha['white-7'],
          padding: theme.space.lg,
        },
        animatedStyle,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            backgroundColor: palette.alpha['white-7'],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text typography="num-sm" color={palette.alpha['white-55']}>
            {String(index).padStart(2, '0')}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            color={palette.neutral[0]}
            style={{ fontSize: 15, fontWeight: '700', lineHeight: 20 }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              color={palette.alpha['white-55']}
              style={{ fontSize: 12, fontWeight: '500', lineHeight: 17 }}
            >
              {subtitle}
              {sets ? ` · ${sets.length}세트` : null}
            </Text>
          ) : null}
        </View>
        {pr ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              backgroundColor: `${palette.lime[400]}26`,
            }}
          >
            <Icon name="trophy" color={palette.lime[400]} size={13} />
            <Text typography="label" color={palette.lime[400]}>
              {pr}
            </Text>
          </View>
        ) : null}
      </View>
      {sets && sets.length > 0 ? (
        <ScrollArea
          orientation="horizontal"
          style={{ marginTop: theme.space.md }}
          contentContainerStyle={{ flexDirection: 'row', gap: 6 }}
        >
          {sets.map((s, j) => (
            <View
              // biome-ignore lint/suspicious/noArrayIndexKey: 동일 무게×횟수 세트가 정상적으로 중복 가능 — 인덱스 결합으로 중복 키 회피
              key={`${j}-${s.w}-${s.r}`}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            >
              <Text typography="caption" color={palette.alpha['white-55']}>
                {s.w > 0 ? `${s.w}kg × ${s.r}` : `${s.r}회`}
              </Text>
            </View>
          ))}
        </ScrollArea>
      ) : null}
    </AnimatedPressable>
  );
}
