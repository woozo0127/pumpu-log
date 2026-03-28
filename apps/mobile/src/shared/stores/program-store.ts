import { create } from 'zustand';
import type { Program, Routine } from '~/shared/types/program';
import { SEED_PROGRAMS } from '~/shared/data/seed-programs';

interface ProgramState {
  programs: Program[];
  activeProgramId: string | undefined;
  currentDayIndex: number;
  setActiveProgram: (id: string) => void;
  setCurrentDayIndex: (index: number) => void;
  getActiveProgram: () => Program | undefined;
  getCurrentRoutine: () => Routine | undefined;
  hasActiveProgram: () => boolean;
  reset: () => void;
}

const initialState = {
  programs: [...SEED_PROGRAMS],
  activeProgramId: undefined as string | undefined,
  currentDayIndex: 0,
};

export const useProgramStore = create<ProgramState>((set, get) => ({
  ...initialState,
  setActiveProgram: (id) => set({ activeProgramId: id }),
  setCurrentDayIndex: (index) => set({ currentDayIndex: index }),
  getActiveProgram: () => {
    const { programs, activeProgramId } = get();
    return programs.find((p) => p.id === activeProgramId);
  },
  getCurrentRoutine: () => {
    const program = get().getActiveProgram();
    if (!program) return undefined;
    const { currentDayIndex } = get();
    return program.routines.find((r) => r.dayIndex === currentDayIndex);
  },
  hasActiveProgram: () => get().activeProgramId !== undefined,
  reset: () => set({ ...initialState, programs: [...SEED_PROGRAMS] }),
}));
