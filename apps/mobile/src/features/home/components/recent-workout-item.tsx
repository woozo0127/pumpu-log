import { View } from 'react-native';
import { Separator, Text } from '@pumpu-log/ui-kit';

interface RecentWorkoutItemProps {
  day: string;
  month: string;
  name: string;
  detail: string;
  onPress?: () => void;
}

export function RecentWorkoutItem({ day, month, name, detail }: RecentWorkoutItemProps) {
  return (
    <View className="bg-card rounded-lg flex-row items-center gap-[14px] p-[14px]">
      <View className="items-center w-10 gap-[2px]">
        <Text className="text-lg font-bold text-lime">{day}</Text>
        <Text className="text-xs text-foreground-tertiary">{month}</Text>
      </View>
      <Separator orientation="vertical" className="h-9" />
      <View className="flex-1 gap-[2px]">
        <Text className="text-sm font-semibold text-foreground">{name}</Text>
        <Text className="text-xs text-foreground-secondary">{detail}</Text>
      </View>
    </View>
  );
}
