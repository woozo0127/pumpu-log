import {
  fixedProgram,
  getDefaultRoutine,
  getRoutineById,
} from './fixed-program';

describe('fixed training program', () => {
  test('fixedProgram has Push/Pull/Legs routine ids in order', () => {
    expect(fixedProgram.routines.map((routine) => routine.id)).toEqual([
      'push-day',
      'pull-day',
      'legs-day',
    ]);
  });

  test('Push Day exercise defaults match Starter PPL contract', () => {
    expect(getRoutineById('push-day')?.exercises).toMatchObject([
      {
        exerciseId: 'bench-press',
        targetSets: 4,
        defaultWeight: 80,
        defaultReps: 6,
      },
      {
        exerciseId: 'incline-dumbbell-press',
        targetSets: 3,
        defaultWeight: 26,
        defaultReps: 10,
      },
      {
        exerciseId: 'shoulder-press',
        targetSets: 3,
        defaultWeight: 40,
        defaultReps: 8,
      },
    ]);
  });

  test('getRoutineById returns Push Day', () => {
    expect(getRoutineById('push-day')?.name).toBe('Push Day');
  });

  test('getRoutineById returns null for missing routine', () => {
    expect(getRoutineById('missing')).toBeNull();
  });

  test('getDefaultRoutine returns Push Day', () => {
    expect(getDefaultRoutine().name).toBe('Push Day');
  });

  test('fixedProgram runtime data is immutable', () => {
    expect(Object.isFrozen(fixedProgram)).toBe(true);
    expect(Object.isFrozen(fixedProgram.routines)).toBe(true);
    expect(Object.isFrozen(fixedProgram.routines[0])).toBe(true);
    expect(Object.isFrozen(fixedProgram.routines[0].exercises)).toBe(true);
    expect(Object.isFrozen(fixedProgram.routines[0].exercises[0])).toBe(true);
  });
});
