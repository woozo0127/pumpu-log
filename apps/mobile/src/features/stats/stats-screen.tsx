import { colors, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChartItem {
  label: string;
  value: number;
}

interface ExerciseStat {
  id: string;
  name: string;
  trend: string;
  detail: string;
}

export interface StatsScreenContentProps {
  selectedPeriod: string;
  periods: string[];
  weeklyCount: string;
  totalVolume: string;
  chartData: ChartItem[];
  exerciseStats: ExerciseStat[];
  onPeriodChange: (period: string) => void;
  onExercisePress: (id: string) => void;
}

export function StatsScreenContent({
  selectedPeriod,
  periods,
  weeklyCount,
  totalVolume,
  chartData,
  exerciseStats,
  onPeriodChange,
  onExercisePress,
}: StatsScreenContentProps) {
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-xl p-2xl pt-xl">
      <Text variant="h2">통계</Text>

      <View className="bg-card rounded-lg border border-border flex-row">
        {periods.map((p) => (
          <Pressable
            key={p}
            onPress={() => onPeriodChange(p)}
            className={`flex-1 h-9 rounded-lg items-center justify-center ${
              p === selectedPeriod ? 'bg-lime' : ''
            }`}
          >
            <Text
              className={`text-xs ${
                p === selectedPeriod
                  ? 'font-semibold text-foreground-on-color'
                  : 'font-medium text-foreground-secondary'
              }`}
            >
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row gap-[10px]">
        <View className="flex-1 bg-card rounded-lg border border-border p-[14px] gap-1">
          <Text className="text-2xl font-bold text-lime">{weeklyCount}</Text>
          <Text className="text-[11px] text-foreground-tertiary">이번 주 운동</Text>
        </View>
        <View className="flex-1 bg-card rounded-lg border border-border p-[14px] gap-1">
          <Text className="text-2xl font-bold text-lime">{totalVolume}</Text>
          <Text className="text-[11px] text-foreground-tertiary">총 볼륨 (kg)</Text>
        </View>
      </View>

      <View className="gap-md">
        <SectionHeader title="주간 운동 빈도" />
        <View className="bg-card rounded-lg p-lg flex-row items-end justify-between h-[120px]">
          {chartData.map((d) => {
            const barHeight = maxValue > 0 ? (d.value / maxValue) * 80 : 0;
            return (
              <View key={d.label} className="items-center gap-1">
                <View
                  className={`w-7 rounded-t-sm ${d.value > 0 ? 'bg-lime' : 'bg-lime-dim'}`}
                  style={{ height: Math.max(barHeight, 4) }}
                />
                <Text className="text-[10px] text-foreground-tertiary">{d.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View className="gap-md">
        <SectionHeader title="운동별 추이" actionLabel="전체보기" />
        {exerciseStats.map((ex) => (
          <Pressable
            key={ex.id}
            onPress={() => onExercisePress(ex.id)}
            className="bg-card rounded-lg flex-row items-center gap-[14px] p-[14px]"
          >
            <View className="w-10 h-10 rounded-lg bg-lime-dim items-center justify-center">
              <Text className="text-lime font-bold text-xs">↑</Text>
            </View>
            <View className="flex-1 gap-[2px]">
              <Text className="text-sm font-semibold text-foreground">{ex.name}</Text>
              <Text className="text-xs text-foreground-tertiary">
                {ex.detail} ({ex.trend})
              </Text>
            </View>
            <ChevronRight size={18} color={colors['foreground-tertiary']} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

export function StatsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <StatsScreenContent
        selectedPeriod="1주"
        periods={['1주', '1개월', '3개월', '전체']}
        weeklyCount="0"
        totalVolume="0"
        chartData={[
          { label: '월', value: 0 },
          { label: '화', value: 0 },
          { label: '수', value: 0 },
          { label: '목', value: 0 },
          { label: '금', value: 0 },
          { label: '토', value: 0 },
          { label: '일', value: 0 },
        ]}
        exerciseStats={[]}
        onPeriodChange={() => {}}
        onExercisePress={() => {}}
      />
    </View>
  );
}
