import {
  calculateDurationMinutes,
  calculateSessionVolume,
  calculateSetVolume,
  calculateStreak,
  calculateWeeklySummary,
  countCompletedSets,
  countExercises,
  summarizeSession,
} from './calculations';
import type { WorkoutSession } from './model';

const session = (overrides: Partial<WorkoutSession>): WorkoutSession => ({
  id: 'session-1',
  programId: 'starter-ppl',
  programName: 'Starter PPL',
  routineId: 'push-day',
  routineName: 'Push Day',
  startedAt: '2026-04-20T10:00:00.000Z',
  finishedAt: '2026-04-20T10:52:00.000Z',
  sets: [
    {
      id: 'set-1',
      exerciseId: 'bench-press',
      exerciseName: '벤치 프레스',
      order: 1,
      weight: 80,
      reps: 6,
      completed: true,
      completedAt: '2026-04-20T10:10:00.000Z',
    },
    {
      id: 'set-2',
      exerciseId: 'bench-press',
      exerciseName: '벤치 프레스',
      order: 2,
      weight: 80,
      reps: 6,
      completed: false,
    },
    {
      id: 'set-3',
      exerciseId: 'shoulder-press',
      exerciseName: '숄더 프레스',
      order: 1,
      weight: 40,
      reps: 8,
      completed: true,
      completedAt: '2026-04-20T10:25:00.000Z',
    },
  ],
  ...overrides,
});

describe('training calculations', () => {
  test('calculateSetVolume returns weight times reps for completed set', () => {
    expect(calculateSetVolume(session({}).sets[0])).toBe(480);
  });

  test('calculateSetVolume returns 0 for incomplete set', () => {
    expect(calculateSetVolume(session({}).sets[1])).toBe(0);
  });

  test('calculateSessionVolume sums only completed sets', () => {
    expect(calculateSessionVolume(session({}))).toBe(800);
  });

  test('countCompletedSets returns completed count', () => {
    expect(countCompletedSets(session({}))).toBe(2);
  });

  test('countExercises returns unique completed exercise count', () => {
    expect(countExercises(session({}))).toBe(2);
  });

  test('calculateDurationMinutes rounds elapsed minutes', () => {
    expect(calculateDurationMinutes(session({}))).toBe(52);
  });

  test('calculateDurationMinutes returns 0 for invalid dates', () => {
    expect(
      calculateDurationMinutes(
        session({
          startedAt: 'invalid-start',
          finishedAt: '2026-04-20T10:52:00.000Z',
        }),
      ),
    ).toBe(0);
  });

  test('calculateDurationMinutes returns 0 when finished before started', () => {
    expect(
      calculateDurationMinutes(
        session({
          startedAt: '2026-04-20T10:52:00.000Z',
          finishedAt: '2026-04-20T10:00:00.000Z',
        }),
      ),
    ).toBe(0);
  });

  test('summarizeSession builds display summary', () => {
    expect(summarizeSession(session({}))).toEqual({
      id: 'session-1',
      routineName: 'Push Day',
      finishedAt: '2026-04-20T10:52:00.000Z',
      volume: 800,
      completedSets: 2,
      exerciseCount: 2,
      durationMinutes: 52,
    });
  });

  test('calculateWeeklySummary uses local week starting Monday', () => {
    const sessions = [
      session({ id: 'a', finishedAt: '2026-04-20T10:00:00.000Z' }),
      session({ id: 'b', finishedAt: '2026-04-22T10:00:00.000Z' }),
      session({ id: 'old', finishedAt: '2026-04-12T10:00:00.000Z' }),
    ];
    expect(
      calculateWeeklySummary(sessions, new Date('2026-04-26T12:00:00.000Z')),
    ).toEqual({
      workoutCount: 2,
      totalVolume: 1600,
    });
  });

  test('calculateWeeklySummary excludes sessions at next Monday local midnight', () => {
    const nextMonday = new Date(2026, 3, 27, 0, 0, 0, 0);
    const sessions = [
      session({ id: 'included', finishedAt: '2026-04-26T10:00:00.000Z' }),
      session({ id: 'excluded', finishedAt: nextMonday.toISOString() }),
    ];

    expect(
      calculateWeeklySummary(sessions, new Date('2026-04-26T12:00:00.000Z')),
    ).toEqual({
      workoutCount: 1,
      totalVolume: 800,
    });
  });

  test('calculateStreak counts consecutive local dates with sessions', () => {
    const sessions = [
      session({ id: 'today', finishedAt: '2026-04-26T10:00:00.000Z' }),
      session({ id: 'yesterday', finishedAt: '2026-04-25T10:00:00.000Z' }),
      session({ id: 'two-days-ago', finishedAt: '2026-04-24T10:00:00.000Z' }),
      session({ id: 'gap', finishedAt: '2026-04-22T10:00:00.000Z' }),
    ];
    expect(
      calculateStreak(sessions, new Date('2026-04-26T12:00:00.000Z')),
    ).toBe(3);
  });

  test('calculateStreak returns 0 when latest workout was yesterday', () => {
    const sessions = [
      session({ id: 'yesterday', finishedAt: '2026-04-25T10:00:00.000Z' }),
      session({ id: 'two-days-ago', finishedAt: '2026-04-24T10:00:00.000Z' }),
    ];
    expect(
      calculateStreak(sessions, new Date('2026-04-26T12:00:00.000Z')),
    ).toBe(0);
  });
});
