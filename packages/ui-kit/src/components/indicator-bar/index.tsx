import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

const indicatorBarFillVariants = cva('h-full rounded-full', {
  variants: {
    color: {
      lime: 'bg-lime',
      destructive: 'bg-destructive',
      yellow: 'bg-yellow',
    },
  },
  defaultVariants: {
    color: 'lime',
  },
});

export interface IndicatorBarProps extends VariantProps<typeof indicatorBarFillVariants> {
  value: number;
  max: number;
  className?: string;
}

const IndicatorBar = React.forwardRef<View, IndicatorBarProps>(
  ({ value, max, color, className }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = max > 0 ? (clampedValue / max) * 100 : 0;

    return (
      <View
        ref={ref}
        className={cn('h-1.5 w-full bg-border rounded-full overflow-hidden', className)}
      >
        <View
          className={cn(indicatorBarFillVariants({ color }))}
          style={{ width: `${percentage}%` }}
        />
      </View>
    );
  },
);

IndicatorBar.displayName = 'IndicatorBar';

export { IndicatorBar };
