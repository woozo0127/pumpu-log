import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  palette,
  ScreenContainer,
  Text,
  theme,
} from '#/components/ui';
import { fixedProgram } from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';

export function SettingsScreen() {
  const [message, setMessage] = useState('');

  const clearSessions = async () => {
    await trainingRepository.clearSessions();
    setMessage('운동 기록을 삭제했어요.');
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
            설정
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            Pumpu Log 앱 정보와 개발 도구입니다.
          </Text>
        </View>

        <Card
          header={
            <>
              <Card.Title>Pumpu Log</Card.Title>
              <Card.Description>고정 루틴 기반 운동 기록 앱</Card.Description>
            </>
          }
        >
          <View style={{ gap: theme.space.sm }}>
            <Text typography="body" color={palette.alpha['white-55']}>
              현재 프로그램: {fixedProgram.name}
            </Text>
            <Text typography="body" color={palette.alpha['white-55']}>
              루틴 수: {fixedProgram.routines.length}개
            </Text>
          </View>
        </Card>

        {__DEV__ ? (
          <Card
            header={
              <>
                <Card.Title>개발 도구</Card.Title>
                <Card.Description>
                  로컬 세션 데이터를 초기화합니다.
                </Card.Description>
              </>
            }
          >
            <View style={{ gap: theme.space.md }}>
              <Button variant="destructive" onPress={clearSessions}>
                세션 기록 지우기
              </Button>
              {message ? (
                <Text typography="caption" color={palette.alpha['white-55']}>
                  {message}
                </Text>
              ) : null}
            </View>
          </Card>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}
