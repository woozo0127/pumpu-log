import { Badge, Dot, Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';

interface DayInfo {
  name: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

interface ActiveProgramCardProps {
  name: string;
  dayProgress: string;
  days: DayInfo[];
}

export function ActiveProgramCard({ name, dayProgress, days }: ActiveProgramCardProps) {
  return (
    <View className="bg-card rounded-lg border border-lime gap-md p-lg">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-foreground">{name}</Text>
        <Badge>{dayProgress}</Badge>
      </View>

      <View className="gap-[6px]">
        {days.map((day) => (
          <View key={day.name} className="flex-row items-center gap-[10px]">
            <Dot
              color={day.isCompleted || day.isCurrent ? 'lime' : 'foreground-secondary'}
              size="md"
            />
            <Text
              className={
                day.isCurrent
                  ? 'text-sm font-semibold text-foreground'
                  : 'text-sm text-foreground-secondary'
              }
            >
              {day.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
