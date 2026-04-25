import { type ReactNode, useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';
import { palette, theme } from '#/components/ui/theme';

type FocusHandler = NonNullable<TextInputProps['onFocus']>;
type BlurHandler = NonNullable<TextInputProps['onBlur']>;

type InputProps = TextInputProps & {
  size?: 'default' | 'lg';
  invalid?: boolean;
  iconLeft?: ReactNode;
};

const HEIGHT: Record<NonNullable<InputProps['size']>, number> = {
  default: 44,
  lg: 54,
};

export function Input({
  size = 'default',
  invalid,
  iconLeft,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus: FocusHandler = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: BlurHandler = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const borderColor = invalid
    ? palette.red[400]
    : focused
      ? palette.lime[400]
      : palette.alpha['white-7'];

  return (
    <View
      style={[
        styles.wrap,
        {
          height: HEIGHT[size],
          borderColor,
        },
      ]}
    >
      {iconLeft ? <View style={styles.icon}>{iconLeft}</View> : null}
      <TextInput
        placeholderTextColor={palette.alpha['white-32']}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.field,
          { color: palette.neutral[0], fontSize: size === 'lg' ? 16 : 14 },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    backgroundColor: palette.neutral[900],
    borderWidth: 1,
    borderRadius: theme.radius.lg,
  },
  icon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    flex: 1,
    padding: 0,
  },
});
