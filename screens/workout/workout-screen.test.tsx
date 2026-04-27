import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ActiveSessionProvider,
  useActiveSession,
} from '#/domains/training/active-session-context';
import { getDefaultRoutine } from '#/domains/training/fixed-program';
import { WorkoutScreen } from './workout-screen';

jest.mock('expo-router', () => ({
  Redirect: ({ href }: { href: string }) => `Redirect:${href}`,
  router: { push: jest.fn(), replace: jest.fn() },
}));

function DraftStatus() {
  const { draft } = useActiveSession();
  return <RNText>{draft ? 'Draft active' : 'Draft cleared'}</RNText>;
}

function StartDraft() {
  const { startRoutine } = useActiveSession();
  useEffect(() => {
    startRoutine(getDefaultRoutine(), new Date('2026-04-26T10:00:00.000Z'));
  }, [startRoutine]);
  return null;
}

const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, right: 0, bottom: 0, left: 0 },
      }}
    >
      <ActiveSessionProvider>
        <StartDraft />
        <WorkoutScreen />
        <DraftStatus />
      </ActiveSessionProvider>
    </SafeAreaProvider>,
  );

describe('WorkoutScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('completes active set and updates progress', async () => {
    const { findByText, getByText } = renderScreen();
    expect(await findByText('벤치 프레스')).toBeTruthy();
    fireEvent.press(getByText('세트 완료'));
    expect(getByText('1 / 10 세트')).toBeTruthy();
  });

  test('clears active draft when exit is confirmed', async () => {
    const { UNSAFE_getAllByType, findByText, getByText } = renderScreen();
    expect(await findByText('Draft active')).toBeTruthy();

    fireEvent.press(UNSAFE_getAllByType(Pressable)[0]);
    expect(await findByText('운동을 종료할까요?')).toBeTruthy();

    fireEvent.press(getByText('종료'));

    expect(getByText('Draft cleared')).toBeTruthy();
    expect(router.replace).toHaveBeenCalledWith('/(tabs)/home');
  });

  test('replaces the workout route when finishing workout', async () => {
    const { findByText, getByText } = renderScreen();
    expect(await findByText('벤치 프레스')).toBeTruthy();

    for (let setIndex = 0; setIndex < 10; setIndex += 1) {
      fireEvent.press(getByText('세트 완료'));
    }
    fireEvent.press(getByText('운동 마치기'));

    expect(router.replace).toHaveBeenCalledWith('/finish');
    expect(router.push).not.toHaveBeenCalledWith('/finish');
  });
});
