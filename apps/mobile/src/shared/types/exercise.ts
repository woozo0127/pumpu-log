export type ExerciseCategory = 'chest' | 'back' | 'shoulder' | 'legs' | 'arms' | 'core' | 'cardio';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  isCustom: boolean;
}
