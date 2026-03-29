import { StatsEmptyScreen } from '~/features/stats/stats-empty-screen';
import { StatsScreen } from '~/features/stats/stats-screen';
import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';

export default function StatsTab() {
  const sessions = useWorkoutHistoryStore((s) => s.sessions);

  if (sessions.length === 0) {
    return <StatsEmptyScreen />;
  }

  return <StatsScreen />;
}
