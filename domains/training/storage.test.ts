import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WorkoutSession } from './model';
import {
  createAsyncStorageTrainingRepository,
  TRAINING_SESSIONS_KEY,
} from './storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const session = (id: string, finishedAt: string): WorkoutSession => ({
  id,
  programId: 'starter-ppl',
  programName: 'Starter PPL',
  routineId: 'push-day',
  routineName: 'Push Day',
  startedAt: '2026-04-26T10:00:00.000Z',
  finishedAt,
  sets: [],
});

describe('AsyncStorage training repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('listSessions returns empty array for missing key', async () => {
    jest.mocked(AsyncStorage.getItem).mockResolvedValue(null);
    const repo = createAsyncStorageTrainingRepository();
    await expect(repo.listSessions()).resolves.toEqual([]);
  });

  test('saveSession prepends session and persists JSON', async () => {
    jest
      .mocked(AsyncStorage.getItem)
      .mockResolvedValue(
        JSON.stringify([session('old', '2026-04-20T10:00:00.000Z')]),
      );
    const repo = createAsyncStorageTrainingRepository();
    await repo.saveSession(session('new', '2026-04-26T10:00:00.000Z'));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      TRAINING_SESSIONS_KEY,
      JSON.stringify([
        session('new', '2026-04-26T10:00:00.000Z'),
        session('old', '2026-04-20T10:00:00.000Z'),
      ]),
    );
  });

  test('saveSession replaces existing session with same id', async () => {
    jest
      .mocked(AsyncStorage.getItem)
      .mockResolvedValue(
        JSON.stringify([session('same', '2026-04-20T10:00:00.000Z')]),
      );
    const repo = createAsyncStorageTrainingRepository();
    await repo.saveSession(session('same', '2026-04-26T10:00:00.000Z'));

    expect(
      JSON.parse(jest.mocked(AsyncStorage.setItem).mock.calls[0][1]),
    ).toHaveLength(1);
  });

  test('getSession returns matching session', async () => {
    jest
      .mocked(AsyncStorage.getItem)
      .mockResolvedValue(
        JSON.stringify([session('a', '2026-04-26T10:00:00.000Z')]),
      );
    const repo = createAsyncStorageTrainingRepository();
    await expect(repo.getSession('a')).resolves.toEqual(
      session('a', '2026-04-26T10:00:00.000Z'),
    );
  });

  test('clearSessions removes storage key', async () => {
    const repo = createAsyncStorageTrainingRepository();
    await repo.clearSessions();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(TRAINING_SESSIONS_KEY);
  });

  test('malformed JSON throws readable error without overwriting data', async () => {
    jest.mocked(AsyncStorage.getItem).mockResolvedValue('{bad json');
    const repo = createAsyncStorageTrainingRepository();
    await expect(repo.listSessions()).rejects.toThrow(
      'Stored workout sessions are unreadable',
    );
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });
});
