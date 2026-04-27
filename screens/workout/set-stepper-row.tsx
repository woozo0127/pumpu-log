import { View } from 'react-native';
import { palette, Stepper, Text, theme } from '#/components/ui';

type SetStepperRowProps = {
  label: string;
  value: number;
  unit: string;
  step: number;
  onChange: (value: number) => void;
};

export function SetStepperRow({
  label,
  value,
  unit,
  step,
  onChange,
}: SetStepperRowProps) {
  return (
    <View style={{ gap: theme.space.sm }}>
      <Text typography="label" color={palette.alpha['white-55']}>
        {label}
      </Text>
      <Stepper
        value={value}
        unit={unit}
        step={step}
        min={0}
        onChange={onChange}
      />
    </View>
  );
}
