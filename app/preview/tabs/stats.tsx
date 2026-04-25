import { View } from 'react-native';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette } from '#/components/ui/theme';

export default function TabsStats() {
  return (
    <ScreenContainer safeTop>
      <View style={{ paddingHorizontal: 20 }}>
        <Text typography="title" color={palette.neutral[0]}>
          통계
        </Text>
      </View>
    </ScreenContainer>
  );
}
