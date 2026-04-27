export type Program = {
  id: string;
  name: string;
  description?: string;
  routines: Routine[];
};

export type Routine = {
  id: string;
  programId: string;
  name: string;
  subtitle: string;
  exercises: RoutineExercise[];
};

export type RoutineExercise = {
  id: string;
  exerciseId: string;
  name: string;
  order: number;
  targetSets: number;
  defaultWeight: number;
  defaultReps: number;
};

export type WorkoutSet = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  order: number;
  weight: number;
  reps: number;
  completed: boolean;
  completedAt?: string;
};

export type WorkoutSession = {
  id: string;
  programId: string;
  programName: string;
  routineId: string;
  routineName: string;
  startedAt: string;
  finishedAt: string;
  sets: WorkoutSet[];
  note?: string;
};

export type SessionSummary = {
  id: string;
  routineName: string;
  finishedAt: string;
  volume: number;
  completedSets: number;
  exerciseCount: number;
  durationMinutes: number;
};

export type WeeklySummary = {
  workoutCount: number;
  totalVolume: number;
};

export type TrainingRepository = {
  listSessions(): Promise<WorkoutSession[]>;
  getSession(id: string): Promise<WorkoutSession | null>;
  saveSession(session: WorkoutSession): Promise<void>;
  clearSessions(): Promise<void>;
};
