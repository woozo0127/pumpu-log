import { Button, colors, Text } from '@pumpu-log/ui-kit';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DayCard } from './components/day-card';

interface DayView {
  name: string;
  description: string;
}

export interface CreateProgramDaysContentProps {
  programName: string;
  days: DayView[];
  onBack: () => void;
  onDone: () => void;
  onDayPress: (index: number) => void;
  onAddDay: () => void;
}

export function CreateProgramDaysContent({
  programName,
  days,
  onBack,
  onDone,
  onDayPress,
  onAddDay,
}: CreateProgramDaysContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-2xl">
        <Pressable onPress={onBack}>
          <ChevronLeft size={22} color={colors['foreground-secondary']} />
        </Pressable>
        <Text className="text-lg font-bold text-foreground">{programName}</Text>
        <Pressable onPress={onDone}>
          <Text className="text-[15px] font-semibold text-lime">완료</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="gap-lg p-2xl pt-xl">
        <Text className="text-md font-semibold text-foreground">Day 구성</Text>

        <View className="gap-[10px]">
          {days.map((day, i) => (
            <DayCard
              key={day.name}
              name={day.name}
              description={day.description}
              onPress={() => onDayPress(i)}
            />
          ))}
        </View>

        <Button variant="outline" onPress={onAddDay}>
          <Text className="font-semibold text-lime">Day 추가</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

export function CreateProgramDaysScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <CreateProgramDaysContent
        programName="PHUL"
        days={[]}
        onBack={() => {}}
        onDone={() => {}}
        onDayPress={() => {}}
        onAddDay={() => {}}
      />
    </View>
  );
}
