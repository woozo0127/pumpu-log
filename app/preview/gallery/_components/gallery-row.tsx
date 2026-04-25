import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type GalleryRowProps = {
  label: string;
  children: ReactNode;
};

export function GalleryRow({ label, children }: GalleryRowProps) {
  return (
    <View
      style={{
        gap: 8,
        padding: theme.space.md,
        backgroundColor: palette.neutral[900],
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: palette.alpha['white-7'],
      }}
    >
      <Text typography="label" color={palette.alpha['white-55']}>
        {label}
      </Text>
      <View>{children}</View>
    </View>
  );
}
