import { Pressable, View } from 'react-native';
import { Text, colors } from '@pumpu-log/ui-kit';
import { ChevronRight } from 'lucide-react-native';

interface ProgramTemplateCardProps {
  badge: string;
  name: string;
  description: string;
  onPress: () => void;
}

export function ProgramTemplateCard({
  badge,
  name,
  description,
  onPress,
}: ProgramTemplateCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-lg border border-border-subtle flex-row items-center gap-[14px] p-lg"
    >
      <View className="w-12 h-12 rounded-lg bg-lime-dim items-center justify-center">
        <Text className="text-sm font-extrabold text-lime">{badge}</Text>
      </View>
      <View className="flex-1 gap-[2px]">
        <Text className="text-base font-semibold text-foreground">{name}</Text>
        <Text className="text-xs text-foreground-secondary">{description}</Text>
      </View>
      <ChevronRight size={18} color={colors['foreground-tertiary']} />
    </Pressable>
  );
}
