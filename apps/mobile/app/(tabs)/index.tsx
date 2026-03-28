import { useProgramStore } from '~/shared/stores/program-store';
import { HomeScreen } from '~/features/home/home-screen';
import { HomeEmptyScreen } from '~/features/home/home-empty-screen';

export default function HomeTab() {
  const hasActiveProgram = useProgramStore((s) => s.hasActiveProgram());

  if (!hasActiveProgram) {
    return <HomeEmptyScreen />;
  }

  return <HomeScreen />;
}
