import { Badge, colors, Text } from '@pumpu-log/ui-kit';
import { ChartNoAxesColumnIncreasing } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function StatsScreenContent() {
  return (
    <View className="flex-1 bg-background p-2xl pt-xl">
      <Text variant="h1">통계</Text>

      <View className="flex-1 items-center justify-center gap-lg">
        <View className="w-20 h-20 rounded-full bg-lime-dim items-center justify-center">
          <ChartNoAxesColumnIncreasing size={32} color={colors.lime.DEFAULT} />
        </View>
        <Text className="text-lg font-bold text-foreground">곧 만나요!</Text>
        <Text className="text-sm text-foreground-secondary text-center leading-relaxed w-[200px]">
          {'운동 통계 기능을\n준비하고 있어요'}
        </Text>
        <Badge size="sm">Coming Soon</Badge>
      </View>
    </View>
  );
}

export function StatsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <StatsScreenContent />
    </View>
  );
}
