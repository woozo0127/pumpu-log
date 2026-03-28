import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '~/lib/utils';
import { Trash2 } from '~/lib/icons';

export interface SwipeDeleteProps {
  onDelete?: () => void;
  children: React.ReactNode;
  className?: string;
  showDelete?: boolean;
}

const SwipeDelete = React.forwardRef<View, SwipeDeleteProps>(
  ({ onDelete, children, className, showDelete = false }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('relative overflow-hidden rounded-md min-h-[56px]', className)}
      >
        <View className="w-full">
          {children}
        </View>
        {showDelete && (
          <Pressable
            onPress={onDelete}
            className="absolute right-0 top-0 w-20 h-full bg-destructive items-center justify-center"
          >
            <Trash2 size={20} className="text-foreground" />
          </Pressable>
        )}
      </View>
    );
  }
);

SwipeDelete.displayName = 'SwipeDelete';

export { SwipeDelete };
