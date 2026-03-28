import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '../text';

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const SectionHeader = React.forwardRef<View, SectionHeaderProps>(
  ({ title, actionLabel, onAction, className }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('flex-row items-center justify-between py-sm', className)}
      >
        <Text className="text-base font-semibold text-foreground">
          {title}
        </Text>
        {actionLabel && (
          <Pressable onPress={onAction}>
            <Text className="text-sm text-lime font-medium">
              {actionLabel}
            </Text>
          </Pressable>
        )}
      </View>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
