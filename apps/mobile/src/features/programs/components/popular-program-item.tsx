import { Text } from '@pumpu-log/ui-kit';
import { Pressable, View } from 'react-native';

interface PopularProgramItemProps {
  rank: number;
  name: string;
  description: string;
  onPress: () => void;
}

export function PopularProgramItem({ rank, name, description, onPress }: PopularProgramItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-lg flex-row items-center gap-md px-lg py-md"
    >
      <Text
        className={`text-base font-extrabold w-5 text-center ${
          rank === 1 ? 'text-lime' : 'text-foreground-secondary'
        }`}
      >
        {String(rank)}
      </Text>
      <View className="flex-1 gap-[1px]">
        <Text className="text-sm font-semibold text-foreground">{name}</Text>
        <Text className="text-[11px] text-foreground-tertiary">{description}</Text>
      </View>
    </Pressable>
  );
}
