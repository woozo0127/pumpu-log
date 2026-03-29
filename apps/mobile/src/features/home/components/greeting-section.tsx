import { Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';

interface GreetingSectionProps {
  greeting: string;
  subtitle: string;
}

export function GreetingSection({ greeting, subtitle }: GreetingSectionProps) {
  return (
    <View className="gap-xs">
      <Text variant="h2">{greeting}</Text>
      <Text className="text-base text-foreground-secondary">{subtitle}</Text>
    </View>
  );
}
