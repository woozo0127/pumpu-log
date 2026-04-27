import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { palette } from '#/components/ui/theme';
import { ActiveSessionProvider } from '#/domains/training';
import { OnboardedContext } from './_onboarded-context';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('pumpu-log:onboarded')
      .then((v) => setOnboarded(v === '1'))
      .catch(() => setOnboarded(false))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <OnboardedContext.Provider value={{ onboarded, setOnboarded }}>
          <ActiveSessionProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: palette.neutral[950] },
              }}
            />
          </ActiveSessionProvider>
        </OnboardedContext.Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
