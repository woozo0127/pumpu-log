import * as React from 'react';
import { Pressable, type PressableProps, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const iconButtonVariants = cva(
  'h-11 w-11 items-center justify-center rounded-md active:opacity-80',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border',
        accent: 'bg-lime',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface IconButtonProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const IconButton = React.forwardRef<React.ComponentRef<typeof View>, IconButtonProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref as React.Ref<View>}
        className={cn(iconButtonVariants({ variant }), className)}
        {...props}
      >
        {icon ?? children}
      </Pressable>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
