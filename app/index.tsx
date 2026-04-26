import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Redirect, router } from 'expo-router';
import { useContext } from 'react';
import { View } from 'react-native';
import { Button } from '#/components/ui/button';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';
import { OnboardedContext } from './_onboarded-context';

export default function Index() {
  const { onboarded, setOnboarded } = useContext(OnboardedContext);
  if (!onboarded) return <Redirect href="/onboarding" />;

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('pumpu-log:onboarded');
    } catch {
      // 무시. context 갱신만으로도 다음 진입에 onboarding이 다시 뜬다
    }
    setOnboarded(false);
    router.replace('/');
  };

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: theme.space.md,
          paddingHorizontal: 20,
        }}
      >
        <Text typography="title" color={palette.neutral[0]}>
          Pumpu Log · 홈 (준비 중)
        </Text>
        <Link href="/preview" style={{ color: palette.alpha['white-55'] }}>
          (개발) Preview 진열장
        </Link>
        {__DEV__ ? (
          <Button variant="outline" size="sm" onPress={resetOnboarding}>
            (개발) 온보딩 리셋
          </Button>
        ) : null}
      </View>
    </ScreenContainer>
  );
}
