import { router } from 'expo-router';
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

export function ProgramsScreen() {
  const openProgram = () => {
    router.push(`/program/${fixedProgram.id}` as never);
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
            프로그램
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            고정 스타터 프로그램으로 운동을 기록해요.
          </Text>
        </View>

        <Card
          header={
            <>
              <Card.Title>{fixedProgram.name}</Card.Title>
              <Card.Description>{fixedProgram.description}</Card.Description>
            </>
          }
        >
          <View style={{ gap: theme.space.md }}>
            <Text typography="body" color={palette.alpha['white-55']}>
              {fixedProgram.routines.length}개 루틴 · Push/Pull/Legs
            </Text>
            <Button onPress={openProgram}>프로그램 보기</Button>
          </View>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
