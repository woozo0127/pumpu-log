import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '~/lib/utils';

export interface CardProps extends ViewProps {
  className?: string;
}

const Card = React.forwardRef<React.ComponentRef<typeof View>, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'bg-card rounded-lg border border-border-subtle p-lg',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
