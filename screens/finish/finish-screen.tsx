import { Redirect, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  palette,
  ScreenContainer,
  StatTile,
  Text,
  theme,
} from '#/components/ui';
import { summarizeSession, useActiveSession } from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';

export function FinishScreen() {
  const { draft, finalizeSession, clearDraft } = useActiveSession();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const session = useMemo(
    () => (draft ? finalizeSession() : null),
    [draft, finalizeSession],
  );
  const summary = useMemo(
    () => (session ? summarizeSession(session) : null),
    [session],
  );

  if (!session || !summary) {
    return <Redirect href="/(tabs)/home" />;
  }

  const saveSession = async () => {
    setSaving(true);
    setSaveError(false);

    try {
      await trainingRepository.saveSession(session);
      clearDraft();
      router.replace('/(tabs)/home' as never);
    } catch {
      setSaveError(true);
      setSaving(false);
    }
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
          <Text typography="label" color={palette.lime[400]}>
            COMPLETE
          </Text>
          <Text typography="title" color={palette.neutral[0]}>
            잘했어요!
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            {session.routineName} 운동을 저장할 준비가 됐어요.
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

        {saveError ? (
          <Text typography="body" color={palette.red[400]}>
            저장에 실패했어요. 다시 시도해주세요.
          </Text>
        ) : null}

        <Button onPress={saveSession} loading={saving}>
          저장하고 완료
        </Button>
      </ScrollView>
    </ScreenContainer>
  );
}
