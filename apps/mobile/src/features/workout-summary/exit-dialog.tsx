import { Button, Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';

export interface ExitDialogContentProps {
  onContinue: () => void;
  onExit: () => void;
}

export function ExitDialogContent({ onContinue, onExit }: ExitDialogContentProps) {
  return (
    <View className="flex-1 bg-black/50 items-center justify-center px-3xl">
      <View className="bg-card rounded-lg border border-border gap-lg p-2xl w-full">
        <Text className="text-lg font-bold text-foreground">운동을 중단할까요?</Text>
        <Text className="text-sm text-foreground-secondary leading-relaxed">
          {'지금 중단하면 현재까지의\n기록은 저장됩니다.'}
        </Text>
        <View className="gap-md">
          <Button variant="outline" onPress={onContinue}>
            <Text className="font-semibold text-lime">계속하기</Text>
          </Button>
          <Button variant="destructive" onPress={onExit}>
            <Text className="font-semibold text-foreground">중단</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
