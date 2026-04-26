import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '#/components/ui/button';
import { ExerciseCard } from '#/components/ui/exercise-card';
import { GradientHero } from '#/components/ui/gradient-hero';
import { Icon } from '#/components/ui/icon';
import { ScreenContainer } from '#/components/ui/screen-container';
import { SectionHeader } from '#/components/ui/section-header';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

const EXERCISES = [
  {
    name: '벤치 프레스',
    sub: '바벨 · 가슴',
    sets: [
      { w: 60, r: 12 },
      { w: 80, r: 8 },
      { w: 90, r: 6 },
      { w: 90, r: 6 },
      { w: 80, r: 8 },
    ],
    pr: '95kg',
  },
  {
    name: '인클라인 덤벨 프레스',
    sub: '덤벨 · 상부 가슴',
    sets: [
      { w: 22, r: 10 },
      { w: 24, r: 8 },
      { w: 26, r: 8 },
    ],
    pr: '28kg',
  },
  {
    name: '오버헤드 프레스',
    sub: '바벨 · 어깨',
    sets: [
      { w: 40, r: 10 },
      { w: 50, r: 6 },
    ],
    pr: '55kg',
  },
];

export default function RoutinePreview() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <GradientHero rounded="bottom" glow style={{ marginHorizontal: 0 }}>
            <View style={{ height: insets.top }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: theme.radius.md,
                  backgroundColor: palette.alpha['black-15'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="chev-left" color={palette.neutral[950]} size={16} />
              </View>
            </View>
            <Text
              typography="label"
              color="rgba(0,0,0,0.6)"
              style={{ marginTop: 18 }}
            >
              DAY 4 · PUSH
            </Text>
            <Text typography="title" color={palette.neutral[950]}>
              Push Day
            </Text>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 14 }}>
              <HeroStat label="운동" value="6" />
              <HeroStat label="세트" value="20" />
              <HeroStat label="시간" value="52" unit="분" />
              <HeroStat label="볼륨" value="3.2" unit="t" />
            </View>
          </GradientHero>

          <View style={{ paddingHorizontal: 20, marginTop: theme.space.xl }}>
            <SectionHeader>{`오늘의 운동 · ${EXERCISES.length}`}</SectionHeader>
            <View style={{ gap: 10 }}>
              {EXERCISES.map((ex, i) => (
                <ExerciseCard
                  key={ex.name}
                  index={i + 1}
                  title={ex.name}
                  subtitle={ex.sub}
                  pr={ex.pr}
                  sets={ex.sets}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>

      <View style={{ padding: 20 }}>
        <Button
          size="medium"
          iconLeft={<Icon name="play" color={palette.neutral[950]} size={16} />}
        >
          운동 시작
        </Button>
      </View>
    </View>
  );
}

function HeroStat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <View>
      <Text typography="label" color="rgba(0,0,0,0.6)">
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
        <Text typography="num-md" color={palette.neutral[950]}>
          {value}
        </Text>
        {unit ? (
          <Text typography="caption" color={palette.neutral[950]}>
            {unit}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
