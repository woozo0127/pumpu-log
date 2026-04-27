import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  ListRow,
  palette,
  ScreenContainer,
  Text,
  theme,
} from '#/components/ui';
import {
  getDefaultRoutine,
  getRoutineById,
  useActiveSession,
} from '#/domains/training';

export function RoutineDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const routine = id
    ? (getRoutineById(id) ?? getDefaultRoutine())
    : getDefaultRoutine();
  const { startRoutine } = useActiveSession();
  const setCount = routine.exercises.reduce(
    (total, exercise) => total + exercise.targetSets,
    0,
  );

  const startWorkout = () => {
    startRoutine(routine);
    router.push('/workout' as never);
  };

  return (
    <ScreenContainer safeTop>
      <ScrollView
        contentContainerStyle={{
          gap: theme.space.lg,
          padding: theme.space.lg,
          paddingBottom: theme.space['2xl'],
        }}
      >
        <View style={{ gap: theme.space.xs }}>
          <Text typography="title" color={palette.neutral[0]}>
            {routine.name}
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            {routine.subtitle}
          </Text>
        </View>

        <Card>
          <View style={{ gap: theme.space.sm }}>
            <Text typography="heading" color={palette.neutral[0]}>
              루틴 요약
            </Text>
            <Text typography="body" color={palette.alpha['white-55']}>
              {routine.exercises.length}개 운동 · {setCount}세트
            </Text>
            <Button onPress={startWorkout}>운동 시작</Button>
          </View>
        </Card>

        <View style={{ gap: theme.space.sm }}>
          <Text typography="heading" color={palette.neutral[0]}>
            운동 목록
          </Text>
          {routine.exercises.map((exercise) => (
            <ListRow
              key={exercise.id}
              surface
              title={exercise.name}
              subtitle={`${exercise.targetSets}세트 × ${exercise.defaultReps}회`}
              trailing={
                <Text typography="label" color={palette.alpha['white-55']}>
                  {exercise.defaultWeight}kg
                </Text>
              }
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
