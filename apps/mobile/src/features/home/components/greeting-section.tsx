import { View } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';

interface GreetingSectionProps {
  greeting: string;
  subtitle: string;
}

export function GreetingSection({ greeting, subtitle }: GreetingSectionProps) {
  return (
    <View className="gap-xs">
      <Text variant="h1">{greeting}</Text>
      <Text variant="muted">{subtitle}</Text>
    </View>
  );
}
