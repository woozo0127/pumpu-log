import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ActiveSessionProvider,
  useActiveSession,
} from '#/domains/training/active-session-context';
import { getDefaultRoutine } from '#/domains/training/fixed-program';
import { trainingRepository } from '#/domains/training/storage';
import { FinishScreen } from './finish-screen';

jest.mock('expo-router', () => ({
  Redirect: ({ href }: { href: string }) => `Redirect:${href}`,
  router: { replace: jest.fn() },
}));

jest.mock('#/domains/training/storage', () => ({
  trainingRepository: {
    saveSession: jest.fn().mockRejectedValue(new Error('disk full')),
  },
}));

function StartCompletedDraft() {
  const { startRoutine, completeSet } = useActiveSession();

  useEffect(() => {
    startRoutine(getDefaultRoutine(), new Date('2026-04-26T10:00:00.000Z'));
  }, [startRoutine]);

  useEffect(() => {
    completeSet(
      'push-day-bench-press-set-1',
      new Date('2026-04-26T10:05:00.000Z'),
    );
  }, [completeSet]);

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
        <StartCompletedDraft />
        <FinishScreen />
      </ActiveSessionProvider>
    </SafeAreaProvider>,
  );

describe('FinishScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(trainingRepository.saveSession)
      .mockRejectedValue(new Error('disk full'));
  });

  test('saves the completed session and returns home', async () => {
    jest
      .mocked(trainingRepository.saveSession)
      .mockResolvedValueOnce(undefined);
    const { findByText } = renderScreen();

    const saveButton = await findByText('저장하고 완료');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(trainingRepository.saveSession).toHaveBeenCalledTimes(1);
      expect(trainingRepository.saveSession).toHaveBeenCalledWith(
        expect.objectContaining({
          routineName: 'Push Day',
        }),
      );
      expect(router.replace).toHaveBeenCalledWith('/(tabs)/home');
    });
  });

  test('keeps draft and shows an error when saving fails', async () => {
    const { findByText, getByText } = renderScreen();

    const saveButton = await findByText('저장하고 완료');
    fireEvent.press(saveButton);

    expect(
      await findByText('저장에 실패했어요. 다시 시도해주세요.'),
    ).toBeTruthy();
    expect(getByText('저장하고 완료')).toBeTruthy();
    await waitFor(() => {
      expect(router.replace).not.toHaveBeenCalled();
    });
  });
});
