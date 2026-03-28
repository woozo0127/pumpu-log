export interface RoutineExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: number;
  restSeconds: number;
}

export interface Routine {
  id: string;
  name: string;
  dayIndex: number;
  exercises: RoutineExercise[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  routines: Routine[];
  isTemplate: boolean;
  createdAt: string;
}
