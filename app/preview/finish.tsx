import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg';
import {
  Button,
  Card,
  CheckIcon,
  Glow,
  ScreenContainer,
  StatTile,
  Text,
  TrophyIcon,
} from '#/components/ui';
import { palette, theme } from '#/components/ui/theme';

function BurstHalo({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size} pointerEvents="none">
      <Defs>
        <RadialGradient
          id="burst"
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor={palette.lime[400]} stopOpacity={0.32} />
          <Stop offset="55%" stopColor={palette.lime[400]} stopOpacity={0.12} />
          <Stop offset="100%" stopColor={palette.lime[400]} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={size} height={size} fill="url(#burst)" />
    </Svg>
  );
}

const PREV_VOLUME = 3000;
const TODAY_VOLUME = 3240;

export default function FinishPreview() {
  const diff = TODAY_VOLUME - PREV_VOLUME;
  const pct = Math.round((diff / PREV_VOLUME) * 1000) / 10;
  const positive = diff >= 0;
  const sign = diff > 0 ? '+' : diff < 0 ? '−' : '±';
  const tone =
    diff === 0
      ? palette.alpha['white-55']
      : positive
        ? palette.lime[400]
        : palette.red[400];
  const fmt = (n: number) => n.toLocaleString();
  const prevRatio = PREV_VOLUME / Math.max(PREV_VOLUME, TODAY_VOLUME);
  const todayRatio = TODAY_VOLUME / Math.max(PREV_VOLUME, TODAY_VOLUME);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero */}
        <View
          style={{
            position: 'relative',
            paddingTop: 110,
            paddingBottom: 60,
            paddingHorizontal: 24,
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Burst halo */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 70,
              alignSelf: 'center',
            }}
          >
            <BurstHalo size={320} />
          </View>
          <Text
            typography="label"
            color={palette.lime[400]}
            style={{ marginBottom: 12, letterSpacing: 3 }}
          >
            COMPLETE
          </Text>
          <Glow intensity={1.3} style={{ marginBottom: 22 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: palette.lime[400],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckIcon color={palette.neutral[1000]} size={40} />
            </View>
          </Glow>
          <Text typography="display" color={palette.neutral[0]}>
            잘했어요!
          </Text>
          <Text
            typography="body"
            color={palette.alpha['white-55']}
            style={{ marginTop: 16 }}
          >
            오늘의 운동을 완료했습니다.
          </Text>
        </View>

        {/* PR badge */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              borderRadius: 22,
              backgroundColor: palette.lime[400],
              shadowColor: palette.lime[400],
              shadowOpacity: 0.27,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 12 },
              elevation: 8,
            }}
          >
            <LinearGradient
              colors={[palette.lime[400], palette.orange[400]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                borderRadius: 22,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: palette.alpha['black-15'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrophyIcon color={palette.neutral[1000]} size={26} />
              </View>
              <View style={{ flex: 1 }}>
                <Text typography="label" color={palette.neutral[1000]}>
                  NEW PR · 개인 최고
                </Text>
                <Text
                  typography="heading"
                  color={palette.neutral[1000]}
                  style={{ marginTop: 2 }}
                >
                  벤치 프레스 · 90 kg × 6
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Quick stats */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 16,
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <StatTile surface label="운동 시간" value={52} unit="분" />
          </View>
          <View style={{ flex: 1 }}>
            <StatTile surface label="완료 세트" value={20} unit="세트" />
          </View>
        </View>

        {/* Volume vs last session */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 14,
              }}
            >
              <Text typography="label" color={palette.alpha['white-55']}>
                운동 볼륨
              </Text>
              <Text
                typography="caption"
                weight="medium"
                color={palette.alpha['white-32']}
              >
                3일 전 · PUSH
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <Text typography="num-xl" color={palette.neutral[0]}>
                  {fmt(TODAY_VOLUME)}
                </Text>
                <Text
                  typography="caption"
                  weight="semibold"
                  color={palette.alpha['white-55']}
                >
                  kg
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text typography="num-md" color={tone}>
                  {sign}
                  {fmt(Math.abs(diff))}
                  <Text
                    typography="caption"
                    weight="semibold"
                    color={tone}
                    style={{ marginLeft: 2 }}
                  >
                    {' '}
                    kg
                  </Text>
                </Text>
                <Text
                  typography="label"
                  color={tone}
                  style={{ marginTop: 2, opacity: 0.85 }}
                >
                  {sign}
                  {Math.abs(pct)}%
                </Text>
              </View>
            </View>

            {/* Comparison bars */}
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text
                typography="caption"
                weight="semibold"
                color={palette.alpha['white-32']}
                style={{ minWidth: 48 }}
              >
                지난번
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: theme.radius.pill,
                  backgroundColor: palette.alpha['white-6'],
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${prevRatio * 100}%`,
                    height: '100%',
                    backgroundColor: palette.alpha['white-32'],
                    borderRadius: theme.radius.pill,
                  }}
                />
              </View>
              <Text
                typography="num-sm"
                color={palette.alpha['white-55']}
                style={{ minWidth: 64, textAlign: 'right' }}
              >
                {fmt(PREV_VOLUME)}kg
              </Text>
            </View>

            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text
                typography="label"
                color={palette.lime[400]}
                style={{ minWidth: 48 }}
              >
                오늘
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: theme.radius.pill,
                  backgroundColor: palette.alpha['white-6'],
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${todayRatio * 100}%`,
                    height: '100%',
                    backgroundColor: tone,
                    borderRadius: theme.radius.pill,
                  }}
                />
              </View>
              <Text
                typography="num-sm"
                color={palette.neutral[0]}
                style={{ minWidth: 64, textAlign: 'right' }}
              >
                {fmt(TODAY_VOLUME)}kg
              </Text>
            </View>
          </Card>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Button onPress={() => {}}>홈으로</Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
