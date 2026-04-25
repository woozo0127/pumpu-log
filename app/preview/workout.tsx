import { useState } from 'react';
import { View } from 'react-native';
import { Badge } from '#/components/ui/badge';
import { BottomSheet } from '#/components/ui/bottom-sheet';
import { Button } from '#/components/ui/button';
import { Icon } from '#/components/ui/icon';
import { Progress } from '#/components/ui/progress';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Stepper } from '#/components/ui/stepper';
import { Tabs } from '#/components/ui/tabs';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';
import { TopBar } from '#/components/ui/top-bar';

type SetData = { w: number; r: number; done: boolean };
type Exercise = { name: string; sub: string; sets: SetData[] };

const INITIAL: Exercise[] = [
  {
    name: '벤치 프레스',
    sub: '바벨 · 가슴',
    sets: [
      { w: 60, r: 12, done: true },
      { w: 80, r: 8, done: true },
      { w: 90, r: 6, done: false },
      { w: 90, r: 6, done: false },
    ],
  },
  {
    name: '인클라인 덤벨 프레스',
    sub: '덤벨 · 상부 가슴',
    sets: [
      { w: 22, r: 10, done: false },
      { w: 24, r: 8, done: false },
      { w: 26, r: 8, done: false },
    ],
  },
];

export default function WorkoutPreview() {
  const [exIdx, setExIdx] = useState(0);
  const [exercises, setExercises] = useState(INITIAL);
  const [confirmExit, setConfirmExit] = useState(false);

  const ex = exercises[exIdx];
  const activeSetIdx = ex.sets.findIndex((s) => !s.done);
  const safeActive = activeSetIdx === -1 ? ex.sets.length - 1 : activeSetIdx;
  const totalDone = exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.done).length,
    0,
  );
  const totalSets = exercises.reduce((a, e) => a + e.sets.length, 0);
  const progress = totalSets === 0 ? 0 : (totalDone / totalSets) * 100;

  const updateSet = (i: number, key: 'w' | 'r', value: number) => {
    setExercises((prev) =>
      prev.map((e, idx) =>
        idx === exIdx
          ? {
              ...e,
              sets: e.sets.map((s, j) =>
                j === i ? { ...s, [key]: value } : s,
              ),
            }
          : e,
      ),
    );
  };

  const completeSet = (i: number) => {
    setExercises((prev) =>
      prev.map((e, idx) =>
        idx === exIdx
          ? {
              ...e,
              sets: e.sets.map((s, j) =>
                j === i ? { ...s, done: !s.done } : s,
              ),
            }
          : e,
      ),
    );
  };

  return (
    <ScreenContainer
      header={
        <TopBar
          subtitle="PUSH DAY"
          title={`${totalDone}/${totalSets} 세트`}
          onBack={() => setConfirmExit(true)}
          right={<Button size="sm">완료</Button>}
        />
      }
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Progress value={progress} />
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: theme.space.sm }}>
        <Tabs value={exIdx} onValueChange={setExIdx}>
          <Tabs.List>
            {exercises.map((e, i) => (
              <Tabs.Trigger key={e.name} value={i}>
                {e.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
      </View>

      <View style={{ padding: theme.space.xl, gap: theme.space.md }}>
        <View>
          <Text typography="subtitle" color={palette.neutral[0]}>
            {ex.name}
          </Text>
          <Text typography="caption" color={palette.alpha['white-55']}>
            {ex.sub}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: palette.neutral[900],
            borderRadius: theme.radius['3xl'],
            borderWidth: 1,
            borderColor: `${palette.lime[400]}66`,
            padding: theme.space.lg,
            ...theme.shadow.glow,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Badge variant="accent">{`SET ${safeActive + 1} / ${ex.sets.length}`}</Badge>
            <Text typography="caption" color={palette.alpha['white-55']}>
              이전 · 80kg × 8
            </Text>
          </View>

          <View style={{ marginTop: theme.space.md, gap: theme.space.md }}>
            <Stepper
              variant="big"
              label="WEIGHT"
              value={ex.sets[safeActive].w}
              unit="kg"
              step={2.5}
              onChange={(v) => updateSet(safeActive, 'w', v)}
            />
            <Stepper
              variant="big"
              label="REPS"
              value={ex.sets[safeActive].r}
              unit="회"
              onChange={(v) => updateSet(safeActive, 'r', v)}
            />
          </View>

          <View style={{ marginTop: theme.space.lg }}>
            <Button
              size="lg"
              iconLeft={
                <Icon name="check" color={palette.neutral[950]} size={18} />
              }
              onPress={() => completeSet(safeActive)}
            >
              {ex.sets[safeActive].done ? '완료 취소' : '세트 완료'}
            </Button>
          </View>
        </View>

        <View style={{ gap: 6 }}>
          {ex.sets.map((s, i) => (
            <SetRowInline
              // biome-ignore lint/suspicious/noArrayIndexKey: 동일 무게×횟수 세트 정상 중복 — 인덱스 결합
              key={`${i}-${s.w}-${s.r}`}
              index={i + 1}
              weight={s.w}
              reps={s.r}
              done={s.done}
              active={i === safeActive}
            />
          ))}
        </View>
      </View>

      <BottomSheet open={confirmExit} onClose={() => setConfirmExit(false)}>
        <BottomSheet.Header>
          <BottomSheet.Eyebrow color={palette.red[400]}>
            운동 중단
          </BottomSheet.Eyebrow>
          <BottomSheet.Title>정말 그만둘까요?</BottomSheet.Title>
          <BottomSheet.Description>
            완료하지 않은 세트는 저장되지 않아요. 지금까지의 진행이 모두
            사라집니다.
          </BottomSheet.Description>
        </BottomSheet.Header>
        <BottomSheet.Footer>
          <Button
            variant="destructive"
            size="lg"
            onPress={() => setConfirmExit(false)}
          >
            그만두기
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onPress={() => setConfirmExit(false)}
          >
            계속 운동하기
          </Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </ScreenContainer>
  );
}

type SetRowInlineProps = {
  index: number;
  weight: number;
  reps: number;
  done?: boolean;
  active?: boolean;
};

function SetRowInline({
  index,
  weight,
  reps,
  done,
  active,
}: SetRowInlineProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: theme.space.md,
        paddingVertical: 10,
        borderRadius: theme.radius.md,
        backgroundColor: active ? `${palette.lime[400]}10` : 'transparent',
        borderWidth: 1,
        borderColor: active ? `${palette.lime[400]}55` : 'transparent',
        opacity: done ? 0.5 : 1,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 9,
          backgroundColor: done ? palette.lime[400] : palette.alpha['white-7'],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <Icon name="check" color={palette.neutral[950]} size={14} />
        ) : (
          <Text
            typography="label"
            color={active ? palette.lime[400] : palette.alpha['white-55']}
          >
            {String(index)}
          </Text>
        )}
      </View>
      <Text
        typography="caption"
        color={palette.alpha['white-55']}
        style={{ flex: 1 }}
      >
        {`SET ${index}`}
      </Text>
      <Text typography="num-sm" color={palette.neutral[0]}>
        {`${weight} kg`}
      </Text>
      <Text
        typography="num-sm"
        color={palette.neutral[0]}
        style={{ marginLeft: 14 }}
      >
        {`${reps}회`}
      </Text>
    </View>
  );
}
