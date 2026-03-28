import * as React from 'react';
import { View } from 'react-native';
import { colors } from '~/lib/colors';
import { cn } from '~/lib/utils';

export interface TabBarProps {
  children: React.ReactNode;
  className?: string;
}

const TabBar = React.forwardRef<React.ComponentRef<typeof View>, TabBarProps>(
  ({ children, className }, _ref) => {
    return (
      <View className={cn('w-full items-center pb-sm', className)}>
        <View
          className="w-[280px] h-[62px] bg-card rounded-full flex-row items-center border border-border-subtle"
          style={{
            shadowColor: colors.lime.DEFAULT,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
          }}
        >
          {children}
        </View>
      </View>
    );
  },
);

TabBar.displayName = 'TabBar';

export { TabBar };
