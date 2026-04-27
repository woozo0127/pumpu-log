import { act, render, waitFor } from '@testing-library/react-native';
import { useEffect as mockUseEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { trainingRepository } from '#/domains/training/storage';
import { HistoryScreen } from './history-screen';

let capturedFocusCallback: (() => undefined | (() => void)) | undefined;

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useFocusEffect: jest.fn((callback) => {
    capturedFocusCallback = callback;
    mockUseEffect(() => callback(), [callback]);
  }),
}));

const savedSession = {
  id: 'session-1',
  programId: 'starter-ppl',
  programName: 'Starter PPL',
  routineId: 'push-day',
  routineName: 'Push Day',
  startedAt: '2026-04-26T10:00:00.000Z',
  finishedAt: '2026-04-26T10:30:00.000Z',
  sets: [
    {
      id: 'push-day-bench-press-set-1',
      exerciseId: 'bench-press',
      exerciseName: '벤치 프레스',
      order: 1,
      weight: 80,
      reps: 6,
      completed: true,
      completedAt: '2026-04-26T10:05:00.000Z',
    },
  ],
};

jest.mock('#/domains/training/storage', () => ({
  trainingRepository: {
    listSessions: jest.fn(),
  },
}));

const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, right: 0, bottom: 0, left: 0 },
      }}
    >
      <HistoryScreen />
    </SafeAreaProvider>,
  );

describe('HistoryScreen', () => {
  beforeEach(() => {
    capturedFocusCallback = undefined;
    jest.clearAllMocks();
    jest
      .mocked(trainingRepository.listSessions)
      .mockResolvedValue([savedSession]);
  });

  test('renders saved sessions with their volume', async () => {
    const { findByText } = renderScreen();

    expect(await findByText('Push Day')).toBeTruthy();
    expect(await findByText('480 kg')).toBeTruthy();
  });

  test('reloads saved sessions when the screen receives focus', async () => {
    renderScreen();

    await waitFor(() => {
      expect(trainingRepository.listSessions).toHaveBeenCalledTimes(1);
    });

    act(() => {
      capturedFocusCallback?.();
    });

    await waitFor(() => {
      expect(trainingRepository.listSessions).toHaveBeenCalledTimes(2);
    });
  });
});
