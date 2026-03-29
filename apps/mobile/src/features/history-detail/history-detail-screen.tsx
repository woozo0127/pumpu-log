import { Badge, colors, Separator, Text } from '@pumpu-log/ui-kit';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SetDetail {
  number: number;
  weight: string;
  reps: string;
}

interface ExerciseDetail {
  name: string;
  sets: SetDetail[];
}

export interface HistoryDetailContentProps {
  dateLabel: string;
  duration: string;
  exerciseCount: string;
  volume: string;
  programName: string;
  routineLabel: string;
  exercises: ExerciseDetail[];
  onBack: () => void;
}

export function HistoryDetailContent({
  dateLabel,
  duration,
  exerciseCount,
  volume,
  programName,
  routineLabel,
  exercises,
  onBack,
}: HistoryDetailContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-2xl">
        <Pressable onPress={onBack} testID="back-button">
          <ChevronLeft size={22} color={colors['foreground-secondary']} />
        </Pressable>
        <Text className="text-lg font-bold text-foreground">{dateLabel}</Text>
        <View className="w-[22px]" />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="gap-xl p-2xl pt-lg">
        <View className="bg-card rounded-lg border border-border flex-row">
          <View className="flex-1 items-center gap-1 p-[14px]">
            <Text className="text-md font-bold text-lime">{duration}</Text>
            <Text className="text-[11px] text-foreground-tertiary">소요 시간</Text>
          </View>
          <Separator orientation="vertical" />
          <View className="flex-1 items-center gap-1 p-[14px]">
            <Text className="text-md font-bold text-lime">{exerciseCount}</Text>
            <Text className="text-[11px] text-foreground-tertiary">운동 수</Text>
          </View>
          <Separator orientation="vertical" />
          <View className="flex-1 items-center gap-1 p-[14px]">
            <Text className="text-md font-bold text-lime">{volume}</Text>
            <Text className="text-[11px] text-foreground-tertiary">볼륨(kg)</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-sm">
          <Badge size="sm">{programName}</Badge>
          <Text className="text-[13px] text-foreground-secondary">{routineLabel}</Text>
        </View>

        {exercises.map((ex) => (
          <View key={ex.name} className="gap-[10px]">
            <Text className="text-md font-semibold text-foreground">{ex.name}</Text>
            <View className="gap-[6px]">
              {ex.sets.map((s) => (
                <View
                  key={`${ex.name}-${s.number}`}
                  className="bg-card rounded-lg flex-row items-center px-lg py-[10px]"
                >
                  <Text className="text-xs font-semibold text-lime w-[30px]">
                    {String(s.number)}
                  </Text>
                  <Text className="text-sm font-semibold text-foreground flex-1">{s.weight}</Text>
                  <Text className="text-sm text-foreground-secondary">{s.reps}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function HistoryDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HistoryDetailContent
        dateLabel=""
        duration=""
        exerciseCount="0"
        volume="0"
        programName=""
        routineLabel=""
        exercises={[]}
        onBack={() => router.back()}
      />
    </View>
  );
}
