export interface WorkoutSet {
  weight: number;
  reps: number;
  isCompleted: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  programId?: string;
  routineId?: string;
  routineName?: string;
  programName?: string;
  startedAt: string;
  completedAt?: string;
  durationMinutes?: number;
  exercises: WorkoutExercise[];
}
