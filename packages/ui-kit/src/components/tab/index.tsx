import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../text';
import { cn } from '~/lib/utils';

export interface TabProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
  className?: string;
}

const Tab = React.forwardRef<React.ComponentRef<typeof View>, TabProps>(
  ({ icon, label, active = false, onPress, className }, ref) => {
    const color = active ? '#a3e635' : '#484f58';

    return (
      <Pressable
        ref={ref as React.Ref<View>}
        onPress={onPress}
        className={cn(
          'items-center justify-center gap-[2px] py-xs flex-1',
          className
        )}
      >
        <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ color?: string; size?: number }>, {
                color,
                size: 20,
              })
            : icon}
        </View>
        <Text
          className="text-xs font-medium"
          style={{ color }}
        >
          {label}
        </Text>
      </Pressable>
    );
  }
);

Tab.displayName = 'Tab';

export { Tab };
