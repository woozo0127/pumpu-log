import { Badge, colors, Text } from '@pumpu-log/ui-kit';
import { GripVertical, X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface ExerciseItemProps {
  name: string;
  category: string;
  onRemove: () => void;
}

export function ExerciseItem({ name, category, onRemove }: ExerciseItemProps) {
  return (
    <View className="bg-card rounded-lg border border-border flex-row items-center gap-[10px] px-lg py-md">
      <GripVertical size={16} color={colors['foreground-tertiary']} />
      <Text className="text-sm font-medium text-foreground flex-1">{name}</Text>
      <Badge size="sm">{category}</Badge>
      <Pressable onPress={onRemove} hitSlop={8}>
        <X size={16} color={colors['foreground-tertiary']} />
      </Pressable>
    </View>
  );
}
