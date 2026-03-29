import { ProgramsEmptyScreen } from '~/features/programs/programs-empty-screen';
import { ProgramsScreen } from '~/features/programs/programs-screen';
import { useProgramStore } from '~/shared/stores/program-store';

export default function ProgramsTab() {
  const hasActiveProgram = useProgramStore((s) => s.hasActiveProgram());

  if (!hasActiveProgram) {
    return <ProgramsEmptyScreen />;
  }

  return <ProgramsScreen />;
}
