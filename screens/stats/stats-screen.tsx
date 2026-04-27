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
  calculateSessionVolume,
  type WorkoutSession,
} from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';

export function StatsScreen() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [error, setError] = useState(false);
  const totalVolume = sessions.reduce(
    (total, session) => total + calculateSessionVolume(session),
    0,
  );

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
            통계
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            완료한 운동의 누적 기록입니다.
          </Text>
        </View>

        {error ? (
          <Text typography="body" color={palette.red[400]}>
            운동 통계를 불러오지 못했어요.
          </Text>
        ) : null}

        <StatTile surface label="완료 세션" value={sessions.length} unit="회" />
        <StatTile
          surface
          label="총 볼륨"
          value={totalVolume.toLocaleString('ko-KR')}
          unit="kg"
        />
      </ScrollView>
    </ScreenContainer>
  );
}
