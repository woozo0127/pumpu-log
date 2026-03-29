import { Button, colors, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { useRouter } from 'expo-router';
import { ChartNoAxesColumnIncreasing } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_BARS = [20, 35, 50, 40, 60, 45, 75];
const MOCK_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

export interface StatsEmptyScreenContentProps {
  onStartWorkout: () => void;
}

export function StatsEmptyScreenContent({ onStartWorkout }: StatsEmptyScreenContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="p-2xl pt-xl gap-xl opacity-30">
        <Text variant="h2">통계</Text>

        <View className="bg-card rounded-lg border border-border flex-row">
          <View className="flex-1 h-9 rounded-lg bg-lime items-center justify-center">
            <Text className="text-xs font-semibold text-foreground-on-color">1주</Text>
          </View>
          <View className="flex-1 h-9 rounded-lg items-center justify-center">
            <Text className="text-xs font-medium text-foreground-secondary">1개월</Text>
          </View>
          <View className="flex-1 h-9 rounded-lg items-center justify-center">
            <Text className="text-xs font-medium text-foreground-secondary">3개월</Text>
          </View>
          <View className="flex-1 h-9 rounded-lg items-center justify-center">
            <Text className="text-xs font-medium text-foreground-secondary">전체</Text>
          </View>
        </View>

        <View className="flex-row gap-[10px]">
          <View className="flex-1 bg-card rounded-lg border border-border p-[14px] gap-1">
            <Text className="text-2xl font-bold text-lime">12</Text>
            <Text className="text-[11px] text-foreground-tertiary">이번 주 운동</Text>
          </View>
          <View className="flex-1 bg-card rounded-lg border border-border p-[14px] gap-1">
            <Text className="text-2xl font-bold text-lime">32,840</Text>
            <Text className="text-[11px] text-foreground-tertiary">총 볼륨 (kg)</Text>
          </View>
        </View>

        <View className="gap-md">
          <SectionHeader title="주간 운동 빈도" />
          <View className="bg-card rounded-lg p-lg flex-row items-end justify-between h-[120px]">
            {MOCK_BARS.map((h, i) => (
              <View key={MOCK_LABELS[i]} className="items-center gap-1">
                <View
                  className={`w-7 rounded-t-sm ${i % 2 === 0 ? 'bg-lime' : 'bg-lime-dim'}`}
                  style={{ height: h }}
                />
                <Text className="text-[10px] text-foreground-tertiary">{MOCK_LABELS[i]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View
        className="absolute bottom-0 left-0 right-0 items-center justify-center gap-md px-2xl"
        style={{ top: 300 }}
      >
        <View className="w-16 h-16 rounded-full bg-lime-dim items-center justify-center">
          <ChartNoAxesColumnIncreasing size={28} color={colors.lime.DEFAULT} />
        </View>
        <Text className="text-md font-semibold text-foreground">운동을 시작하면</Text>
        <Text className="text-sm text-foreground-secondary text-center leading-relaxed w-60">
          {'나의 운동 통계를\n확인할 수 있어요'}
        </Text>
        <Button onPress={onStartWorkout}>
          <Text className="font-semibold text-foreground-on-color">운동 시작하기</Text>
        </Button>
      </View>
    </View>
  );
}

export function StatsEmptyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <StatsEmptyScreenContent onStartWorkout={() => router.push('/workout')} />
    </View>
  );
}
