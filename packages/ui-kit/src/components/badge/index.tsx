import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '../text';

const badgeVariants = cva('rounded-full font-semibold inline-flex items-center', {
  variants: {
    variant: {
      default: 'bg-lime-dim',
      secondary: 'bg-[#2e2308]',
      destructive: 'bg-[#2e0a0a]',
    },
    size: {
      default: 'px-md py-[6px]',
      sm: 'px-sm py-[3px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const badgeTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      default: 'text-lime',
      secondary: 'text-yellow',
      destructive: 'text-destructive',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

const Badge = React.forwardRef<React.ComponentRef<typeof View>, BadgeProps>(
  ({ className, variant, size, children }, ref) => {
    return (
      <View ref={ref} className={cn(badgeVariants({ variant, size }), className)}>
        <Text className={cn(badgeTextVariants({ variant, size }))}>{children}</Text>
      </View>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeTextVariants, badgeVariants };
