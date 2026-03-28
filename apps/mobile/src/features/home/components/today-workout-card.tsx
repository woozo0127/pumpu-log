import { Badge, Button, Card, Dot, Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';

interface TodayWorkoutCardProps {
  programName: string;
  routineName: string;
  dayProgress: string;
  exercises: string[];
  onStart: () => void;
}

export function TodayWorkoutCard({
  programName,
  routineName,
  dayProgress,
  exercises,
  onStart,
}: TodayWorkoutCardProps) {
  return (
    <Card className="gap-lg">
      <View className="flex-row items-center justify-between">
        <View className="gap-xs flex-1">
          <Text className="text-sm font-semibold text-lime">{programName}</Text>
          <Text className="text-lg font-bold text-foreground">{routineName}</Text>
        </View>
        <Badge>{dayProgress}</Badge>
      </View>

      <View className="gap-sm">
        {exercises.map((exercise) => (
          <View key={exercise} className="flex-row items-center gap-[10px]">
            <Dot color="lime" size="md" />
            <Text variant="muted">{exercise}</Text>
          </View>
        ))}
      </View>

      <Button onPress={onStart}>
        <Text className="font-semibold text-foreground-on-color">운동 시작</Text>
      </Button>
    </Card>
  );
}
