import { Button, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SEED_PROGRAMS } from '~/shared/data/seed-programs';
import { useProgramStore } from '~/shared/stores/program-store';
import { OnboardingGuide } from './components/onboarding-guide';
import { PopularProgramItem } from './components/popular-program-item';

interface PopularProgramView {
  id: string;
  name: string;
  description: string;
}

export interface ProgramsEmptyScreenContentProps {
  popularPrograms: PopularProgramView[];
  onCreateProgram: () => void;
  onSelectPopular: (id: string) => void;
}

export function ProgramsEmptyScreenContent({
  popularPrograms,
  onCreateProgram,
  onSelectPopular,
}: ProgramsEmptyScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2xl p-2xl pt-xl">
      <Text variant="h2">프로그램</Text>

      <OnboardingGuide />

      <Button onPress={onCreateProgram}>
        <Text className="font-semibold text-foreground-on-color">프로그램 만들기</Text>
      </Button>

      <View className="gap-md">
        <SectionHeader title="인기 프로그램" />
        {popularPrograms.map((p, i) => (
          <PopularProgramItem
            key={p.id}
            rank={i + 1}
            name={p.name}
            description={p.description}
            onPress={() => onSelectPopular(p.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const POPULAR_DESCRIPTIONS: Record<string, string> = {
  'tpl-phul': '파워 + 근비대 균형 · 중급자 추천',
  'tpl-ppl': '볼륨 극대화 · 상급자 추천',
  'tpl-upper-lower': '심플한 분할 · 초급자 추천',
};

export function ProgramsEmptyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const setActiveProgram = useProgramStore((s) => s.setActiveProgram);
  const popularPrograms = SEED_PROGRAMS.filter((p) => p.isTemplate).map((p) => ({
    id: p.id,
    name: p.name,
    description: POPULAR_DESCRIPTIONS[p.id] ?? p.description,
  }));

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ProgramsEmptyScreenContent
        popularPrograms={popularPrograms}
        onCreateProgram={() => router.push('/create-program/name')}
        onSelectPopular={(id) => setActiveProgram(id)}
      />
    </View>
  );
}
