import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  palette,
  ScreenContainer,
  StatTile,
  Text,
  theme,
} from '#/components/ui';
import {
  calculateStreak,
  calculateWeeklySummary,
  getDefaultRoutine,
  type WorkoutSession,
} from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';
import { TodayWorkoutCard } from './today-workout-card';

export function HomeScreen() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [error, setError] = useState(false);
  const routine = getDefaultRoutine();
  const weeklySummary = calculateWeeklySummary(sessions, new Date());
  const streak = calculateStreak(sessions, new Date());

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      trainingRepository
        .listSessions()
        .then((storedSessions) => {
          if (!mounted) return;
          setSessions(storedSessions);
          setError(false);
        })
        .catch(() => {
          if (!mounted) return;
          setError(true);
        });

      return () => {
        mounted = false;
      };
    }, []),
  );

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
            오늘의 운동
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            오늘은 기본 Push 루틴으로 시작해요.
          </Text>
        </View>

        {error ? (
          <Text typography="body" color={palette.red[400]}>
            운동 기록을 불러오지 못했어요.
          </Text>
        ) : null}

        <TodayWorkoutCard routine={routine} />

        <View style={{ flexDirection: 'row', gap: theme.space.sm }}>
          <StatTile
            surface
            label="이번 주"
            value={weeklySummary.workoutCount}
            unit="회"
            style={{ flex: 1 }}
          />
          <StatTile
            surface
            label="연속 운동"
            value={streak}
            unit="일"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
