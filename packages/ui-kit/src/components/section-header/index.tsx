import * as React from 'react';
import { Pressable, View } from 'react-native';
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
      <View ref={ref} className={cn('flex-row items-center justify-between py-sm', className)}>
        <Text className="text-md font-semibold text-foreground">{title}</Text>
        {actionLabel && (
          <Pressable onPress={onAction}>
            <Text className="text-[13px] text-lime">{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
