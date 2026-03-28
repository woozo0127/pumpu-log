import { useProgramStore } from '~/shared/stores/program-store';
import { SEED_PROGRAMS } from '~/shared/data/seed-programs';

beforeEach(() => {
  useProgramStore.getState().reset();
});

describe('ProgramStore', () => {
  it('initializes with seed templates', () => {
    const { programs } = useProgramStore.getState();
    expect(programs).toHaveLength(SEED_PROGRAMS.length);
    expect(programs[0].isTemplate).toBe(true);
  });

  it('returns active program', () => {
    const store = useProgramStore.getState();
    expect(store.getActiveProgram()).toBeUndefined();

    store.setActiveProgram('tpl-phul');
    expect(useProgramStore.getState().getActiveProgram()?.name).toBe('PHUL');
  });

  it('returns current routine based on active program and day index', () => {
    const store = useProgramStore.getState();
    store.setActiveProgram('tpl-phul');
    store.setCurrentDayIndex(1);

    const routine = useProgramStore.getState().getCurrentRoutine();
    expect(routine?.name).toBe('Day 2 · 하체 파워');
  });

  it('returns hasActiveProgram correctly', () => {
    expect(useProgramStore.getState().hasActiveProgram()).toBe(false);
    useProgramStore.getState().setActiveProgram('tpl-phul');
    expect(useProgramStore.getState().hasActiveProgram()).toBe(true);
  });
});
