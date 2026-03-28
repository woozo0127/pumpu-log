import * as React from 'react';
import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const dotVariants = cva('rounded-full', {
  variants: {
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
    },
    color: {
      lime: 'bg-lime',
      destructive: 'bg-destructive',
      yellow: 'bg-yellow',
      'foreground-secondary': 'bg-foreground-secondary',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'lime',
  },
});

export interface DotProps extends VariantProps<typeof dotVariants> {
  className?: string;
}

const Dot = React.forwardRef<React.ComponentRef<typeof View>, DotProps>(
  ({ className, size, color }, ref) => {
    return (
      <View ref={ref} className={cn(dotVariants({ size, color }), className)} />
    );
  }
);

Dot.displayName = 'Dot';

export { Dot, dotVariants };
