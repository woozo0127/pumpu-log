import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Progress,
  palette,
  ScreenContainer,
  Text,
  TopBar,
  theme,
} from '#/components/ui';
import { useActiveSession } from '#/domains/training/active-session-context';
import { ExitWorkoutSheet } from './exit-workout-sheet';
import { SetStepperRow } from './set-stepper-row';

export function WorkoutScreen() {
  const { draft, progress, canFinish, updateSet, completeSet, clearDraft } =
    useActiveSession();
  const [confirmExit, setConfirmExit] = useState(false);

  const activeSet =
    draft?.sets.find((set) => !set.completed) ?? draft?.sets.at(-1) ?? null;

  if (!draft || !activeSet) {
    return <Redirect href="/(tabs)/home" />;
  }

  const exerciseSets = draft.sets.filter(
    (set) => set.exerciseId === activeSet.exerciseId,
  );
  const exerciseSetIndex = exerciseSets.findIndex(
    (set) => set.id === activeSet.id,
  );

  return (
    <ScreenContainer
      header={
        <TopBar
          title={draft.routineName}
          subtitle={`${progress.completed} / ${progress.total} 세트`}
          onBack={() => setConfirmExit(true)}
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: theme.space.sm }}>
          <Progress value={progress.percent} height={6} />
          <Text typography="caption" color={palette.alpha['white-55']}>
            {progress.percent}% 완료
          </Text>
        </View>

        <View style={styles.card}>
          <View style={{ gap: theme.space.xs }}>
            <Text typography="label" color={palette.lime[400]}>
              {`SET ${exerciseSetIndex + 1} / ${exerciseSets.length}`}
            </Text>
            <Text typography="title" color={palette.neutral[0]}>
              {activeSet.exerciseName}
            </Text>
            <Text typography="body" color={palette.alpha['white-55']}>
              전체 {activeSet.order}번째 세트
            </Text>
          </View>

          <View style={styles.steppers}>
            <SetStepperRow
              label="WEIGHT"
              value={activeSet.weight}
              unit="kg"
              step={2.5}
              onChange={(weight) => updateSet(activeSet.id, { weight })}
            />
            <SetStepperRow
              label="REPS"
              value={activeSet.reps}
              unit="회"
              step={1}
              onChange={(reps) => updateSet(activeSet.id, { reps })}
            />
          </View>

          <Button onPress={() => completeSet(activeSet.id)}>세트 완료</Button>
        </View>

        <Button
          variant="secondary"
          disabled={!canFinish}
          onPress={() => router.replace('/finish' as never)}
        >
          운동 마치기
        </Button>
      </ScrollView>

      {confirmExit ? (
        <ExitWorkoutSheet
          onCancel={() => setConfirmExit(false)}
          onConfirm={() => {
            clearDraft();
            router.replace('/(tabs)/home' as never);
          }}
        />
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.space.lg,
    padding: theme.space.lg,
    paddingBottom: theme.space['3xl'],
  },
  card: {
    gap: theme.space.lg,
    padding: theme.space.lg,
    borderRadius: theme.radius['3xl'],
    backgroundColor: palette.neutral[900],
    borderWidth: 1,
    borderColor: `${palette.lime[400]}55`,
    ...theme.shadow.glow,
  },
  steppers: {
    gap: theme.space.md,
  },
});
