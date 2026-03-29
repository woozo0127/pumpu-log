import { colors, Text } from '@pumpu-log/ui-kit';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface OtherProgramCardProps {
  name: string;
  description: string;
  onPress: () => void;
}

export function OtherProgramCard({ name, description, onPress }: OtherProgramCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-lg border border-border-subtle flex-row items-center gap-[14px] p-lg"
    >
      <View className="flex-1 gap-1">
        <Text className="text-base font-semibold text-foreground">{name}</Text>
        <Text className="text-xs text-foreground-secondary">{description}</Text>
      </View>
      <ChevronRight size={18} color={colors['foreground-tertiary']} />
    </Pressable>
  );
}
