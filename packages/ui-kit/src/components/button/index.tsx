import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicator, Pressable, type PressableProps, type View } from 'react-native';
import { cn } from '~/lib/utils';

const buttonVariants = cva('items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-lime active:bg-lime-active',
      secondary: 'bg-card border border-border active:bg-card-hover',
      destructive: 'bg-destructive active:opacity-80',
      outline: 'border border-border bg-transparent active:bg-card',
      ghost: 'bg-transparent active:bg-card',
    },
    size: {
      default: 'h-11 px-lg',
      sm: 'h-9 px-md',
      lg: 'h-[52px] px-xl',
      icon: 'h-11 w-11',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const buttonTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      default: 'text-foreground-on-color',
      secondary: 'text-foreground',
      destructive: 'text-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ButtonProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<React.ComponentRef<typeof View>, ButtonProps>(
  ({ className, variant, size, children, loading, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <Pressable
        ref={ref as React.Ref<View>}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size }), isDisabled && 'opacity-50', className)}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'default' || variant === undefined || variant === null
                ? '#0d1117'
                : '#f0f0f0'
            }
          />
        ) : (
          children
        )}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
