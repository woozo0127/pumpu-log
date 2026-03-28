import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';
import type { WorkoutSession } from '~/shared/types/workout';

const mockSession: WorkoutSession = {
  id: 'ws-1',
  programId: 'tpl-phul',
  routineId: 'phul-d1',
  routineName: '상체 파워',
  programName: 'PHUL',
  startedAt: '2026-03-20T09:00:00Z',
  completedAt: '2026-03-20T09:48:00Z',
  durationMinutes: 48,
  exercises: [
    {
      exerciseId: 'bench-press',
      sets: [
        { weight: 80, reps: 5, isCompleted: true },
        { weight: 80, reps: 5, isCompleted: true },
      ],
    },
  ],
};

const mockSession2: WorkoutSession = {
  id: 'ws-2',
  programId: 'tpl-phul',
  routineId: 'phul-d4',
  routineName: '하체 근비대',
  programName: 'PHUL',
  startedAt: '2026-03-18T10:00:00Z',
  completedAt: '2026-03-18T10:52:00Z',
  durationMinutes: 52,
  exercises: [
    {
      exerciseId: 'front-squat',
      sets: [{ weight: 60, reps: 10, isCompleted: true }],
    },
  ],
};

beforeEach(() => {
  useWorkoutHistoryStore.getState().reset();
});

describe('WorkoutHistoryStore', () => {
  it('starts with empty history', () => {
    expect(useWorkoutHistoryStore.getState().sessions).toHaveLength(0);
  });

  it('adds a session', () => {
    useWorkoutHistoryStore.getState().addSession(mockSession);
    expect(useWorkoutHistoryStore.getState().sessions).toHaveLength(1);
  });

  it('returns recent sessions sorted by date descending', () => {
    const store = useWorkoutHistoryStore.getState();
    store.addSession(mockSession2);
    store.addSession(mockSession);

    const recent = useWorkoutHistoryStore.getState().getRecentSessions(2);
    expect(recent[0].id).toBe('ws-1');
    expect(recent[1].id).toBe('ws-2');
  });

  it('returns exercise count for a session', () => {
    useWorkoutHistoryStore.getState().addSession(mockSession);
    expect(useWorkoutHistoryStore.getState().sessions[0].exercises).toHaveLength(1);
  });
});
