import { Button, colors, Text } from '@pumpu-log/ui-kit';
import { ChevronUp } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface WorkoutFooterProps {
  current: number;
  total: number;
  onNext: () => void;
  onShowExercises: () => void;
}

export function WorkoutFooter({ current, total, onNext, onShowExercises }: WorkoutFooterProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;
  const isLast = current === total;

  return (
    <View className="gap-md px-2xl pt-md pb-2xl">
      <View className="flex-row items-center gap-[10px] py-sm">
        <View className="flex-1 h-1 bg-border rounded-sm overflow-hidden">
          <View className="h-1 bg-lime rounded-sm" style={{ width: `${progress}%` }} />
        </View>
        <Pressable
          onPress={onShowExercises}
          className="flex-row items-center gap-1 bg-card rounded-md border border-border px-sm py-[2px]"
        >
          <Text className="text-[11px] font-semibold text-foreground-secondary">
            {current}/{total}
          </Text>
          <ChevronUp size={12} color={colors['foreground-tertiary']} />
        </Pressable>
      </View>

      <Button onPress={onNext}>
        <Text className="font-semibold text-foreground-on-color">
          {isLast ? '운동 완료' : '다음 운동'}
        </Text>
      </Button>
    </View>
  );
}
