import { Stack } from 'expo-router';
import { palette } from '#/components/ui/theme';

export default function PreviewLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.neutral[950] },
      }}
    />
  );
}
