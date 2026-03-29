import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

export interface TabBarProps {
  children: React.ReactNode;
  className?: string;
}

const TabBar = React.forwardRef<React.ComponentRef<typeof View>, TabBarProps>(
  ({ children, className }, _ref) => {
    return (
      <View className={cn('w-full items-center pt-[12px] pb-[21px]', className)}>
        <View className="w-[280px] h-[62px] bg-card rounded-[36px] flex-row items-center border border-border p-[2px] gap-[2px]">
          {children}
        </View>
      </View>
    );
  },
);

TabBar.displayName = 'TabBar';

export { TabBar };
