import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';
import { CheckCircle, AlertCircle, X } from '~/lib/icons';
import { Text } from '../text';

const toastVariants = cva(
  'w-[354px] flex-row items-center gap-md p-lg bg-card rounded-md border',
  {
    variants: {
      variant: {
        success: 'border-lime/20',
        error: 'border-destructive/20',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  className?: string;
  onClose?: () => void;
}

const Toast = React.forwardRef<React.ComponentRef<typeof View>, ToastProps>(
  ({ variant = 'success', title, description, className, onClose }, ref) => {
    return (
      <View ref={ref} className={cn(toastVariants({ variant }), className)}>
        <View className="shrink-0">
          {variant === 'success' ? (
            <CheckCircle size={20} className="text-lime" color="#84cc16" />
          ) : (
            <AlertCircle size={20} className="text-destructive" color="#ef4444" />
          )}
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-foreground">{title}</Text>
          {description ? (
            <Text className="text-xs text-foreground-secondary">{description}</Text>
          ) : null}
        </View>
        {onClose ? (
          <Pressable onPress={onClose} className="shrink-0 active:opacity-70">
            <X size={16} className="text-foreground-tertiary" color="#6b7280" />
          </Pressable>
        ) : null}
      </View>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };
