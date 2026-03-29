import { colors, Text } from '@pumpu-log/ui-kit';
import { ChevronRight, GripVertical } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface DayCardProps {
  name: string;
  description: string;
  onPress: () => void;
}

export function DayCard({ name, description, onPress }: DayCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-xl border border-border flex-row items-center gap-md p-lg"
    >
      <GripVertical size={16} color={colors['foreground-tertiary']} />
      <View className="flex-1 gap-[2px]">
        <Text className="text-sm font-semibold text-foreground">{name}</Text>
        <Text className="text-xs text-foreground-secondary">{description}</Text>
      </View>
      <ChevronRight size={18} color={colors['foreground-tertiary']} />
    </Pressable>
  );
}
