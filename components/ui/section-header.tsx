import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type SectionHeaderProps = {
  children: ReactNode;
  action?: ReactNode;
};

export function SectionHeader({ children, action }: SectionHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.space.md,
        paddingHorizontal: 4,
      }}
    >
      <Text typography="label" color={palette.alpha['white-55']}>
        {children}
      </Text>
      {action}
    </View>
  );
}
