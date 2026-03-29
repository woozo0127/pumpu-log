import { colors, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';

interface CalendarDay {
  day: number;
  hasWorkout: boolean;
  isToday?: boolean;
}

interface WorkoutEntry {
  id: string;
  name: string;
  detail: string;
}

export interface HistoryScreenContentProps {
  monthLabel: string;
  dayHeaders: string[];
  calendarDays: CalendarDay[];
  selectedDate: string;
  selectedWorkouts: WorkoutEntry[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number) => void;
  onWorkoutPress: (id: string) => void;
}

export function HistoryScreenContent({
  monthLabel,
  dayHeaders,
  calendarDays,
  selectedDate,
  selectedWorkouts,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  onWorkoutPress,
}: HistoryScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-xl p-2xl pt-xl">
      <Text variant="h2">기록</Text>

      <View className="gap-md">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={onPrevMonth}>
            <ChevronLeft size={20} color={colors['foreground-secondary']} />
          </Pressable>
          <Text className="text-md font-semibold text-foreground">{monthLabel}</Text>
          <Pressable onPress={onNextMonth}>
            <ChevronRight size={20} color={colors['foreground-secondary']} />
          </Pressable>
        </View>

        <View className="flex-row justify-between">
          {dayHeaders.map((d) => (
            <View key={d} className="w-9 h-5 items-center justify-center">
              <Text className="text-xs text-foreground-tertiary">{d}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row flex-wrap gap-y-sm">
          {calendarDays.map((cd) => (
            <Pressable
              key={`day-${cd.day}`}
              onPress={() => onSelectDay(cd.day)}
              className={`w-9 h-9 rounded-lg items-center justify-center ${
                cd.hasWorkout && !cd.isToday ? 'bg-lime' : ''
              } ${cd.isToday ? 'bg-lime-dim border border-lime' : ''}`}
              style={{ width: `${100 / 7}%` }}
            >
              <Text
                className={`text-sm ${
                  cd.hasWorkout || cd.isToday
                    ? cd.isToday
                      ? 'font-bold text-lime'
                      : 'font-semibold text-foreground-on-color'
                    : 'text-foreground-secondary'
                }`}
              >
                {String(cd.day)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="items-center pt-xs">
          <View className="w-10 h-1 rounded-sm bg-border-subtle" />
        </View>
      </View>

      <View className="gap-md">
        <SectionHeader title={selectedDate} />
        {selectedWorkouts.map((w) => (
          <Pressable
            key={w.id}
            onPress={() => onWorkoutPress(w.id)}
            className="bg-card rounded-md flex-row items-center gap-[14px] p-[14px]"
          >
            <View className="flex-1 gap-[2px]">
              <Text className="text-sm font-semibold text-foreground">{w.name}</Text>
              <Text className="text-xs text-foreground-secondary">{w.detail}</Text>
            </View>
            <ChevronRight size={18} color={colors['foreground-tertiary']} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

export function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const sessions = useWorkoutHistoryStore((s) => s.sessions);

  const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];
  const now = new Date();
  const monthLabel = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

  const calendarDays: CalendarDay[] = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    hasWorkout: sessions.some((s) => {
      const d = new Date(s.startedAt);
      return d.getDate() === i + 1 && d.getMonth() === now.getMonth();
    }),
    isToday: i + 1 === now.getDate(),
  }));

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HistoryScreenContent
        monthLabel={monthLabel}
        dayHeaders={dayHeaders}
        calendarDays={calendarDays}
        selectedDate={`${now.getMonth() + 1}월 ${now.getDate()}일`}
        selectedWorkouts={[]}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
        onSelectDay={() => {}}
        onWorkoutPress={() => {}}
      />
    </View>
  );
}
