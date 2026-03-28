import * as React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '../text';

export interface BottomSheetProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const BottomSheet = React.forwardRef<React.ComponentRef<typeof View>, BottomSheetProps>(
  ({ open = false, onClose, title, children, className }, ref) => {
    if (!open) return null;

    return (
      <View className="absolute inset-0 bg-black/50 justify-end items-center">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View
          ref={ref}
          className={cn(
            'max-w-[402px] w-full bg-card rounded-t-md',
            className
          )}
        >
          {/* Drag handle */}
          <View className="w-10 h-1 bg-foreground-tertiary rounded-full mx-auto mt-sm mb-md" />

          {/* Header */}
          {title ? (
            <View className="px-lg pb-md">
              <Text className="text-lg font-semibold text-foreground">{title}</Text>
            </View>
          ) : null}

          {/* Content */}
          <ScrollView className="px-lg pb-lg" bounces={false}>
            {children}
          </ScrollView>
        </View>
      </View>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export { BottomSheet };
