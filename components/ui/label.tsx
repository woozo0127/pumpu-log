import type { ComponentProps } from 'react';
import { Text } from '#/components/ui/text';
import { palette } from '#/components/ui/theme';

type LabelProps = ComponentProps<typeof Text>;

export function Label({
  color = palette.alpha['white-55'],
  typography = 'label',
  ...rest
}: LabelProps) {
  return <Text typography={typography} color={color} {...rest} />;
}
