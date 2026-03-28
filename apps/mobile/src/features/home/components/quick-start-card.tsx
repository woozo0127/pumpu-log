import { colors, Text } from '@pumpu-log/ui-kit';
import { Zap } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface QuickStartCardProps {
  onPress: () => void;
}

export function QuickStartCard({ onPress }: QuickStartCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-lg border border-border-subtle flex-row items-center justify-center gap-[14px] p-lg"
    >
      <Zap size={20} color={colors.yellow} />
      <Text className="text-[15px] font-semibold text-foreground">빠른 시작</Text>
      <Text className="text-xs text-foreground-secondary">운동 종목을 직접 골라 바로 기록</Text>
    </Pressable>
  );
}
