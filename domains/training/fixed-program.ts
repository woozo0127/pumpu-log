import type { Program, Routine } from './model';

export const STARTER_PROGRAM_ID = 'starter-ppl';

function deepFreeze<T extends object>(value: T): T {
  for (const child of Object.values(value)) {
    if (child && typeof child === 'object' && !Object.isFrozen(child)) {
      deepFreeze(child);
    }
  }

  return Object.freeze(value);
}

export const fixedProgram: Program = deepFreeze({
  id: STARTER_PROGRAM_ID,
  name: 'Starter PPL',
  description: '처음 시작하기 좋은 Push · Pull · Legs 기본 프로그램',
  routines: [
    {
      id: 'push-day',
      programId: STARTER_PROGRAM_ID,
      name: 'Push Day',
      subtitle: '가슴 · 어깨 · 삼두',
      exercises: [
        {
          id: 'push-bench-press',
          exerciseId: 'bench-press',
          name: '벤치 프레스',
          order: 1,
          targetSets: 4,
          defaultWeight: 80,
          defaultReps: 6,
        },
        {
          id: 'push-incline-dumbbell-press',
          exerciseId: 'incline-dumbbell-press',
          name: '인클라인 덤벨 프레스',
          order: 2,
          targetSets: 3,
          defaultWeight: 26,
          defaultReps: 10,
        },
        {
          id: 'push-shoulder-press',
          exerciseId: 'shoulder-press',
          name: '숄더 프레스',
          order: 3,
          targetSets: 3,
          defaultWeight: 40,
          defaultReps: 8,
        },
      ],
    },
    {
      id: 'pull-day',
      programId: STARTER_PROGRAM_ID,
      name: 'Pull Day',
      subtitle: '등 · 후면 어깨 · 이두',
      exercises: [
        {
          id: 'pull-deadlift',
          exerciseId: 'deadlift',
          name: '데드리프트',
          order: 1,
          targetSets: 3,
          defaultWeight: 120,
          defaultReps: 5,
        },
        {
          id: 'pull-row',
          exerciseId: 'barbell-row',
          name: '바벨 로우',
          order: 2,
          targetSets: 4,
          defaultWeight: 70,
          defaultReps: 8,
        },
      ],
    },
    {
      id: 'legs-day',
      programId: STARTER_PROGRAM_ID,
      name: 'Legs Day',
      subtitle: '하체 · 코어',
      exercises: [
        {
          id: 'legs-squat',
          exerciseId: 'squat',
          name: '스쿼트',
          order: 1,
          targetSets: 4,
          defaultWeight: 100,
          defaultReps: 6,
        },
        {
          id: 'legs-rdl',
          exerciseId: 'romanian-deadlift',
          name: '루마니안 데드리프트',
          order: 2,
          targetSets: 3,
          defaultWeight: 80,
          defaultReps: 8,
        },
      ],
    },
  ],
});

export function getRoutineById(routineId: string): Routine | null {
  return (
    fixedProgram.routines.find((routine) => routine.id === routineId) ?? null
  );
}

export function getDefaultRoutine(): Routine {
  return fixedProgram.routines[0];
}
