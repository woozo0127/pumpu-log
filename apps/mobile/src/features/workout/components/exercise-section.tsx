import { Button, Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';
import { SetRow } from './set-row';

interface SetData {
  weight: number;
  reps: number;
  isCompleted: boolean;
}

interface ExerciseSectionProps {
  name: string;
  previousRecord?: string;
  sets: SetData[];
  onToggleSet: (index: number) => void;
  onWeightChange: (index: number, value: number) => void;
  onRepsChange: (index: number, value: number) => void;
  onAddSet: () => void;
}

export function ExerciseSection({
  name,
  previousRecord,
  sets,
  onToggleSet,
  onWeightChange,
  onRepsChange,
  onAddSet,
}: ExerciseSectionProps) {
  return (
    <View className="gap-md">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-foreground">{name}</Text>
        {previousRecord && (
          <Text className="text-xs text-foreground-tertiary">이전: {previousRecord}</Text>
        )}
      </View>

      <View className="flex-row px-lg">
        <Text className="text-xs font-semibold text-foreground-tertiary text-center w-9">세트</Text>
        <Text className="text-xs font-semibold text-foreground-tertiary text-center flex-1">
          kg
        </Text>
        <Text className="text-xs font-semibold text-foreground-tertiary text-center flex-1">
          회
        </Text>
        <View className="w-6" />
      </View>

      {sets.map((set, i) => {
        const setKey = `set-${set.weight}-${set.reps}-${i}`;
        return (
          <SetRow
            key={setKey}
            setNumber={i + 1}
            weight={set.weight}
            reps={set.reps}
            isCompleted={set.isCompleted}
            onToggle={() => onToggleSet(i)}
            onWeightChange={(v) => onWeightChange(i, v)}
            onRepsChange={(v) => onRepsChange(i, v)}
          />
        );
      })}

      <Button variant="outline" onPress={onAddSet}>
        <Text className="font-semibold text-lime">+ 세트 추가</Text>
      </Button>
    </View>
  );
}
