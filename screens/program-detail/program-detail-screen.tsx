import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Card, palette, ScreenContainer, Text, theme } from '#/components/ui';
import { fixedProgram } from '#/domains/training';

export function ProgramDetailScreen() {
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
            {fixedProgram.name}
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            {fixedProgram.description}
          </Text>
        </View>

        {fixedProgram.routines.map((routine) => (
          <Pressable
            key={routine.id}
            onPress={() => router.push(`/routine/${routine.id}` as never)}
          >
            <Card
              header={
                <>
                  <Card.Title>{routine.name}</Card.Title>
                  <Card.Description>{routine.subtitle}</Card.Description>
                </>
              }
            >
              <Text typography="body" color={palette.alpha['white-55']}>
                {routine.exercises.length}개 운동
              </Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
