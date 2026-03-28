import * as React from 'react';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { cn } from '~/lib/utils';
import { Check } from '~/lib/icons';

export interface CheckboxProps extends CheckboxPrimitive.RootProps {
  className?: string;
}

const Checkbox = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxProps>(
  ({ className, checked, disabled, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        checked={checked}
        disabled={disabled}
        className={cn(
          'h-6 w-6 rounded-[6px] items-center justify-center border-2 border-border bg-transparent',
          checked && 'bg-lime border-lime',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="items-center justify-center">
          <Check size={14} color="#0d1117" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
