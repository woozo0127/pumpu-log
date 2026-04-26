import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '#/components/ui/badge';
import { Card } from '#/components/ui/card';
import { GradientHero } from '#/components/ui/gradient-hero';
import { Icon } from '#/components/ui/icon';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

const STATS: { label: string; value: string; unit: string }[] = [
  { label: '이번 주', value: '4', unit: '/ 5회' },
  { label: '연속', value: '12', unit: '일' },
  { label: '총 볼륨', value: '8.2', unit: 'k kg' },
];

const DAYS: {
  d: string;
  v: number;
  done?: boolean;
  rest?: boolean;
  today?: boolean;
  peak?: boolean;
}[] = [
  { d: '월', v: 1620, done: true },
  { d: '화', v: 1180, done: true },
  { d: '수', v: 0, rest: true },
  { d: '목', v: 2040, done: true, peak: true },
  { d: '금', v: 1480, done: true },
  { d: '토', v: 0, today: true },
  { d: '일', v: 0, rest: true },
];

export default function HomePreview() {
  const insets = useSafeAreaInsets();
  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        <View style={{ paddingTop: insets.top + 16 }}>
          <Text typography="caption" color={palette.alpha['white-55']}>
            4월 25일 · 토요일
          </Text>
          <Text typography="title" color={palette.neutral[0]}>
            오늘의 운동
          </Text>
        </View>

        <GradientHero rounded="all" glow style={{ marginTop: theme.space.md }}>
          <Text typography="label" color={palette.neutral[950]}>
            오늘의 운동 · DAY 4
          </Text>
          <Text typography="subtitle" color={palette.neutral[950]}>
            Push Day
          </Text>
          <Text typography="caption" color={palette.neutral[950]}>
            가슴 · 어깨 · 삼두
          </Text>
          <View
            style={{
              marginTop: theme.space.lg,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <View>
              <Text typography="label" color="rgba(0,0,0,0.6)">
                운동
              </Text>
              <Text typography="num-md" color={palette.neutral[950]}>
                6
              </Text>
            </View>
            <View>
              <Text typography="label" color="rgba(0,0,0,0.6)">
                예상
              </Text>
              <Text typography="num-md" color={palette.neutral[950]}>
                52분
              </Text>
            </View>
          </View>
        </GradientHero>

        <View
          style={{ marginTop: theme.space.xl, flexDirection: 'row', gap: 8 }}
        >
          {STATS.map((s) => (
            <Card key={s.label} style={{ flex: 1 }}>
              <Text typography="label" color={palette.alpha['white-55']}>
                {s.label}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  gap: 3,
                  marginTop: 8,
                }}
              >
                <Text typography="num-md" color={palette.neutral[0]}>
                  {s.value}
                </Text>
                <Text typography="caption" color={palette.alpha['white-55']}>
                  {s.unit}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        <Card style={{ marginTop: theme.space.xl }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text typography="label" color={palette.alpha['white-55']}>
                이번 주 볼륨
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}
              >
                <Text typography="num-lg" color={palette.neutral[0]}>
                  8,240
                </Text>
                <Text typography="caption" color={palette.alpha['white-55']}>
                  kg
                </Text>
              </View>
              <Text typography="caption" color={palette.alpha['white-32']}>
                지난 주 7,360kg
              </Text>
            </View>
            <Badge variant="accent">+12%</Badge>
          </View>
          <WeekChart />
        </Card>

        <View
          style={{
            marginTop: theme.space.lg,
            padding: theme.space.lg,
            borderWidth: 1,
            borderColor: palette.alpha['white-7'],
            borderRadius: theme.radius.lg,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon name="flame" color={palette.lime[400]} size={18} />
          <Text typography="caption" color={palette.alpha['white-55']}>
            화면 전용 인라인: WeekChart 위(Card 내부)
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function WeekChart() {
  const max = 2200;
  return (
    <View style={{ marginTop: theme.space.md }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 6,
          height: 96,
        }}
      >
        {DAYS.map((d) => {
          const pct = (d.v / max) * 100;
          return (
            <View
              key={d.d}
              style={{ flex: 1, alignItems: 'center', gap: 6, height: '100%' }}
            >
              <View
                style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}
              >
                <View
                  style={{
                    width: '70%',
                    alignSelf: 'center',
                    height: d.rest ? 4 : d.today ? '100%' : `${pct}%`,
                    borderRadius: 6,
                    backgroundColor: d.today
                      ? 'transparent'
                      : d.rest
                        ? palette.alpha['white-7']
                        : palette.lime[400],
                    borderWidth: d.today ? 1.5 : 0,
                    borderColor: d.today ? palette.lime[400] : 'transparent',
                    borderStyle: d.today ? 'dashed' : 'solid',
                  }}
                />
              </View>
              <Text
                typography="caption"
                color={
                  d.today
                    ? palette.lime[400]
                    : d.rest
                      ? palette.alpha['white-32']
                      : palette.alpha['white-55']
                }
              >
                {d.d}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
