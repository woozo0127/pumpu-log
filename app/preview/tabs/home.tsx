import { View } from 'react-native';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette } from '#/components/ui/theme';

export default function TabsHome() {
  return (
    <ScreenContainer safeTop>
      <View style={{ paddingHorizontal: 20 }}>
        <Text typography="title" color={palette.neutral[0]}>
          홈
        </Text>
        <Text typography="body" color={palette.alpha['white-55']}>
          네이티브 탭바 데모 (iOS 26에서 Liquid Glass 자동 적용)
        </Text>
      </View>
    </ScreenContainer>
  );
}
