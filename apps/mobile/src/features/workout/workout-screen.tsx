import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExerciseSection } from './components/exercise-section';
import { WorkoutFooter } from './components/workout-footer';
import { WorkoutHeader } from './components/workout-header';

interface SetView {
  weight: number;
  reps: number;
  isCompleted: boolean;
}

interface ExerciseView {
  name: string;
  previousRecord?: string;
  sets: SetView[];
}

export interface WorkoutScreenContentProps {
  routineName: string;
  elapsed: string;
  exercise: ExerciseView;
  currentExercise: number;
  totalExercises: number;
  onBack: () => void;
  onToggleSet: (index: number) => void;
  onWeightChange: (index: number, value: number) => void;
  onRepsChange: (index: number, value: number) => void;
  onAddSet: () => void;
  onNext: () => void;
  onShowExercises: () => void;
}

export function WorkoutScreenContent({
  routineName,
  elapsed,
  exercise,
  currentExercise,
  totalExercises,
  onBack,
  onToggleSet,
  onWeightChange,
  onRepsChange,
  onAddSet,
  onNext,
  onShowExercises,
}: WorkoutScreenContentProps) {
  return (
    <View className="flex-1 bg-background">
      <WorkoutHeader routineName={routineName} elapsed={elapsed} onBack={onBack} />
      <ScrollView className="flex-1" contentContainerClassName="gap-lg p-2xl pt-lg">
        <ExerciseSection
          name={exercise.name}
          previousRecord={exercise.previousRecord}
          sets={exercise.sets}
          onToggleSet={onToggleSet}
          onWeightChange={onWeightChange}
          onRepsChange={onRepsChange}
          onAddSet={onAddSet}
        />
      </ScrollView>
      <WorkoutFooter
        current={currentExercise}
        total={totalExercises}
        onNext={onNext}
        onShowExercises={onShowExercises}
      />
    </View>
  );
}

export function WorkoutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <WorkoutScreenContent
        routineName="하체 파워"
        elapsed="00:00"
        exercise={{
          name: '스쿼트',
          previousRecord: '80kg × 8',
          sets: [
            { weight: 80, reps: 8, isCompleted: false },
            { weight: 80, reps: 8, isCompleted: false },
            { weight: 80, reps: 8, isCompleted: false },
          ],
        }}
        currentExercise={1}
        totalExercises={5}
        onBack={() => {}}
        onToggleSet={() => {}}
        onWeightChange={() => {}}
        onRepsChange={() => {}}
        onAddSet={() => {}}
        onNext={() => {}}
        onShowExercises={() => {}}
      />
    </View>
  );
}
