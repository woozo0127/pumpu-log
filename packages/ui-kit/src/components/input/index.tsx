import * as React from 'react';
import { TextInput, View } from 'react-native';
import { cn } from '~/lib/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
  icon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  ({ className, icon, error, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <View className="relative justify-center">
        {icon && (
          <View className="absolute left-3 z-10 items-center justify-center">
            {icon}
          </View>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor="#6b7280"
          className={cn(
            'h-12 rounded-md bg-input border border-border px-lg text-base text-foreground',
            focused && 'border-2 border-lime',
            error && 'border-destructive',
            icon && 'pl-12',
            className
          )}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
