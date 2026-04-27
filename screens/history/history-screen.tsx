import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  EmptyState,
  palette,
  ScreenContainer,
  Text,
  theme,
} from '#/components/ui';
import { summarizeSession, type WorkoutSession } from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';

function formatSessionDate(finishedAt: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(finishedAt));
}

export function HistoryScreen() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      setLoading(true);
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
        })
        .finally(() => {
          if (!mounted) return;
          setLoading(false);
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
            기록
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            완료한 운동 기록을 모아봤어요.
          </Text>
        </View>

        {error ? (
          <Text typography="body" color={palette.red[400]}>
            기록을 불러오지 못했어요.
          </Text>
        ) : null}

        {!loading && !error && sessions.length === 0 ? (
          <EmptyState
            title="첫 운동을 시작해보세요."
            body="완료한 운동이 여기에 쌓입니다."
          />
        ) : null}

        <View style={{ gap: theme.space.sm }}>
          {sessions.map((session) => {
            const summary = summarizeSession(session);

            return (
              <Pressable
                key={session.id}
                onPress={() => router.push(`/session/${session.id}` as never)}
                style={{
                  gap: theme.space.sm,
                  padding: theme.space.lg,
                  borderRadius: theme.radius.xl,
                  backgroundColor: palette.neutral[900],
                  borderWidth: 1,
                  borderColor: palette.alpha['white-7'],
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: theme.space.md,
                  }}
                >
                  <Text typography="heading" color={palette.neutral[0]}>
                    {session.routineName}
                  </Text>
                  <Text typography="caption" color={palette.alpha['white-55']}>
                    {formatSessionDate(session.finishedAt)}
                  </Text>
                </View>
                <Text typography="body" color={palette.lime[400]}>
                  {summary.volume} kg
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
