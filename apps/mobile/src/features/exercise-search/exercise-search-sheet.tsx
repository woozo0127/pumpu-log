import { colors, Input, Text } from '@pumpu-log/ui-kit';
import { CirclePlus, Plus, Search, X } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';

interface ExerciseView {
  id: string;
  name: string;
  category: string;
}

export interface ExerciseSearchSheetContentProps {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  exercises: ExerciseView[];
  onSearchChange: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onAddExercise: (id: string) => void;
  onCustomExercise: () => void;
  onClose: () => void;
}

export function ExerciseSearchSheetContent({
  searchQuery,
  selectedCategory,
  categories,
  exercises,
  onSearchChange,
  onCategorySelect,
  onAddExercise,
  onCustomExercise,
  onClose,
}: ExerciseSearchSheetContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="bg-card rounded-t-lg flex-1">
        <View className="items-center pt-md pb-sm">
          <View className="w-10 h-1 rounded-sm bg-border-subtle" />
        </View>

        <View className="flex-row items-center justify-between px-2xl pb-md">
          <Text className="text-lg font-bold text-foreground">운동 추가</Text>
          <Pressable onPress={onClose}>
            <X size={20} color={colors['foreground-secondary']} />
          </Pressable>
        </View>

        <View className="px-2xl pb-md">
          <Input
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="검색"
            icon={<Search size={18} color={colors['foreground-secondary']} />}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2xl pb-md">
          <View className="flex-row gap-sm">
            {categories.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <Pressable
                  key={cat}
                  onPress={() => onCategorySelect(cat)}
                  className={`rounded-xl px-[14px] py-[6px] ${
                    isActive ? 'bg-lime' : 'bg-background border border-border'
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      isActive
                        ? 'font-semibold text-foreground-on-color'
                        : 'font-medium text-foreground-secondary'
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <ScrollView className="flex-1 px-2xl">
          {exercises.map((ex) => (
            <Pressable
              key={ex.id}
              onPress={() => onAddExercise(ex.id)}
              className="flex-row items-center gap-md py-[14px] border-b border-border"
            >
              <Text className="text-sm text-foreground flex-1">{ex.name}</Text>
              <Text className="text-[11px] text-foreground-tertiary">{ex.category}</Text>
              <Plus size={18} color={colors.lime.DEFAULT} />
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          onPress={onCustomExercise}
          className="flex-row items-center gap-[10px] px-2xl py-[14px] border-t border-border"
        >
          <CirclePlus size={20} color={colors.lime.DEFAULT} />
          <Text className="text-sm font-semibold text-lime">직접 운동 추가</Text>
        </Pressable>
      </View>
    </View>
  );
}
