import { SectionHeader } from '@pumpu-log/ui-kit';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getExerciseName } from '~/shared/data/exercise-names';
import { useProgramStore } from '~/shared/stores/program-store';
import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';
import { GreetingSection } from './components/greeting-section';
import { RecentWorkoutItem } from './components/recent-workout-item';
import { TodayWorkoutCard } from './components/today-workout-card';
import { useGreeting } from './hooks/use-greeting';

interface RecentSessionView {
  day: string;
  month: string;
  name: string;
  detail: string;
}

export interface HomeScreenContentProps {
  greeting: string;
  programName: string;
  routineName: string;
  dayProgress: string;
  exercises: string[];
  recentSessions: RecentSessionView[];
  onStartWorkout: () => void;
  onViewAllHistory: () => void;
}

export function HomeScreenContent({
  greeting,
  programName,
  routineName,
  dayProgress,
  exercises,
  recentSessions,
  onStartWorkout,
  onViewAllHistory,
}: HomeScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2xl p-2xl pt-xl">
      <GreetingSection greeting={greeting} subtitle="오늘도 펌핑할 준비 되셨나요?" />

      <View className="gap-md">
        <SectionHeader title="오늘의 운동" />
        <TodayWorkoutCard
          programName={programName}
          routineName={routineName}
          dayProgress={dayProgress}
          exercises={exercises}
          onStart={onStartWorkout}
        />
      </View>

      <View className="gap-md">
        <SectionHeader title="최근 운동" actionLabel="전체보기" onAction={onViewAllHistory} />
        {recentSessions.map((session) => (
          <RecentWorkoutItem
            key={`${session.month}-${session.day}-${session.name}`}
            day={session.day}
            month={session.month}
            name={session.name}
            detail={session.detail}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const greeting = useGreeting();
  const activeProgram = useProgramStore((s) => s.getActiveProgram());
  const currentRoutine = useProgramStore((s) => s.getCurrentRoutine());
  const currentDayIndex = useProgramStore((s) => s.currentDayIndex);
  const recentSessions = useWorkoutHistoryStore((s) => s.getRecentSessions(2));

  const routineExercises = currentRoutine?.exercises ?? [];
  const exerciseNames = routineExercises.slice(0, 2).map((e) => getExerciseName(e.exerciseId));
  if (routineExercises.length > 2) {
    exerciseNames.push(`외 ${routineExercises.length - 2}개`);
  }

  const dayProgress = `${currentDayIndex + 1} / ${activeProgram?.routines.length ?? 0}`;

  const recentSessionViews = recentSessions.map((s) => {
    const date = new Date(s.startedAt);
    return {
      day: String(date.getDate()),
      month: `${date.getMonth() + 1}월`,
      name: s.routineName ?? '운동',
      detail: `${s.programName ?? ''} · ${s.exercises.length}개 운동 · ${s.durationMinutes ?? 0}분`,
    };
  });

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HomeScreenContent
        greeting={greeting}
        programName={activeProgram?.name ?? ''}
        routineName={currentRoutine?.name ?? ''}
        dayProgress={dayProgress}
        exercises={exerciseNames}
        recentSessions={recentSessionViews}
        onStartWorkout={() => router.push('/workout')}
        onViewAllHistory={() => router.push('/(tabs)/history')}
      />
    </View>
  );
}
