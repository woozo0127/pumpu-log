import { Button, colors, Separator, Text } from '@pumpu-log/ui-kit';
import { Trophy } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ExerciseSummary {
  name: string;
  detail: string;
}

export interface WorkoutSummaryContentProps {
  routineLabel: string;
  duration: string;
  exerciseCount: string;
  totalVolume: string;
  exercises: ExerciseSummary[];
  onDone: () => void;
}

export function WorkoutSummaryContent({
  routineLabel,
  duration,
  exerciseCount,
  totalVolume,
  exercises,
  onDone,
}: WorkoutSummaryContentProps) {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="items-center gap-2xl p-2xl"
    >
      <View className="w-20 h-20 rounded-full bg-lime-dim items-center justify-center">
        <Trophy size={36} color={colors.lime.DEFAULT} />
      </View>

      <Text variant="h2">운동 완료!</Text>
      <Text className="text-sm text-foreground-secondary">{routineLabel}</Text>

      <View className="bg-card rounded-lg border border-border flex-row w-full">
        <View className="flex-1 items-center gap-1 p-lg">
          <Text className="text-xl font-bold text-lime">{duration}</Text>
          <Text className="text-[11px] text-foreground-tertiary">소요 시간</Text>
        </View>
        <Separator orientation="vertical" />
        <View className="flex-1 items-center gap-1 p-lg">
          <Text className="text-xl font-bold text-lime">{exerciseCount}</Text>
          <Text className="text-[11px] text-foreground-tertiary">운동 수</Text>
        </View>
        <Separator orientation="vertical" />
        <View className="flex-1 items-center gap-1 p-lg">
          <Text className="text-xl font-bold text-lime">{totalVolume}</Text>
          <Text className="text-[11px] text-foreground-tertiary">총 볼륨(kg)</Text>
        </View>
      </View>

      <View className="gap-sm w-full">
        <Text className="text-sm font-semibold text-foreground">운동별 요약</Text>
        {exercises.map((ex) => (
          <View
            key={ex.name}
            className="bg-card rounded-lg flex-row items-center gap-md px-lg py-md"
          >
            <Text className="text-sm font-medium text-foreground flex-1">{ex.name}</Text>
            <Text className="text-xs text-foreground-secondary">{ex.detail}</Text>
          </View>
        ))}
      </View>

      <Button className="w-full" onPress={onDone}>
        <Text className="font-semibold text-foreground-on-color">홈으로</Text>
      </Button>
    </ScrollView>
  );
}

export function WorkoutSummaryScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <WorkoutSummaryContent
        routineLabel=""
        duration="00:00"
        exerciseCount="0"
        totalVolume="0"
        exercises={[]}
        onDone={() => {}}
      />
    </View>
  );
}
