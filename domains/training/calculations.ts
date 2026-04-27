import type {
  SessionSummary,
  WeeklySummary,
  WorkoutSession,
  WorkoutSet,
} from './model';

const MILLISECONDS_PER_MINUTE = 60 * 1000;

export function calculateSetVolume(set: WorkoutSet): number {
  return set.completed ? set.weight * set.reps : 0;
}

export function calculateSessionVolume(session: WorkoutSession): number {
  return session.sets.reduce(
    (total, set) => total + calculateSetVolume(set),
    0,
  );
}

export function countCompletedSets(session: WorkoutSession): number {
  return session.sets.filter((set) => set.completed).length;
}

export function countExercises(session: WorkoutSession): number {
  return new Set(
    session.sets.filter((set) => set.completed).map((set) => set.exerciseId),
  ).size;
}

export function calculateDurationMinutes(session: WorkoutSession): number {
  const startedAt = new Date(session.startedAt).getTime();
  const finishedAt = new Date(session.finishedAt).getTime();

  if (!Number.isFinite(startedAt) || !Number.isFinite(finishedAt)) {
    return 0;
  }

  const elapsed = finishedAt - startedAt;

  if (elapsed < 0) {
    return 0;
  }

  return Math.round(elapsed / MILLISECONDS_PER_MINUTE);
}

export function summarizeSession(session: WorkoutSession): SessionSummary {
  return {
    id: session.id,
    routineName: session.routineName,
    finishedAt: session.finishedAt,
    volume: calculateSessionVolume(session),
    completedSets: countCompletedSets(session),
    exerciseCount: countExercises(session),
    durationMinutes: calculateDurationMinutes(session),
  };
}

export function calculateWeeklySummary(
  sessions: WorkoutSession[],
  now: Date,
): WeeklySummary {
  const weekStart = startOfLocalWeek(now);
  const nextWeekStart = new Date(weekStart);
  nextWeekStart.setDate(nextWeekStart.getDate() + 7);
  const sessionsThisWeek = sessions.filter((session) => {
    const finishedAt = new Date(session.finishedAt);

    return finishedAt >= weekStart && finishedAt < nextWeekStart;
  });

  return {
    workoutCount: sessionsThisWeek.length,
    totalVolume: sessionsThisWeek.reduce(
      (total, session) => total + calculateSessionVolume(session),
      0,
    ),
  };
}

export function calculateStreak(sessions: WorkoutSession[], now: Date): number {
  const sessionDates = new Set(
    sessions.map((session) => toLocalDateKey(new Date(session.finishedAt))),
  );
  const cursor = startOfLocalDay(now);
  let streak = 0;

  while (sessionDates.has(toLocalDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function startOfLocalWeek(date: Date): Date {
  const start = startOfLocalDay(date);
  const daysSinceMonday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - daysSinceMonday);

  return start;
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
