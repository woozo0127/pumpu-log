import { colors, Text } from '@pumpu-log/ui-kit';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface CustomExerciseFormContentProps {
  name: string;
  selectedCategory: string;
  categories: string[];
  onNameChange: (value: string) => void;
  onCategorySelect: (category: string) => void;
  onBack: () => void;
  onSave: () => void;
}

export function CustomExerciseFormContent({
  name,
  selectedCategory,
  categories,
  onNameChange,
  onCategorySelect,
  onBack,
  onSave,
}: CustomExerciseFormContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-2xl">
        <Pressable onPress={onBack}>
          <ChevronLeft size={22} color={colors['foreground-secondary']} />
        </Pressable>
        <Text className="text-lg font-bold text-foreground">운동 추가</Text>
        <Pressable onPress={onSave}>
          <Text className="text-[15px] font-semibold text-lime">저장</Text>
        </Pressable>
      </View>

      <View className="gap-2xl p-2xl">
        <View className="gap-sm">
          <Text className="text-sm font-semibold text-foreground">운동 이름</Text>
          <TextInput
            className="bg-background rounded-xl border border-lime p-[14px] px-lg text-sm text-foreground"
            value={name}
            onChangeText={onNameChange}
            placeholder="케이블 컬"
            placeholderTextColor={colors['foreground-secondary']}
          />
        </View>

        <View className="gap-sm">
          <Text className="text-sm font-semibold text-foreground">카테고리</Text>
          <View className="flex-row flex-wrap gap-sm">
            {categories.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <Pressable
                  key={cat}
                  onPress={() => onCategorySelect(cat)}
                  className={`flex-1 min-w-[30%] rounded-xl items-center justify-center py-[10px] ${
                    isActive ? 'bg-lime-dim border border-lime' : 'bg-card border border-border'
                  }`}
                >
                  <Text
                    className={`text-[13px] ${
                      isActive ? 'font-semibold text-lime' : 'text-foreground-secondary'
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

export function CustomExerciseFormScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <CustomExerciseFormContent
        name=""
        selectedCategory=""
        categories={['가슴', '등', '팔', '어깨', '하체', '코어']}
        onNameChange={() => {}}
        onCategorySelect={() => {}}
        onBack={() => {}}
        onSave={() => {}}
      />
    </View>
  );
}
