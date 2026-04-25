import { View } from 'react-native';
import { palette } from '#/components/ui/theme';

type ProgressProps = {
  value: number;
  height?: number;
  color?: string;
  track?: string;
};

export function Progress({
  value,
  height = 4,
  color = palette.lime[400],
  track = palette.alpha['white-7'],
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: track,
        overflow: 'hidden',
      }}
    >
      <View
        style={{ width: `${clamped}%`, height: '100%', backgroundColor: color }}
      />
    </View>
  );
}
