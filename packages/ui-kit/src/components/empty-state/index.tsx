import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '../text';
import { Button } from '../button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = React.forwardRef<View, EmptyStateProps>(
  ({ icon, title, description, actionLabel, onAction, className }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('items-center justify-center p-2xl gap-lg', className)}
      >
        {icon && (
          <View className="w-16 h-16 items-center justify-center">
            {icon}
          </View>
        )}
        <Text className="text-lg font-semibold text-foreground text-center">
          {title}
        </Text>
        {description && (
          <Text className="text-sm text-foreground-secondary text-center max-w-[280px]">
            {description}
          </Text>
        )}
        {actionLabel && onAction && (
          <Button variant="default" onPress={onAction}>
            <Text className="font-semibold text-foreground-on-color">
              {actionLabel}
            </Text>
          </Button>
        )}
      </View>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
