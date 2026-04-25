import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type GallerySectionProps = {
  title: string;
  children: ReactNode;
};

export function GallerySection({ title, children }: GallerySectionProps) {
  return (
    <View style={{ marginTop: theme.space['2xl'], gap: theme.space.lg }}>
      <Text typography="title" color={palette.neutral[0]}>
        {title}
      </Text>
      <View style={{ gap: theme.space.lg }}>{children}</View>
    </View>
  );
}
