import { View } from 'react-native';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette } from '#/components/ui/theme';

export default function TabsPrograms() {
  return (
    <ScreenContainer safeTop>
      <View style={{ paddingHorizontal: 20 }}>
        <Text typography="title" color={palette.neutral[0]}>
          프로그램
        </Text>
      </View>
    </ScreenContainer>
  );
}
