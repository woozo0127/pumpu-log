import type { Program } from '~/shared/types/program';

export const SEED_PROGRAMS: Program[] = [
  {
    id: 'tpl-phul',
    name: 'PHUL',
    description: '파워 + 근비대 · 주 4일',
    daysPerWeek: 4,
    isTemplate: true,
    createdAt: '2026-01-01T00:00:00Z',
    routines: [
      {
        id: 'phul-d1',
        name: 'Day 1 · 상체 파워',
        dayIndex: 0,
        exercises: [
          { exerciseId: 'bench-press', targetSets: 4, targetReps: 5, restSeconds: 180 },
          { exerciseId: 'overhead-press', targetSets: 3, targetReps: 6, restSeconds: 150 },
          { exerciseId: 'barbell-row', targetSets: 4, targetReps: 5, restSeconds: 180 },
        ],
      },
      {
        id: 'phul-d2',
        name: 'Day 2 · 하체 파워',
        dayIndex: 1,
        exercises: [
          { exerciseId: 'squat', targetSets: 4, targetReps: 5, restSeconds: 180 },
          { exerciseId: 'leg-press', targetSets: 3, targetReps: 8, restSeconds: 120 },
          { exerciseId: 'leg-curl', targetSets: 3, targetReps: 10, restSeconds: 90 },
        ],
      },
      {
        id: 'phul-d3',
        name: 'Day 3 · 상체 근비대',
        dayIndex: 2,
        exercises: [
          { exerciseId: 'incline-db-press', targetSets: 4, targetReps: 10, restSeconds: 90 },
          { exerciseId: 'cable-fly', targetSets: 3, targetReps: 12, restSeconds: 60 },
          { exerciseId: 'lat-pulldown', targetSets: 4, targetReps: 10, restSeconds: 90 },
        ],
      },
      {
        id: 'phul-d4',
        name: 'Day 4 · 하체 근비대',
        dayIndex: 3,
        exercises: [
          { exerciseId: 'front-squat', targetSets: 4, targetReps: 10, restSeconds: 120 },
          { exerciseId: 'romanian-deadlift', targetSets: 3, targetReps: 10, restSeconds: 90 },
          { exerciseId: 'calf-raise', targetSets: 4, targetReps: 15, restSeconds: 60 },
        ],
      },
    ],
  },
  {
    id: 'tpl-ppl',
    name: 'PPL',
    description: 'Push · Pull · Legs · 주 6일',
    daysPerWeek: 6,
    isTemplate: true,
    createdAt: '2026-01-01T00:00:00Z',
    routines: [
      {
        id: 'ppl-push',
        name: 'Push',
        dayIndex: 0,
        exercises: [
          { exerciseId: 'bench-press', targetSets: 4, targetReps: 8, restSeconds: 120 },
          { exerciseId: 'overhead-press', targetSets: 3, targetReps: 10, restSeconds: 90 },
          { exerciseId: 'cable-fly', targetSets: 3, targetReps: 12, restSeconds: 60 },
        ],
      },
      {
        id: 'ppl-pull',
        name: 'Pull',
        dayIndex: 1,
        exercises: [
          { exerciseId: 'barbell-row', targetSets: 4, targetReps: 8, restSeconds: 120 },
          { exerciseId: 'lat-pulldown', targetSets: 3, targetReps: 10, restSeconds: 90 },
          { exerciseId: 'face-pull', targetSets: 3, targetReps: 15, restSeconds: 60 },
        ],
      },
      {
        id: 'ppl-legs',
        name: 'Legs',
        dayIndex: 2,
        exercises: [
          { exerciseId: 'squat', targetSets: 4, targetReps: 8, restSeconds: 150 },
          { exerciseId: 'leg-press', targetSets: 3, targetReps: 10, restSeconds: 120 },
          { exerciseId: 'leg-curl', targetSets: 3, targetReps: 12, restSeconds: 90 },
        ],
      },
    ],
  },
  {
    id: 'tpl-upper-lower',
    name: 'Upper / Lower',
    description: '상체 · 하체 분할 · 주 4일',
    daysPerWeek: 4,
    isTemplate: true,
    createdAt: '2026-01-01T00:00:00Z',
    routines: [
      {
        id: 'ul-upper',
        name: 'Upper Body',
        dayIndex: 0,
        exercises: [
          { exerciseId: 'bench-press', targetSets: 4, targetReps: 8, restSeconds: 120 },
          { exerciseId: 'barbell-row', targetSets: 4, targetReps: 8, restSeconds: 120 },
          { exerciseId: 'overhead-press', targetSets: 3, targetReps: 10, restSeconds: 90 },
        ],
      },
      {
        id: 'ul-lower',
        name: 'Lower Body',
        dayIndex: 1,
        exercises: [
          { exerciseId: 'squat', targetSets: 4, targetReps: 8, restSeconds: 150 },
          { exerciseId: 'romanian-deadlift', targetSets: 3, targetReps: 10, restSeconds: 120 },
          { exerciseId: 'leg-press', targetSets: 3, targetReps: 12, restSeconds: 90 },
        ],
      },
    ],
  },
];
