import * as React from 'react';
import { Pressable, View } from 'react-native';
import { colors } from '~/lib/colors';
import { cn } from '~/lib/utils';
import { Text } from '../text';

export interface TabProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
  className?: string;
}

const Tab = React.forwardRef<React.ComponentRef<typeof View>, TabProps>(
  ({ icon, label, active = false, onPress, className }, ref) => {
    const color = active ? colors['foreground-on-color'] : colors['tab-inactive'];

    return (
      <Pressable
        ref={ref as React.Ref<View>}
        onPress={onPress}
        className={cn(
          'flex-1 h-full items-center justify-center gap-1 rounded-[26px]',
          active && 'bg-lime',
          className,
        )}
        style={
          active
            ? {
                shadowColor: '#a3e635',
                shadowOpacity: 0.25,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 2 },
                elevation: 8,
              }
            : undefined
        }
      >
        <View className="w-[18px] h-[18px] items-center justify-center">
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ color?: string; size?: number }>, {
                color,
                size: 18,
              })
            : icon}
        </View>
        <Text
          className={cn('text-[10px] tracking-[0.5px]', active ? 'font-semibold' : 'font-medium')}
          style={{ color }}
        >
          {label}
        </Text>
      </Pressable>
    );
  },
);

Tab.displayName = 'Tab';

export { Tab };
