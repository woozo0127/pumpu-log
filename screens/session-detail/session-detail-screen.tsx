import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  palette,
  ScreenContainer,
  StatTile,
  Text,
  theme,
} from '#/components/ui';
import { summarizeSession, type WorkoutSession } from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';

function formatSessionDate(finishedAt: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(finishedAt));
}

export function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const sessionId = Array.isArray(id) ? id[0] : id;
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!sessionId) {
      setSession(null);
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    setSession(null);
    setLoading(true);
    trainingRepository
      .getSession(sessionId)
      .then((storedSession) => {
        if (!mounted) return;
        setSession(storedSession);
      })
      .catch(() => {
        if (!mounted) return;
        setSession(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [sessionId]);

  const summary = useMemo(
    () => (session ? summarizeSession(session) : null),
    [session],
  );
  const exerciseGroups = useMemo(() => {
    if (!session) return [];

    const groups: {
      exerciseId: string;
      exerciseName: string;
      sets: WorkoutSession['sets'];
    }[] = [];

    for (const set of session.sets) {
      let group = groups.find((item) => item.exerciseId === set.exerciseId);
      if (!group) {
        group = {
          exerciseId: set.exerciseId,
          exerciseName: set.exerciseName,
          sets: [],
        };
        groups.push(group);
      }
      group.sets.push(set);
    }

    return groups;
  }, [session]);

  if (loading) {
    return <ScreenContainer safeTop />;
  }

  if (!session || !summary) {
    return <Redirect href="/(tabs)/history" />;
  }

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
          <Text typography="label" color={palette.lime[400]}>
            SESSION
          </Text>
          <Text typography="title" color={palette.neutral[0]}>
            {session.routineName}
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            {formatSessionDate(session.finishedAt)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.space.sm }}>
          <StatTile
            surface
            label="볼륨"
            value={summary.volume}
            unit="kg"
            style={{ flex: 1 }}
          />
          <StatTile
            surface
            label="세트"
            value={summary.completedSets}
            unit="세트"
            style={{ flex: 1 }}
          />
          <StatTile
            surface
            label="시간"
            value={summary.durationMinutes}
            unit="분"
            style={{ flex: 1 }}
          />
        </View>

        <View style={{ gap: theme.space.sm }}>
          {exerciseGroups.map((group) => (
            <View
              key={group.exerciseId}
              style={{
                gap: theme.space.sm,
                padding: theme.space.lg,
                borderRadius: theme.radius.xl,
                backgroundColor: palette.neutral[900],
                borderWidth: 1,
                borderColor: palette.alpha['white-7'],
              }}
            >
              <Text typography="heading" color={palette.neutral[0]}>
                {group.exerciseName}
              </Text>
              {group.sets.map((set, index) => (
                <View
                  key={set.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text typography="body" color={palette.alpha['white-55']}>
                    {index + 1}세트
                  </Text>
                  <Text typography="body" color={palette.neutral[0]}>
                    {set.completed
                      ? `${set.weight} kg × ${set.reps}`
                      : '미완료'}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
