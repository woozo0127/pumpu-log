import { Button, colors, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_DAYS = [
  { day: 17, hasWorkout: false },
  { day: 18, hasWorkout: true },
  { day: 19, hasWorkout: true },
  { day: 20, hasWorkout: true, isToday: true },
  { day: 21, hasWorkout: true },
  { day: 22, hasWorkout: false },
  { day: 23, hasWorkout: false },
];
const DAY_HEADERS = ['일', '월', '화', '수', '목', '금', '토'];

export interface HistoryEmptyScreenContentProps {
  onStartWorkout: () => void;
}

export function HistoryEmptyScreenContent({ onStartWorkout }: HistoryEmptyScreenContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="p-2xl pt-xl gap-xl opacity-30">
        <Text variant="h1">기록</Text>

        <View className="gap-md">
          <View className="flex-row items-center justify-between">
            <ChevronLeft size={20} color={colors['foreground-secondary']} />
            <Text className="text-md font-semibold text-foreground">2026년 3월</Text>
            <ChevronRight size={20} color={colors['foreground-secondary']} />
          </View>

          <View className="flex-row justify-between">
            {DAY_HEADERS.map((d) => (
              <View key={d} className="w-9 h-5 items-center justify-center">
                <Text className="text-xs text-foreground-tertiary">{d}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row justify-between">
            {MOCK_DAYS.map((cd) => (
              <View
                key={`day-${cd.day}`}
                className={`w-9 h-9 rounded-lg items-center justify-center ${
                  cd.hasWorkout && !cd.isToday ? 'bg-lime' : ''
                } ${cd.isToday ? 'bg-lime-dim border border-lime' : ''}`}
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
              </View>
            ))}
          </View>
        </View>

        <View className="gap-md">
          <SectionHeader title="3월 20일 (목)" />
          <View className="bg-card rounded-md flex-row items-center gap-[14px] p-[14px]">
            <View className="flex-1 gap-[2px]">
              <Text className="text-sm font-semibold text-foreground">하체 파워</Text>
              <Text className="text-xs text-foreground-secondary">
                PHUL Day 2 · 5개 운동 · 45분
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        className="absolute bottom-0 left-0 right-0 items-center justify-center gap-md px-2xl"
        style={{ top: 300 }}
      >
        <View className="w-16 h-16 rounded-full bg-lime-dim items-center justify-center">
          <TrendingUp size={28} color={colors.lime.DEFAULT} />
        </View>
        <Text className="text-md font-semibold text-foreground">첫 운동을 기록해보세요</Text>
        <Text className="text-sm text-foreground-secondary text-center leading-relaxed w-60">
          {'운동할수록 성장하는\n나의 기록을 확인할 수 있어요'}
        </Text>
        <Button onPress={onStartWorkout}>
          <Text className="font-semibold text-foreground-on-color">운동 시작하기</Text>
        </Button>
      </View>
    </View>
  );
}

export function HistoryEmptyScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HistoryEmptyScreenContent onStartWorkout={() => {}} />
    </View>
  );
}
