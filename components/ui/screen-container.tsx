import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '#/components/ui/theme';

type ScreenContainerProps = ViewProps & {
  safeTop?: boolean;
  header?: ReactNode;
};

export function ScreenContainer({
  safeTop,
  header,
  style,
  children,
  ...rest
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = safeTop && !header ? insets.top : 0;

  return (
    <View style={{ flex: 1, backgroundColor: palette.neutral[950] }}>
      <StatusBar style="light" />
      {header}
      <View style={[{ flex: 1, paddingTop }, style]} {...rest}>
        {children}
      </View>
    </View>
  );
}
