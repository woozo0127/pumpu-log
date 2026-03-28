import { Button, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgramStore } from '~/shared/stores/program-store';
import { GreetingSection } from './components/greeting-section';
import { ProgramTemplateCard } from './components/program-template-card';
import { QuickStartCard } from './components/quick-start-card';

interface TemplateView {
  id: string;
  badge: string;
  name: string;
  description: string;
}

export interface HomeEmptyScreenContentProps {
  greeting: string;
  templates: TemplateView[];
  onSelectTemplate: (id: string) => void;
  onCreateCustom: () => void;
  onQuickStart: () => void;
}

export function HomeEmptyScreenContent({
  greeting,
  templates,
  onSelectTemplate,
  onCreateCustom,
  onQuickStart,
}: HomeEmptyScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2xl p-2xl pt-xl">
      <GreetingSection greeting={greeting} subtitle="어떤 프로그램으로 시작할까요?" />

      <View className="gap-md">
        <SectionHeader title="추천 프로그램" />
        <View className="gap-[10px]">
          {templates.map((tpl) => (
            <ProgramTemplateCard
              key={tpl.id}
              badge={tpl.badge}
              name={tpl.name}
              description={tpl.description}
              onPress={() => onSelectTemplate(tpl.id)}
            />
          ))}
        </View>
      </View>

      <Button variant="outline" onPress={onCreateCustom}>
        <Text className="font-semibold text-lime">나만의 프로그램 만들기</Text>
      </Button>

      <View className="gap-md">
        <SectionHeader title="프로그램 없이 바로 시작" />
        <QuickStartCard onPress={onQuickStart} />
      </View>
    </ScrollView>
  );
}

function getDaysLabel(daysPerWeek: number): string {
  return `${daysPerWeek}D`;
}

export function HomeEmptyScreen() {
  const insets = useSafeAreaInsets();
  const programs = useProgramStore((s) => s.programs);
  const templates = programs
    .filter((p) => p.isTemplate)
    .map((p) => ({
      id: p.id,
      badge: getDaysLabel(p.daysPerWeek),
      name: p.name,
      description: p.description,
    }));

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HomeEmptyScreenContent
        greeting="반가워요!"
        templates={templates}
        onSelectTemplate={() => {}}
        onCreateCustom={() => {}}
        onQuickStart={() => {}}
      />
    </View>
  );
}
