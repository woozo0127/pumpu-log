import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Card, palette, Text, theme } from '#/components/ui';
import { type Routine, useActiveSession } from '#/domains/training';

type TodayWorkoutCardProps = {
  routine: Routine;
};

export function TodayWorkoutCard({ routine }: TodayWorkoutCardProps) {
  const { startRoutine } = useActiveSession();
  const exerciseCount = routine.exercises.length;
  const setCount = routine.exercises.reduce(
    (total, exercise) => total + exercise.targetSets,
    0,
  );

  const startWorkout = () => {
    startRoutine(routine);
    router.push('/workout' as never);
  };

  const openRoutine = () => {
    router.push(`/routine/${routine.id}` as never);
  };

  return (
    <Card
      header={
        <>
          <Card.Title>{routine.name}</Card.Title>
          <Card.Description>{routine.subtitle}</Card.Description>
        </>
      }
    >
      <View style={{ gap: theme.space.md }}>
        <Text typography="body" color={palette.alpha['white-55']}>
          {exerciseCount}개 운동 · {setCount}세트
        </Text>
        <View style={{ flexDirection: 'row', gap: theme.space.sm }}>
          <Button onPress={startWorkout} style={{ flex: 1 }}>
            운동 시작
          </Button>
          <Button variant="outline" onPress={openRoutine} style={{ flex: 1 }}>
            루틴 보기
          </Button>
        </View>
      </View>
    </Card>
  );
}
