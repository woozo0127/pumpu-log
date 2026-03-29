import { colors, Text } from '@pumpu-log/ui-kit';
import { ChevronLeft, Timer } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface WorkoutHeaderProps {
  routineName: string;
  elapsed: string;
  onBack: () => void;
}

export function WorkoutHeader({ routineName, elapsed, onBack }: WorkoutHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-2xl">
      <Pressable onPress={onBack} className="flex-row items-center gap-[6px]">
        <ChevronLeft size={20} color={colors.foreground} />
        <Text className="text-lg font-bold text-foreground">{routineName}</Text>
      </Pressable>
      <View className="flex-row items-center gap-[6px]">
        <Timer size={16} color={colors.lime.DEFAULT} />
        <Text className="text-sm font-semibold text-lime">{elapsed}</Text>
      </View>
    </View>
  );
}
