import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { BackHandler, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { Button } from '#/components/ui/button';
import { CheckIcon } from '#/components/ui/icon';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';
import { OnboardedContext } from './_onboarded-context';

type SlideArt = 'rings' | 'check' | 'chart';

type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  art: SlideArt;
};

const slides: readonly Slide[] = [
  {
    eyebrow: '펌푸로그',
    title: '오늘보다\n조금 더 무겁게.',
    body: '점진적 과부하를 게임처럼.\n매 세트 기록하고 다음 목표를 자동으로 받아보세요.',
    art: 'rings',
  },
  {
    eyebrow: '02 / 03',
    title: '세트 하나에\n한 번의 탭.',
    body: '운동 중에는 가볍게.\n무게와 횟수만 바꾸고 체크하면 됩니다.',
    art: 'check',
  },
  {
    eyebrow: '03 / 03',
    title: '지난 기록을 보며\n무게를 정해요.',
    body: '직전 PR과 1RM이 한눈에 보여서\n오늘의 목표 무게를 빠르게 설정할 수 있어요.',
    art: 'chart',
  },
];

const PRESS_BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);
const PAGINATION_DURATION = 220;
const SLIDE_DURATION = 320;
const SWIPE_DISTANCE_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 500;
const RUBBER_BAND_RATIO = 0.3;

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const { setOnboarded } = useContext(OnboardedContext);
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);

  const onCTA = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      void complete();
    }
  };

  const complete = async () => {
    try {
      await AsyncStorage.setItem('pumpu-log:onboarded', '1');
    } catch {
      // 무시. 다음 진입에 온보딩이 다시 떠도 큰 손해 없음
    }
    setOnboarded(true);
    router.replace('/');
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (step > 0) {
        setStep(step - 1);
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [step]);

  // step 또는 width 변경 시 carousel을 해당 슬라이드로 보간 이동
  useEffect(() => {
    translateX.value = withTiming(-step * width, {
      duration: SLIDE_DURATION,
      easing: PRESS_BEZIER,
    });
  }, [step, width, translateX]);

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };
  const goNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-20, 20])
    .onUpdate((e) => {
      'worklet';
      const base = -step * width;
      const dx = e.translationX;
      // 양 끝(좌→우 at step 0, 우→좌 at last step)에서는 rubber-band 감쇠
      const atLeftEdge = step === 0 && dx > 0;
      const atRightEdge = step === slides.length - 1 && dx < 0;
      const effective = atLeftEdge || atRightEdge ? dx * RUBBER_BAND_RATIO : dx;
      translateX.value = base + effective;
    })
    .onEnd((e) => {
      'worklet';
      const distance = e.translationX;
      const velocity = e.velocityX;
      const passed =
        Math.abs(distance) > SWIPE_DISTANCE_THRESHOLD ||
        Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD;
      const canGoPrev = step > 0;
      const canGoNext = step < slides.length - 1;
      const willMove =
        passed && ((distance > 0 && canGoPrev) || (distance < 0 && canGoNext));
      if (!willMove) {
        // 임계 미달이거나 양 끝에서 막힘 — 원위치 복귀
        translateX.value = withTiming(-step * width, {
          duration: SLIDE_DURATION,
          easing: PRESS_BEZIER,
        });
        return;
      }
      if (distance > 0) {
        runOnJS(goPrev)();
      } else {
        runOnJS(goNext)();
      }
    });

  const carouselStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <ScreenContainer safeTop>
      <View style={{ flex: 1, paddingTop: theme.space['2xl'] }}>
        <GestureDetector gesture={panGesture}>
          <View style={{ flex: 1, overflow: 'hidden' }}>
            <Animated.View
              style={[
                { flex: 1, flexDirection: 'row', width: width * slides.length },
                carouselStyle,
              ]}
            >
              {slides.map((s) => (
                <SlidePane key={s.art} slide={s} width={width} />
              ))}
            </Animated.View>
          </View>
        </GestureDetector>
        <View style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
          <PaginationBar step={step} total={slides.length} />
          <Button variant="default" size="medium" onPress={onCTA}>
            {step < slides.length - 1 ? '계속' : '시작하기'}
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

function SlidePane({ slide, width }: { slide: Slide; width: number }) {
  return (
    <View style={{ width, flex: 1 }}>
      <Art art={slide.art} />
      <View style={{ paddingHorizontal: 28, paddingBottom: 24 }}>
        <Text
          typography="label"
          color={palette.lime[400]}
          style={{ marginBottom: 14 }}
        >
          {slide.eyebrow}
        </Text>
        <Text typography="display" color={palette.neutral[0]}>
          {slide.title}
        </Text>
        <Text
          typography="body"
          color={palette.alpha['white-55']}
          style={{ marginTop: 14 }}
        >
          {slide.body}
        </Text>
      </View>
    </View>
  );
}

function Art({ art }: { art: SlideArt }) {
  switch (art) {
    case 'rings':
      return <ArtRings />;
    case 'check':
      return <ArtCheck />;
    case 'chart':
      return <ArtChart />;
  }
}

function ArtRings() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <View
        style={[
          {
            width: 320,
            height: 320,
            borderRadius: 160,
            alignItems: 'center',
            justifyContent: 'center',
          },
          theme.shadow.glow,
        ]}
      >
        <Svg width={320} height={320} viewBox="0 0 320 320">
          <Defs>
            <LinearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={palette.lime[400]} />
              <Stop offset="100%" stopColor={palette.orange[400]} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={160}
            cy={160}
            r={135}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={20}
            fill="none"
          />
          <Circle
            cx={160}
            cy={160}
            r={135}
            stroke="url(#ring-grad)"
            strokeWidth={20}
            fill="none"
            strokeDasharray="848"
            strokeDashoffset={180}
            strokeLinecap="round"
            transform="rotate(-90 160 160)"
          />
          <Circle
            cx={160}
            cy={160}
            r={100}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={16}
            fill="none"
          />
          <Circle
            cx={160}
            cy={160}
            r={100}
            stroke={palette.lime[400]}
            strokeWidth={16}
            fill="none"
            strokeDasharray="628"
            strokeDashoffset={220}
            strokeLinecap="round"
            strokeOpacity={0.7}
            transform="rotate(-90 160 160)"
          />
          <Circle
            cx={160}
            cy={160}
            r={68}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={14}
            fill="none"
          />
          <SvgText
            x={160}
            y={156}
            textAnchor="middle"
            fill={palette.neutral[0]}
            fontSize={56}
            fontWeight="800"
          >
            72
          </SvgText>
          <SvgText
            x={160}
            y={194}
            textAnchor="middle"
            fill={palette.alpha['white-55']}
            fontSize={11}
            fontWeight="700"
            letterSpacing={2}
          >
            % 1RM
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}

type SetState = 'done' | 'active' | 'pending';

const checkSets: { w: number; r: number; state: SetState }[] = [
  { w: 60, r: 12, state: 'done' },
  { w: 70, r: 10, state: 'done' },
  { w: 80, r: 8, state: 'done' },
  { w: 85, r: 6, state: 'active' },
  { w: 90, r: 4, state: 'pending' },
];

function ArtCheck() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 40,
        justifyContent: 'center',
        gap: 8,
        overflow: 'hidden',
      }}
    >
      {checkSets.map((s, i) => (
        <CheckRow key={`${s.w}-${s.r}`} index={i} set={s} />
      ))}
    </View>
  );
}

function CheckRow({
  index,
  set,
}: {
  index: number;
  set: { w: number; r: number; state: SetState };
}) {
  const isDone = set.state === 'done';
  const isActive = set.state === 'active';

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: isActive ? 'rgba(212,255,0,0.08)' : palette.neutral[900],
    borderColor: isActive ? palette.lime[400] : palette.alpha['white-7'],
    opacity: isDone ? 0.55 : 1,
  };

  return (
    <View style={[rowStyle, isActive ? theme.shadow.glow : null]}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDone ? palette.lime[400] : 'transparent',
          borderWidth: isDone ? 0 : 1.5,
          borderColor: palette.alpha['white-32'],
        }}
      >
        {isDone ? (
          <CheckIcon color={palette.neutral[950]} size={16} />
        ) : (
          <Text
            typography="caption"
            color={palette.alpha['white-32']}
            weight="semibold"
          >
            {index + 1}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        <Text typography="num-md" color={palette.neutral[0]}>
          {set.w}
        </Text>
        <Text
          color={palette.alpha['white-55']}
          weight="medium"
          style={{ fontSize: 11, marginLeft: 4 }}
        >
          kg
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text typography="num-md" color={palette.neutral[0]}>
          {set.r}
        </Text>
        <Text
          color={palette.alpha['white-55']}
          weight="medium"
          style={{ fontSize: 11, marginLeft: 4 }}
        >
          회
        </Text>
      </View>
    </View>
  );
}

const chartPoints = [40, 55, 50, 65, 70, 68, 80, 85, 95, 92, 100, 110];
const CHART_W = 280;
const CHART_H = 200;
const CHART_MAX = 120;

function ArtChart() {
  const linePath = chartPoints
    .map((p, i) => {
      const x = (i / (chartPoints.length - 1)) * CHART_W;
      const y = CHART_H - (p / CHART_MAX) * CHART_H;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
  const areaPath = `${linePath} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
  const lastY =
    CHART_H - (chartPoints[chartPoints.length - 1] / CHART_MAX) * CHART_H;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Svg
        width={CHART_W + 40}
        height={CHART_H + 40}
        viewBox={`-20 -20 ${CHART_W + 40} ${CHART_H + 40}`}
      >
        <Defs>
          <LinearGradient id="chart-area" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={palette.lime[400]} stopOpacity={0.4} />
            <Stop offset="100%" stopColor={palette.lime[400]} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        {[0, 0.33, 0.66].map((y) => (
          <Line
            key={y}
            x1={0}
            x2={CHART_W}
            y1={CHART_H * y}
            y2={CHART_H * y}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        <Path d={areaPath} fill="url(#chart-area)" />
        <Path
          d={linePath}
          stroke={palette.lime[400]}
          strokeOpacity={0.35}
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={linePath}
          stroke={palette.lime[400]}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx={CHART_W} cy={lastY} r={6} fill={palette.lime[400]} />
      </Svg>
    </View>
  );
}

function PaginationBar({ step, total }: { step: number; total: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        marginBottom: 18,
        paddingLeft: 8,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        // 페이지네이션 점은 인덱스가 곧 정체성이며 추가/삭제/재정렬이 발생하지 않는다.
        // biome-ignore lint/suspicious/noArrayIndexKey: stable indicator slot
        <PaginationItem key={i} active={i === step} />
      ))}
    </View>
  );
}

function PaginationItem({ active }: { active: boolean }) {
  const flex = useSharedValue(active ? 2 : 1);

  useEffect(() => {
    flex.value = withTiming(active ? 2 : 1, {
      duration: PAGINATION_DURATION,
      easing: PRESS_BEZIER,
    });
  }, [active, flex]);

  const animatedStyle = useAnimatedStyle(() => ({ flex: flex.value }));

  return (
    <Animated.View
      style={[
        {
          height: 4,
          borderRadius: 2,
          backgroundColor: active
            ? palette.lime[400]
            : 'rgba(255,255,255,0.12)',
        },
        animatedStyle,
      ]}
    />
  );
}
