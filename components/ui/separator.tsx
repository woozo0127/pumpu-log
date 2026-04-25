import { View } from 'react-native';
import { palette } from '#/components/ui/theme';

type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical';
  inset?: number;
};

export function Separator({
  orientation = 'horizontal',
  inset = 0,
}: SeparatorProps) {
  if (orientation === 'horizontal') {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: palette.alpha['white-7'],
          marginLeft: inset,
        }}
      />
    );
  }
  return (
    <View
      style={{
        width: 1,
        backgroundColor: palette.alpha['white-7'],
        marginVertical: inset,
      }}
    />
  );
}
