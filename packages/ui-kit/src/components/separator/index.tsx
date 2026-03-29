import * as SeparatorPrimitive from '@rn-primitives/separator';
import * as React from 'react';
import { cn } from '~/lib/utils';

export interface SeparatorProps extends SeparatorPrimitive.RootProps {
  className?: string;
}

const Separator = React.forwardRef<SeparatorPrimitive.RootRef, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        orientation={orientation}
        className={cn(
          'bg-border',
          orientation === 'vertical' ? 'w-[1px] h-full' : 'h-[1px] w-full',
          className,
        )}
        {...props}
      />
    );
  },
);

Separator.displayName = 'Separator';

export { Separator };
