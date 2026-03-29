import { HistoryEmptyScreen } from '~/features/history/history-empty-screen';
import { HistoryScreen } from '~/features/history/history-screen';
import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';

export default function HistoryTab() {
  const sessions = useWorkoutHistoryStore((s) => s.sessions);

  if (sessions.length === 0) {
    return <HistoryEmptyScreen />;
  }

  return <HistoryScreen />;
}
