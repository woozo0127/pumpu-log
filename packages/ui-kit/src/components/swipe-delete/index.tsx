import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Trash2 } from '~/lib/icons';
import { cn } from '~/lib/utils';

export interface DeleteRevealProps {
  onDelete?: () => void;
  children: React.ReactNode;
  className?: string;
  showDelete?: boolean;
}

const DeleteReveal = React.forwardRef<View, DeleteRevealProps>(
  ({ onDelete, children, className, showDelete = false }, ref) => {
    return (
      <View ref={ref} className={cn('relative overflow-hidden rounded-md min-h-[56px]', className)}>
        <View className="w-full">{children}</View>
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
  },
);

DeleteReveal.displayName = 'DeleteReveal';

/** @deprecated Use DeleteReveal instead */
const SwipeDelete = DeleteReveal;

export { DeleteReveal, SwipeDelete };
