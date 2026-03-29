import { Button, colors, Text } from '@pumpu-log/ui-kit';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExerciseItem } from './components/exercise-item';

interface ExerciseView {
  id: string;
  name: string;
  category: string;
}

export interface EditRoutineScreenContentProps {
  routineName: string;
  exercises: ExerciseView[];
  onNameChange: (value: string) => void;
  onBack: () => void;
  onSave: () => void;
  onRemoveExercise: (id: string) => void;
  onAddExercise: () => void;
}

export function EditRoutineScreenContent({
  routineName,
  exercises,
  onNameChange,
  onBack,
  onSave,
  onRemoveExercise,
  onAddExercise,
}: EditRoutineScreenContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-2xl">
        <Pressable onPress={onBack}>
          <ChevronLeft size={22} color={colors['foreground-secondary']} />
        </Pressable>
        <Text className="text-lg font-bold text-foreground">{routineName}</Text>
        <Pressable onPress={onSave}>
          <Text className="text-[15px] font-semibold text-lime">저장</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="gap-lg p-2xl pt-xl">
        <View className="gap-sm">
          <Text className="text-sm font-semibold text-foreground">루틴 이름</Text>
          <TextInput
            className="bg-background rounded-lg border border-lime p-[14px] px-lg text-sm text-foreground"
            value={routineName}
            onChangeText={onNameChange}
            placeholderTextColor={colors['foreground-secondary']}
          />
        </View>

        <Text className="text-sm font-semibold text-foreground">운동 종목</Text>

        <View className="gap-sm">
          {exercises.map((ex) => (
            <ExerciseItem
              key={ex.id}
              name={ex.name}
              category={ex.category}
              onRemove={() => onRemoveExercise(ex.id)}
            />
          ))}
        </View>

        <Button onPress={onAddExercise}>
          <Text className="font-semibold text-foreground-on-color">운동 추가</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

export function EditRoutineScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <EditRoutineScreenContent
        routineName=""
        exercises={[]}
        onNameChange={() => {}}
        onBack={() => {}}
        onSave={() => {}}
        onRemoveExercise={() => {}}
        onAddExercise={() => {}}
      />
    </View>
  );
}
