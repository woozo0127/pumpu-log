import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '../text';

export interface StatusBarProps {
  /** Displayed time string. Defaults to "9:41" (design mock). */
  time?: string;
  className?: string;
}

const StatusBar = React.forwardRef<React.ComponentRef<typeof View>, StatusBarProps>(
  ({ time = '9:41', className }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('w-full h-11 flex-row items-center justify-between px-lg', className)}
      >
        <Text className="text-sm font-semibold text-foreground">{time}</Text>
        <View className="flex-row items-center gap-xs">
          <View className="w-[4px] h-[4px] rounded-full bg-foreground-secondary" />
          <View className="w-[4px] h-[4px] rounded-full bg-foreground-secondary" />
          <View className="w-[4px] h-[4px] rounded-full bg-foreground-secondary" />
        </View>
      </View>
    );
  },
);

StatusBar.displayName = 'StatusBar';

export { StatusBar };
