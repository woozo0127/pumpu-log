import { Button, colors, Text } from '@pumpu-log/ui-kit';
import { TrendingUp } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_DAYS = [
  { label: '월', active: true },
  { label: '화', active: false },
  { label: '수', active: true },
  { label: '목', active: false },
  { label: '금', active: true },
  { label: '토', active: false },
  { label: '일', active: true },
];

const MOCK_BARS = [20, 35, 50, 40, 60, 45, 75];

export interface HistoryEmptyScreenContentProps {
  onStartWorkout: () => void;
}

export function HistoryEmptyScreenContent({ onStartWorkout }: HistoryEmptyScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2xl p-2xl pt-xl">
      <Text variant="h1">기록</Text>

      <View className="bg-card rounded-lg border border-border gap-lg p-xl opacity-60">
        <Text className="text-sm font-semibold text-foreground">운동하면 이렇게 채워져요</Text>

        <View className="flex-row justify-center gap-[6px]">
          {MOCK_DAYS.map((d) => (
            <View
              key={d.label}
              className={`w-9 h-9 rounded-lg items-center justify-center ${
                d.active ? 'bg-lime' : ''
              }`}
            >
              <Text
                className={`text-[11px] ${
                  d.active ? 'font-semibold text-foreground-on-color' : 'text-foreground-tertiary'
                }`}
              >
                {d.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-center items-end gap-sm h-[80px]">
          {MOCK_BARS.map((h, i) => (
            <View
              key={MOCK_DAYS[i].label}
              className={`w-7 rounded-t-sm ${i % 2 === 0 ? 'bg-lime' : 'bg-lime-dim'}`}
              style={{ height: h }}
            />
          ))}
        </View>

        <Text className="text-xs text-foreground-tertiary text-center">주간 운동 볼륨 추이</Text>
      </View>

      <View className="items-center gap-md pt-xl">
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
    </ScrollView>
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
