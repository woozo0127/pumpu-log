import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Routine, WorkoutSession, WorkoutSet } from './model';

export type ActiveWorkoutDraft = WorkoutSession & { finishedAt: '' };

type ActiveSessionProgress = {
  completed: number;
  total: number;
  percent: number;
};

type SetPatch = Partial<Pick<WorkoutSet, 'weight' | 'reps'>>;

type ActiveSessionContextValue = {
  draft: ActiveWorkoutDraft | null;
  progress: ActiveSessionProgress;
  canFinish: boolean;
  startRoutine: (routine: Routine, startedAt?: Date) => void;
  updateSet: (setId: string, patch: SetPatch) => void;
  completeSet: (setId: string, completedAt?: Date) => void;
  finalizeSession: (finishedAt?: Date) => WorkoutSession | null;
  clearDraft: () => void;
};

const ActiveSessionContext = createContext<ActiveSessionContextValue | null>(
  null,
);

function buildSets(routine: Routine): WorkoutSet[] {
  const sets: WorkoutSet[] = [];
  let order = 1;

  for (const exercise of routine.exercises) {
    for (let setIndex = 0; setIndex < exercise.targetSets; setIndex += 1) {
      sets.push({
        id: `${routine.id}-${exercise.exerciseId}-set-${order}`,
        exerciseId: exercise.exerciseId,
        exerciseName: exercise.name,
        order,
        weight: exercise.defaultWeight,
        reps: exercise.defaultReps,
        completed: false,
      });
      order += 1;
    }
  }

  return sets;
}

export function ActiveSessionProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ActiveWorkoutDraft | null>(null);

  const startRoutine = useCallback(
    (routine: Routine, startedAt = new Date()) => {
      setDraft({
        id: `session-${startedAt.getTime()}`,
        programId: routine.programId,
        programName: 'Starter PPL',
        routineId: routine.id,
        routineName: routine.name,
        startedAt: startedAt.toISOString(),
        finishedAt: '',
        sets: buildSets(routine),
      });
    },
    [],
  );

  const updateSet = useCallback((setId: string, patch: SetPatch) => {
    setDraft((current) => {
      if (!current) return current;

      return {
        ...current,
        sets: current.sets.map((set) =>
          set.id === setId ? { ...set, ...patch } : set,
        ),
      };
    });
  }, []);

  const completeSet = useCallback((setId: string, completedAt = new Date()) => {
    const completedAtIso = completedAt.toISOString();

    setDraft((current) => {
      if (!current) return current;

      return {
        ...current,
        sets: current.sets.map((set) =>
          set.id === setId
            ? { ...set, completed: true, completedAt: completedAtIso }
            : set,
        ),
      };
    });
  }, []);

  const finalizeSession = useCallback(
    (finishedAt = new Date()): WorkoutSession | null => {
      if (!draft) return null;

      return {
        ...draft,
        finishedAt: finishedAt.toISOString(),
      };
    },
    [draft],
  );

  const clearDraft = useCallback(() => {
    setDraft(null);
  }, []);

  const progress = useMemo<ActiveSessionProgress>(() => {
    const total = draft?.sets.length ?? 0;
    const completed = draft?.sets.filter((set) => set.completed).length ?? 0;

    return {
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [draft]);

  const value = useMemo<ActiveSessionContextValue>(
    () => ({
      draft,
      progress,
      canFinish: progress.completed > 0,
      startRoutine,
      updateSet,
      completeSet,
      finalizeSession,
      clearDraft,
    }),
    [
      draft,
      progress,
      startRoutine,
      updateSet,
      completeSet,
      finalizeSession,
      clearDraft,
    ],
  );

  return (
    <ActiveSessionContext.Provider value={value}>
      {children}
    </ActiveSessionContext.Provider>
  );
}

export function useActiveSession() {
  const context = useContext(ActiveSessionContext);

  if (!context) {
    throw new Error(
      'useActiveSession must be used within ActiveSessionProvider',
    );
  }

  return context;
}
