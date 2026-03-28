import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { cn } from '~/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-2xl font-extrabold text-foreground',
      h2: 'text-xl font-bold text-foreground',
      h3: 'text-lg font-semibold text-foreground',
      h4: 'text-md font-semibold text-foreground',
      p: 'text-base text-foreground leading-relaxed',
      large: 'text-md font-semibold text-foreground',
      small: 'text-sm font-medium text-foreground-secondary',
      muted: 'text-sm text-foreground-secondary',
      lead: 'text-lg text-foreground-secondary',
      inlineCode: 'text-sm font-mono bg-card rounded px-1',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export interface TextProps extends RNTextProps, VariantProps<typeof textVariants> {
  className?: string;
}

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, TextProps>(
  ({ className, variant, ...props }, ref) => {
    return <RNText ref={ref} className={cn(textVariants({ variant }), className)} {...props} />;
  },
);

Text.displayName = 'Text';

export { Text, textVariants };
