import { colors, Text } from '@pumpu-log/ui-kit';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface CreateProgramNameContentProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onClose: () => void;
  onNext: () => void;
}

export function CreateProgramNameContent({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onClose,
  onNext,
}: CreateProgramNameContentProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-2xl">
        <Pressable onPress={onClose} testID="close-button">
          <X size={22} color={colors['foreground-secondary']} />
        </Pressable>
        <Text className="text-lg font-bold text-foreground">새 프로그램</Text>
        <Pressable onPress={onNext}>
          <Text className="text-[15px] font-semibold text-lime">다음</Text>
        </Pressable>
      </View>

      <View className="gap-2xl p-2xl">
        <View className="gap-sm">
          <Text className="text-sm font-semibold text-foreground">프로그램 이름</Text>
          <TextInput
            className="bg-background rounded-xl border border-lime p-[14px] px-lg text-sm text-foreground"
            value={name}
            onChangeText={onNameChange}
            placeholder="PHUL"
            placeholderTextColor={colors['foreground-secondary']}
          />
          <Text className="text-xs text-foreground-tertiary">예: PHUL, PPL, Upper/Lower 등</Text>
        </View>

        <View className="gap-sm">
          <Text className="text-sm font-semibold text-foreground">설명 (선택)</Text>
          <TextInput
            className="bg-background rounded-xl border border-border p-[14px] px-lg text-sm text-foreground"
            value={description}
            onChangeText={onDescriptionChange}
            placeholder="파워 + 근비대 4일 프로그램"
            placeholderTextColor={colors['foreground-tertiary']}
          />
        </View>
      </View>
    </View>
  );
}

export function CreateProgramNameScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <CreateProgramNameContent
        name=""
        description=""
        onNameChange={() => {}}
        onDescriptionChange={() => {}}
        onClose={() => router.back()}
        onNext={() => router.push('/create-program/days')}
      />
    </View>
  );
}
