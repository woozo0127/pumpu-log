import { HomeEmptyScreen } from '~/features/home/home-empty-screen';
import { HomeScreen } from '~/features/home/home-screen';
import { useProgramStore } from '~/shared/stores/program-store';

export default function HomeTab() {
  const hasActiveProgram = useProgramStore((s) => s.hasActiveProgram());

  if (!hasActiveProgram) {
    return <HomeEmptyScreen />;
  }

  return <HomeScreen />;
}
