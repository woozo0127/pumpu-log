import { Button, Text } from '@pumpu-log/ui-kit';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgramStore } from '~/shared/stores/program-store';
import { ActiveProgramCard } from './components/active-program-card';
import { OtherProgramCard } from './components/other-program-card';

interface DayView {
  name: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

interface ActiveProgramView {
  name: string;
  dayProgress: string;
  days: DayView[];
}

interface OtherProgramView {
  id: string;
  name: string;
  description: string;
}

export interface ProgramsScreenContentProps {
  activeProgram: ActiveProgramView;
  otherPrograms: OtherProgramView[];
  onProgramPress: (id: string) => void;
  onCreateProgram: () => void;
}

export function ProgramsScreenContent({
  activeProgram,
  otherPrograms,
  onProgramPress,
  onCreateProgram,
}: ProgramsScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-xl p-2xl pt-xl">
      <Text variant="h2">프로그램</Text>

      <View className="gap-md">
        <Text className="text-xs font-semibold text-lime tracking-[1px]">진행 중</Text>
        <ActiveProgramCard
          name={activeProgram.name}
          dayProgress={activeProgram.dayProgress}
          days={activeProgram.days}
        />
      </View>

      {otherPrograms.length > 0 && (
        <View className="gap-md">
          <Text className="text-xs font-semibold text-foreground-tertiary tracking-[1px]">
            다른 프로그램
          </Text>
          {otherPrograms.map((p) => (
            <OtherProgramCard
              key={p.id}
              name={p.name}
              description={p.description}
              onPress={() => onProgramPress(p.id)}
            />
          ))}
        </View>
      )}

      <Button variant="outline" onPress={onCreateProgram}>
        <Text className="font-semibold text-lime">새 프로그램 만들기</Text>
      </Button>
    </ScrollView>
  );
}

export function ProgramsScreen() {
  const insets = useSafeAreaInsets();
  const activeProgram = useProgramStore((s) => s.getActiveProgram());
  const currentDayIndex = useProgramStore((s) => s.currentDayIndex);
  const programs = useProgramStore((s) => s.programs);

  const activeProgramView = {
    name: activeProgram?.name ?? '',
    dayProgress: `${currentDayIndex + 1} / ${activeProgram?.routines.length ?? 0}`,
    days: (activeProgram?.routines ?? []).map((r, i) => ({
      name: r.name,
      isCompleted: i < currentDayIndex,
      isCurrent: i === currentDayIndex,
    })),
  };

  const otherPrograms = programs
    .filter((p) => p.id !== activeProgram?.id)
    .map((p) => ({
      id: p.id,
      name: p.name,
      description: `${p.daysPerWeek}일 프로그램`,
    }));

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ProgramsScreenContent
        activeProgram={activeProgramView}
        otherPrograms={otherPrograms}
        onProgramPress={() => {}}
        onCreateProgram={() => {}}
      />
    </View>
  );
}
