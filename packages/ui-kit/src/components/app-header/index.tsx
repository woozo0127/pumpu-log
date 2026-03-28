import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../text';
import { cn } from '~/lib/utils';

export interface AppHeaderProps {
  title?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

const AppHeader = React.forwardRef<React.ComponentRef<typeof View>, AppHeaderProps>(
  ({ title, left, right, className }, ref) => {
    const renderTitle = () => {
      if (title === undefined) {
        return (
          <View className="flex-row">
            <Text className="text-lg font-bold text-foreground">펌푸</Text>
            <Text className="text-lg font-bold text-lime">로그</Text>
          </View>
        );
      }
      if (typeof title === 'string') {
        return (
          <Text className="text-lg font-bold text-foreground">{title}</Text>
        );
      }
      return title;
    };

    return (
      <View
        ref={ref}
        className={cn('w-full h-11 flex-row items-center justify-between px-lg', className)}
      >
        <View className="min-w-[44px]">{left}</View>
        <View className="flex-1 items-center">{renderTitle()}</View>
        <View className="min-w-[44px] items-end">{right}</View>
      </View>
    );
  }
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
