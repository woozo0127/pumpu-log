import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TrainingRepository, WorkoutSession } from './model';

export const TRAINING_SESSIONS_KEY = 'pumpu-log:workout-sessions:v1';

const sortSessionsNewestFirst = (
  sessions: WorkoutSession[],
): WorkoutSession[] =>
  [...sessions].sort(
    (left, right) =>
      new Date(right.finishedAt).getTime() -
      new Date(left.finishedAt).getTime(),
  );

const readSessions = async (): Promise<WorkoutSession[]> => {
  const storedSessions = await AsyncStorage.getItem(TRAINING_SESSIONS_KEY);

  if (storedSessions === null) {
    return [];
  }

  try {
    const sessions = JSON.parse(storedSessions);

    if (!Array.isArray(sessions)) {
      throw new Error('Stored workout sessions are unreadable');
    }

    return sortSessionsNewestFirst(sessions);
  } catch {
    throw new Error('Stored workout sessions are unreadable');
  }
};

export const createAsyncStorageTrainingRepository = (): TrainingRepository => ({
  async listSessions() {
    return readSessions();
  },

  async getSession(id: string) {
    const sessions = await readSessions();
    return sessions.find((session) => session.id === id) ?? null;
  },

  async saveSession(session: WorkoutSession) {
    const sessions = await readSessions();
    const nextSessions = sortSessionsNewestFirst([
      session,
      ...sessions.filter((storedSession) => storedSession.id !== session.id),
    ]);

    await AsyncStorage.setItem(
      TRAINING_SESSIONS_KEY,
      JSON.stringify(nextSessions),
    );
  },

  async clearSessions() {
    await AsyncStorage.removeItem(TRAINING_SESSIONS_KEY);
  },
});

export const trainingRepository = createAsyncStorageTrainingRepository();
