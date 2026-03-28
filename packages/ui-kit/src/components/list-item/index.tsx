import * as React from 'react';
import { Pressable, View, Text, type PressableProps } from 'react-native';
import { cn } from '~/lib/utils';
import { ChevronRight } from '~/lib/icons';

export interface ListItemProps extends Omit<PressableProps, 'children'> {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  className?: string;
}

const ListItem = React.forwardRef<
  React.ComponentRef<typeof View>,
  ListItemProps
>(({ icon, title, subtitle, rightElement, className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref as React.Ref<View>}
      className={cn(
        'flex-row items-center px-lg py-md gap-md rounded-md active:bg-card-hover',
        className
      )}
      {...props}
    >
      {icon != null && (
        <View className="w-11 h-11 rounded-md bg-card items-center justify-center">
          {icon}
        </View>
      )}
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{title}</Text>
        {subtitle != null && (
          <Text className="text-sm text-foreground-secondary">{subtitle}</Text>
        )}
      </View>
      {rightElement !== undefined ? (
        rightElement
      ) : (
        <ChevronRight size={20} color="#6b7280" />
      )}
    </Pressable>
  );
});

ListItem.displayName = 'ListItem';

export { ListItem };
