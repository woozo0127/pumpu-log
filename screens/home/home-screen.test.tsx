import { act, render, waitFor } from '@testing-library/react-native';
import { useEffect as mockUseEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActiveSessionProvider } from '#/domains/training';
import { trainingRepository } from '#/domains/training/storage';
import { HomeScreen } from './home-screen';

let capturedFocusCallback: (() => undefined | (() => void)) | undefined;

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useFocusEffect: jest.fn((callback) => {
    capturedFocusCallback = callback;
    mockUseEffect(() => callback(), [callback]);
  }),
}));

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
      <ActiveSessionProvider>
        <HomeScreen />
      </ActiveSessionProvider>
    </SafeAreaProvider>,
  );

describe('HomeScreen', () => {
  beforeEach(() => {
    capturedFocusCallback = undefined;
    jest.clearAllMocks();
    jest.mocked(trainingRepository.listSessions).mockResolvedValue([]);
  });

  test('renders today routine CTA', async () => {
    const { findByText, getByText } = renderScreen();
    expect(await findByText('오늘의 운동')).toBeTruthy();
    expect(getByText('Push Day')).toBeTruthy();
    expect(getByText('운동 시작')).toBeTruthy();
  });

  test('reloads sessions when the screen receives focus', async () => {
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
