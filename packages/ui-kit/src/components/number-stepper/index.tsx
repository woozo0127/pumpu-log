import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '~/lib/utils';
import { Plus, Minus } from '~/lib/icons';
import { Text } from '~/components/text';

export interface NumberStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const NumberStepper = React.forwardRef<React.ComponentRef<typeof View>, NumberStepperProps>(
  ({ value, onValueChange, min, max, step = 1, className }, ref) => {
  const isAtMin = min !== undefined && value <= min;
  const isAtMax = max !== undefined && value >= max;

  const decrement = () => {
    if (isAtMin) return;
    onValueChange(value - step);
  };

  const increment = () => {
    if (isAtMax) return;
    onValueChange(value + step);
  };

  return (
    <View ref={ref} className={cn('flex-row items-center gap-sm', className)}>
      <Pressable
        onPress={decrement}
        disabled={isAtMin}
        className={cn(
          'h-11 w-11 rounded-md bg-card border border-border items-center justify-center',
          isAtMin && 'opacity-50'
        )}
      >
        <Minus size={18} color="#f0f0f0" />
      </Pressable>

      <Text
        variant="h3"
        className="min-w-[60px] text-center font-semibold text-foreground"
      >
        {String(value)}
      </Text>

      <Pressable
        onPress={increment}
        disabled={isAtMax}
        className={cn(
          'h-11 w-11 rounded-md bg-card border border-border items-center justify-center',
          isAtMax && 'opacity-50'
        )}
      >
        <Plus size={18} color="#f0f0f0" />
      </Pressable>
    </View>
  );
});

NumberStepper.displayName = 'NumberStepper';

export { NumberStepper };
