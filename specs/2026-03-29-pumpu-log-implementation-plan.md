# Pumpu Log Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a workout logging Expo app with Home screen (data + empty/onboarding states), feature-based architecture, and Zustand stores — TDD throughout.

**Architecture:** Feature-based modules under `apps/mobile/src/features/`. Expo Router file-based routing in `app/`. Zustand stores in `shared/stores/` with MMKV persistence. All UI from `@pumpu-log/ui-kit`.

**Tech Stack:** Expo SDK 53, Expo Router v4, TypeScript strict, NativeWind v4, Zustand v5, react-native-mmkv, Jest + RNTL, Biome linter.

---

## File Structure

```
apps/mobile/
├── app/
│   ├── _layout.tsx                           # Root layout (providers)
│   └── (tabs)/
│       ├── _layout.tsx                       # Tab navigator layout
│       ├── index.tsx                         # Home tab (delegates to feature)
│       ├── programs.tsx                      # Programs tab (placeholder)
│       ├── history.tsx                       # History tab (placeholder)
│       └── stats.tsx                         # Stats tab (placeholder)
├── src/
│   ├── features/
│   │   └── home/
│   │       ├── components/
│   │       │   ├── greeting-section.tsx
│   │       │   ├── today-workout-card.tsx
│   │       │   ├── recent-workout-item.tsx
│   │       │   ├── program-template-card.tsx
│   │       │   └── quick-start-card.tsx
│   │       ├── hooks/
│   │       │   └── use-greeting.ts
│   │       ├── home-screen.tsx
│   │       ├── home-empty-screen.tsx
│   │       └── index.ts
│   ├── shared/
│   │   ├── stores/
│   │   │   ├── program-store.ts
│   │   │   └── workout-history-store.ts
│   │   ├── types/
│   │   │   ├── exercise.ts
│   │   │   ├── program.ts
│   │   │   └── workout.ts
│   │   ├── data/
│   │   │   └── seed-programs.ts
│   │   └── utils/
│   │       └── greeting.ts
│   └── test/
│       └── test-utils.tsx
├── __tests__/
│   ├── shared/
│   │   ├── stores/
│   │   │   ├── program-store.test.ts
│   │   │   └── workout-history-store.test.ts
│   │   └── utils/
│   │       └── greeting.test.ts
│   └── features/
│       └── home/
│           ├── home-screen.test.tsx
│           ├── home-empty-screen.test.tsx
│           ├── greeting-section.test.tsx
│           ├── today-workout-card.test.tsx
│           ├── recent-workout-item.test.tsx
│           ├── program-template-card.test.tsx
│           └── quick-start-card.test.tsx
├── app.json
├── babel.config.js
├── metro.config.js
├── nativewind-env.d.ts
├── global.css
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.ts
├── jest.setup.ts
└── package.json
```

---

## Task 1: Expo 프로젝트 초기 설정

**Files:**
- Create: `apps/mobile/package.json`
- Create: `apps/mobile/app.json`
- Create: `apps/mobile/tsconfig.json`
- Create: `apps/mobile/babel.config.js`
- Create: `apps/mobile/metro.config.js`
- Create: `apps/mobile/tailwind.config.ts`
- Create: `apps/mobile/global.css`
- Create: `apps/mobile/nativewind-env.d.ts`
- Create: `apps/mobile/app/_layout.tsx`
- Create: `apps/mobile/app/(tabs)/_layout.tsx`
- Create: `apps/mobile/app/(tabs)/index.tsx`
- Create: `apps/mobile/app/(tabs)/programs.tsx`
- Create: `apps/mobile/app/(tabs)/history.tsx`
- Create: `apps/mobile/app/(tabs)/stats.tsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@pumpu-log/mobile",
  "version": "0.0.1",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "ios": "expo run:ios",
    "android": "expo run:android",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "biome check .",
    "lint:fix": "biome check --fix ."
  },
  "dependencies": {
    "@pumpu-log/ui-kit": "workspace:*",
    "expo": "~53.0.0",
    "expo-router": "~5.0.0",
    "expo-status-bar": "~2.2.0",
    "expo-symbols": "~0.4.0",
    "lucide-react-native": "^0.577.0",
    "nativewind": "^4.2.3",
    "react": "^19.0.0",
    "react-native": "0.79.6",
    "react-native-gesture-handler": "~2.24.0",
    "react-native-reanimated": "~4.2.3",
    "react-native-safe-area-context": "~5.4.0",
    "react-native-screens": "~4.11.0",
    "react-native-svg": "^15.15.4",
    "react-native-mmkv": "^3.2.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.29.0",
    "@testing-library/react-native": "^13.2.0",
    "@testing-library/jest-native": "^5.4.3",
    "@types/react": "^19.2.14",
    "jest": "^30.0.0",
    "jest-expo": "~53.0.0",
    "react-test-renderer": "^19.0.0",
    "tailwindcss": "^3.4.19",
    "typescript": "^5.9.3"
  }
}
```

- [ ] **Step 2: Create app.json**

```json
{
  "expo": {
    "name": "Pumpu Log",
    "slug": "pumpu-log",
    "version": "0.0.1",
    "orientation": "portrait",
    "scheme": "pumpu-log",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "ios": {
      "bundleIdentifier": "com.pumpu.log",
      "supportsTablet": false
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "~/*": ["./src/*"],
      "@/*": ["./app/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts", "nativewind-env.d.ts"]
}
```

- [ ] **Step 4: Create babel.config.js**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

- [ ] **Step 5: Create metro.config.js**

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: './global.css' });
```

- [ ] **Step 6: Create tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui-kit/src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        card: {
          DEFAULT: '#161b22',
          hover: '#1c2333',
        },
        input: '#0d1117',
        border: {
          DEFAULT: '#21262d',
          subtle: '#30363d',
        },
        lime: {
          DEFAULT: '#a3e635',
          hover: '#bef264',
          active: '#8bc62e',
          dim: '#1a2e0a',
          disabled: '#3a4a1a',
        },
        destructive: '#ef4444',
        yellow: '#fbbf24',
        foreground: {
          DEFAULT: '#f0f0f0',
          secondary: '#8b949e',
          tertiary: '#6b7280',
          'on-color': '#0d1117',
        },
        'tab-inactive': '#484f58',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 7: Create global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Create nativewind-env.d.ts**

```ts
/// <reference types="nativewind/types" />
```

- [ ] **Step 9: Create app/_layout.tsx (root layout)**

```tsx
import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
```

- [ ] **Step 10: Create app/(tabs)/_layout.tsx (tab layout)**

```tsx
import { Tabs } from 'expo-router';
import { BarChart3, Dumbbell, History, Home } from 'lucide-react-native';
import { View } from 'react-native';
import { TabBar, Tab } from '@pumpu-log/ui-kit';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <View className="bg-background pb-2">
          <TabBar>
            <Tab
              icon={<Home />}
              label="홈"
              active={state.index === 0}
              onPress={() => navigation.navigate('index')}
            />
            <Tab
              icon={<Dumbbell />}
              label="프로그램"
              active={state.index === 1}
              onPress={() => navigation.navigate('programs')}
            />
            <Tab
              icon={<History />}
              label="기록"
              active={state.index === 2}
              onPress={() => navigation.navigate('history')}
            />
            <Tab
              icon={<BarChart3 />}
              label="통계"
              active={state.index === 3}
              onPress={() => navigation.navigate('stats')}
            />
          </TabBar>
        </View>
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="programs" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="stats" />
    </Tabs>
  );
}
```

- [ ] **Step 11: Create tab screen files**

`app/(tabs)/index.tsx`:
```tsx
import { HomeScreen } from '~/features/home';

export default function HomeTab() {
  return <HomeScreen />;
}
```

`app/(tabs)/programs.tsx`:
```tsx
import { View } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';

export default function ProgramsTab() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text variant="h3">프로그램</Text>
    </View>
  );
}
```

`app/(tabs)/history.tsx`:
```tsx
import { View } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';

export default function HistoryTab() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text variant="h3">기록</Text>
    </View>
  );
}
```

`app/(tabs)/stats.tsx`:
```tsx
import { View } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';

export default function StatsTab() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text variant="h3">통계</Text>
    </View>
  );
}
```

- [ ] **Step 12: Install dependencies and verify build**

```bash
cd apps/mobile && pnpm install
npx expo start --ios
```

- [ ] **Step 13: Commit**

```bash
git add apps/mobile/
git commit -m "feat: scaffold Expo app with tab navigation and NativeWind"
```

---

## Task 2: 테스트 환경 설정

**Files:**
- Create: `apps/mobile/jest.config.ts`
- Create: `apps/mobile/jest.setup.ts`
- Create: `apps/mobile/src/test/test-utils.tsx`

- [ ] **Step 1: Create jest.config.ts**

```ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  setupFilesAfterSetup: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|nativewind|react-native-css-interop|@pumpu-log/ui-kit|lucide-react-native|@rn-primitives/.*|react-native-reanimated|react-native-gesture-handler|react-native-mmkv|zustand)',
  ],
  moduleNameMapper: {
    '^~/(.*).js$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};

export default config;
```

- [ ] **Step 2: Create jest.setup.ts**

```ts
import '@testing-library/jest-native/extend-expect';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(),
    getAllKeys: jest.fn().mockReturnValue([]),
  })),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSegments: () => [],
  Link: 'Link',
}));
```

- [ ] **Step 3: Create test-utils.tsx**

```tsx
import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react-native';
export { customRender as render };
```

- [ ] **Step 4: Verify test setup with a smoke test**

Create `apps/mobile/__tests__/setup.test.ts`:
```ts
describe('test setup', () => {
  it('works', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `cd apps/mobile && pnpm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/jest.config.ts apps/mobile/jest.setup.ts apps/mobile/src/test/ apps/mobile/__tests__/
git commit -m "chore: configure Jest and React Native Testing Library"
```

---

## Task 3: 도메인 타입 정의

**Files:**
- Create: `apps/mobile/src/shared/types/exercise.ts`
- Create: `apps/mobile/src/shared/types/program.ts`
- Create: `apps/mobile/src/shared/types/workout.ts`

- [ ] **Step 1: Create exercise.ts**

```ts
export type ExerciseCategory =
  | 'chest'
  | 'back'
  | 'shoulder'
  | 'legs'
  | 'arms'
  | 'core'
  | 'cardio';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  isCustom: boolean;
}
```

- [ ] **Step 2: Create program.ts**

```ts
export interface RoutineExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: number;
  restSeconds: number;
}

export interface Routine {
  id: string;
  name: string;
  dayIndex: number;
  exercises: RoutineExercise[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  routines: Routine[];
  isTemplate: boolean;
  createdAt: string;
}
```

- [ ] **Step 3: Create workout.ts**

```ts
export interface WorkoutSet {
  weight: number;
  reps: number;
  isCompleted: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  programId?: string;
  routineId?: string;
  routineName?: string;
  programName?: string;
  startedAt: string;
  completedAt?: string;
  durationMinutes?: number;
  exercises: WorkoutExercise[];
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/mobile/src/shared/types/
git commit -m "feat: define domain types for exercise, program, and workout"
```

---

## Task 4: 시드 데이터 (추천 프로그램 템플릿)

**Files:**
- Create: `apps/mobile/src/shared/data/seed-programs.ts`

- [ ] **Step 1: Create seed-programs.ts**

```ts
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/mobile/src/shared/data/
git commit -m "feat: add seed program templates (PHUL, PPL, Upper/Lower)"
```

---

## Task 5: Zustand Stores (TDD)

**Files:**
- Create: `apps/mobile/src/shared/stores/program-store.ts`
- Create: `apps/mobile/src/shared/stores/workout-history-store.ts`
- Test: `apps/mobile/__tests__/shared/stores/program-store.test.ts`
- Test: `apps/mobile/__tests__/shared/stores/workout-history-store.test.ts`

- [ ] **Step 1: Write failing test for program-store**

```ts
// __tests__/shared/stores/program-store.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/mobile && pnpm test -- --testPathPattern=program-store`
Expected: FAIL — module not found

- [ ] **Step 3: Implement program-store**

```ts
// src/shared/stores/program-store.ts
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
  reset: () => set(initialState),
}));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/mobile && pnpm test -- --testPathPattern=program-store`
Expected: PASS

- [ ] **Step 5: Write failing test for workout-history-store**

```ts
// __tests__/shared/stores/workout-history-store.test.ts
import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';
import type { WorkoutSession } from '~/shared/types/workout';

const mockSession: WorkoutSession = {
  id: 'ws-1',
  programId: 'tpl-phul',
  routineId: 'phul-d1',
  routineName: '상체 파워',
  programName: 'PHUL',
  startedAt: '2026-03-20T09:00:00Z',
  completedAt: '2026-03-20T09:48:00Z',
  durationMinutes: 48,
  exercises: [
    {
      exerciseId: 'bench-press',
      sets: [
        { weight: 80, reps: 5, isCompleted: true },
        { weight: 80, reps: 5, isCompleted: true },
      ],
    },
  ],
};

const mockSession2: WorkoutSession = {
  id: 'ws-2',
  programId: 'tpl-phul',
  routineId: 'phul-d4',
  routineName: '하체 근비대',
  programName: 'PHUL',
  startedAt: '2026-03-18T10:00:00Z',
  completedAt: '2026-03-18T10:52:00Z',
  durationMinutes: 52,
  exercises: [
    {
      exerciseId: 'front-squat',
      sets: [{ weight: 60, reps: 10, isCompleted: true }],
    },
  ],
};

beforeEach(() => {
  useWorkoutHistoryStore.getState().reset();
});

describe('WorkoutHistoryStore', () => {
  it('starts with empty history', () => {
    expect(useWorkoutHistoryStore.getState().sessions).toHaveLength(0);
  });

  it('adds a session', () => {
    useWorkoutHistoryStore.getState().addSession(mockSession);
    expect(useWorkoutHistoryStore.getState().sessions).toHaveLength(1);
  });

  it('returns recent sessions sorted by date descending', () => {
    const store = useWorkoutHistoryStore.getState();
    store.addSession(mockSession2);
    store.addSession(mockSession);

    const recent = useWorkoutHistoryStore.getState().getRecentSessions(2);
    expect(recent[0].id).toBe('ws-1'); // March 20 first
    expect(recent[1].id).toBe('ws-2'); // March 18 second
  });

  it('returns exercise count for a session', () => {
    useWorkoutHistoryStore.getState().addSession(mockSession);
    expect(useWorkoutHistoryStore.getState().sessions[0].exercises).toHaveLength(1);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `cd apps/mobile && pnpm test -- --testPathPattern=workout-history`
Expected: FAIL

- [ ] **Step 7: Implement workout-history-store**

```ts
// src/shared/stores/workout-history-store.ts
import { create } from 'zustand';
import type { WorkoutSession } from '~/shared/types/workout';

interface WorkoutHistoryState {
  sessions: WorkoutSession[];
  addSession: (session: WorkoutSession) => void;
  getRecentSessions: (limit: number) => WorkoutSession[];
  reset: () => void;
}

export const useWorkoutHistoryStore = create<WorkoutHistoryState>((set, get) => ({
  sessions: [],
  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),
  getRecentSessions: (limit) => {
    return [...get().sessions]
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
      .slice(0, limit);
  },
  reset: () => set({ sessions: [] }),
}));
```

- [ ] **Step 8: Run all tests**

Run: `cd apps/mobile && pnpm test`
Expected: ALL PASS

- [ ] **Step 9: Commit**

```bash
git add apps/mobile/src/shared/stores/ apps/mobile/__tests__/shared/stores/
git commit -m "feat: add Zustand stores for programs and workout history (TDD)"
```

---

## Task 6: 인사말 유틸 (TDD)

**Files:**
- Create: `apps/mobile/src/shared/utils/greeting.ts`
- Test: `apps/mobile/__tests__/shared/utils/greeting.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// __tests__/shared/utils/greeting.test.ts
import { getGreeting } from '~/shared/utils/greeting';

describe('getGreeting', () => {
  it('returns morning greeting for 6-11', () => {
    expect(getGreeting(6)).toBe('좋은 아침이에요!');
    expect(getGreeting(11)).toBe('좋은 아침이에요!');
  });

  it('returns afternoon greeting for 12-17', () => {
    expect(getGreeting(12)).toBe('좋은 오후예요!');
    expect(getGreeting(17)).toBe('좋은 오후예요!');
  });

  it('returns evening greeting for 18-22', () => {
    expect(getGreeting(18)).toBe('좋은 저녁이에요!');
    expect(getGreeting(22)).toBe('좋은 저녁이에요!');
  });

  it('returns night greeting for 23-5', () => {
    expect(getGreeting(23)).toBe('늦은 밤이에요!');
    expect(getGreeting(3)).toBe('늦은 밤이에요!');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/mobile && pnpm test -- --testPathPattern=greeting`
Expected: FAIL

- [ ] **Step 3: Implement greeting.ts**

```ts
export function getGreeting(hour: number): string {
  if (hour >= 6 && hour <= 11) return '좋은 아침이에요!';
  if (hour >= 12 && hour <= 17) return '좋은 오후예요!';
  if (hour >= 18 && hour <= 22) return '좋은 저녁이에요!';
  return '늦은 밤이에요!';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/mobile && pnpm test -- --testPathPattern=greeting`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/src/shared/utils/ apps/mobile/__tests__/shared/utils/
git commit -m "feat: add time-based greeting utility (TDD)"
```

---

## Task 7: Home Feature — 컴포넌트 (TDD)

**Files:**
- Create: `apps/mobile/src/features/home/components/greeting-section.tsx`
- Create: `apps/mobile/src/features/home/components/today-workout-card.tsx`
- Create: `apps/mobile/src/features/home/components/recent-workout-item.tsx`
- Create: `apps/mobile/src/features/home/components/program-template-card.tsx`
- Create: `apps/mobile/src/features/home/components/quick-start-card.tsx`
- Create: `apps/mobile/src/features/home/hooks/use-greeting.ts`
- Test: `apps/mobile/__tests__/features/home/greeting-section.test.tsx`
- Test: `apps/mobile/__tests__/features/home/today-workout-card.test.tsx`
- Test: `apps/mobile/__tests__/features/home/recent-workout-item.test.tsx`
- Test: `apps/mobile/__tests__/features/home/program-template-card.test.tsx`
- Test: `apps/mobile/__tests__/features/home/quick-start-card.test.tsx`

### 7a: GreetingSection

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/features/home/greeting-section.test.tsx
import { render, screen } from '~/test/test-utils';
import { GreetingSection } from '~/features/home/components/greeting-section';

describe('GreetingSection', () => {
  it('renders greeting and subtitle', () => {
    render(<GreetingSection greeting="좋은 아침이에요!" subtitle="오늘도 펌핑할 준비 되셨나요?" />);
    expect(screen.getByText('좋은 아침이에요!')).toBeTruthy();
    expect(screen.getByText('오늘도 펌핑할 준비 되셨나요?')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test — verify FAIL**

- [ ] **Step 3: Implement**

```tsx
// src/features/home/components/greeting-section.tsx
import { View } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';

interface GreetingSectionProps {
  greeting: string;
  subtitle: string;
}

export function GreetingSection({ greeting, subtitle }: GreetingSectionProps) {
  return (
    <View className="gap-xs">
      <Text variant="h1">{greeting}</Text>
      <Text variant="muted">{subtitle}</Text>
    </View>
  );
}
```

- [ ] **Step 4: Run test — verify PASS**

### 7b: TodayWorkoutCard

- [ ] **Step 5: Write failing test**

```tsx
// __tests__/features/home/today-workout-card.test.tsx
import { render, screen, fireEvent } from '~/test/test-utils';
import { TodayWorkoutCard } from '~/features/home/components/today-workout-card';

const props = {
  programName: 'PHUL',
  routineName: 'Day 2 · 하체 파워',
  dayProgress: '2 / 4',
  exercises: ['스쿼트', '레그 프레스', '레그 컬 외 2개'],
  onStart: jest.fn(),
};

describe('TodayWorkoutCard', () => {
  it('renders program and routine info', () => {
    render(<TodayWorkoutCard {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('Day 2 · 하체 파워')).toBeTruthy();
    expect(screen.getByText('2 / 4')).toBeTruthy();
  });

  it('renders exercise list', () => {
    render(<TodayWorkoutCard {...props} />);
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('레그 프레스')).toBeTruthy();
    expect(screen.getByText('레그 컬 외 2개')).toBeTruthy();
  });

  it('calls onStart when button pressed', () => {
    render(<TodayWorkoutCard {...props} />);
    fireEvent.press(screen.getByText('운동 시작'));
    expect(props.onStart).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 6: Run test — verify FAIL**

- [ ] **Step 7: Implement**

```tsx
// src/features/home/components/today-workout-card.tsx
import { View } from 'react-native';
import { Badge, Button, Card, Dot, Text } from '@pumpu-log/ui-kit';

interface TodayWorkoutCardProps {
  programName: string;
  routineName: string;
  dayProgress: string;
  exercises: string[];
  onStart: () => void;
}

export function TodayWorkoutCard({
  programName,
  routineName,
  dayProgress,
  exercises,
  onStart,
}: TodayWorkoutCardProps) {
  return (
    <Card className="gap-lg">
      <View className="flex-row items-center justify-between">
        <View className="gap-xs flex-1">
          <Text className="text-sm font-semibold text-lime">{programName}</Text>
          <Text className="text-lg font-bold text-foreground">{routineName}</Text>
        </View>
        <Badge>{dayProgress}</Badge>
      </View>

      <View className="gap-sm">
        {exercises.map((exercise) => (
          <View key={exercise} className="flex-row items-center gap-[10px]">
            <Dot color="lime" size="md" />
            <Text variant="muted">{exercise}</Text>
          </View>
        ))}
      </View>

      <Button onPress={onStart}>
        <Text className="font-semibold text-foreground-on-color">운동 시작</Text>
      </Button>
    </Card>
  );
}
```

- [ ] **Step 8: Run test — verify PASS**

### 7c: RecentWorkoutItem

- [ ] **Step 9: Write failing test**

```tsx
// __tests__/features/home/recent-workout-item.test.tsx
import { render, screen } from '~/test/test-utils';
import { RecentWorkoutItem } from '~/features/home/components/recent-workout-item';

describe('RecentWorkoutItem', () => {
  it('renders date, name, and details', () => {
    render(
      <RecentWorkoutItem
        day="20"
        month="3월"
        name="상체 파워"
        detail="PHUL Day 1 · 5개 운동 · 48분"
      />,
    );
    expect(screen.getByText('20')).toBeTruthy();
    expect(screen.getByText('3월')).toBeTruthy();
    expect(screen.getByText('상체 파워')).toBeTruthy();
    expect(screen.getByText('PHUL Day 1 · 5개 운동 · 48분')).toBeTruthy();
  });
});
```

- [ ] **Step 10: Run test — verify FAIL**

- [ ] **Step 11: Implement**

```tsx
// src/features/home/components/recent-workout-item.tsx
import { View } from 'react-native';
import { Separator, Text } from '@pumpu-log/ui-kit';

interface RecentWorkoutItemProps {
  day: string;
  month: string;
  name: string;
  detail: string;
  onPress?: () => void;
}

export function RecentWorkoutItem({ day, month, name, detail }: RecentWorkoutItemProps) {
  return (
    <View className="bg-card rounded-lg flex-row items-center gap-[14px] p-[14px]">
      <View className="items-center w-10 gap-[2px]">
        <Text className="text-lg font-bold text-lime">{day}</Text>
        <Text className="text-xs text-foreground-tertiary">{month}</Text>
      </View>
      <Separator orientation="vertical" className="h-9" />
      <View className="flex-1 gap-[2px]">
        <Text className="text-sm font-semibold text-foreground">{name}</Text>
        <Text className="text-xs text-foreground-secondary">{detail}</Text>
      </View>
    </View>
  );
}
```

- [ ] **Step 12: Run test — verify PASS**

### 7d: ProgramTemplateCard

- [ ] **Step 13: Write failing test**

```tsx
// __tests__/features/home/program-template-card.test.tsx
import { render, screen, fireEvent } from '~/test/test-utils';
import { ProgramTemplateCard } from '~/features/home/components/program-template-card';

describe('ProgramTemplateCard', () => {
  it('renders program info', () => {
    render(
      <ProgramTemplateCard
        badge="4D"
        name="PHUL"
        description="파워 + 근비대 · 주 4일"
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByText('4D')).toBeTruthy();
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('파워 + 근비대 · 주 4일')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(
      <ProgramTemplateCard badge="4D" name="PHUL" description="desc" onPress={onPress} />,
    );
    fireEvent.press(screen.getByText('PHUL'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 14: Run test — verify FAIL**

- [ ] **Step 15: Implement**

```tsx
// src/features/home/components/program-template-card.tsx
import { Pressable, View } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@pumpu-log/ui-kit';

interface ProgramTemplateCardProps {
  badge: string;
  name: string;
  description: string;
  onPress: () => void;
}

export function ProgramTemplateCard({
  badge,
  name,
  description,
  onPress,
}: ProgramTemplateCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-lg border border-border-subtle flex-row items-center gap-[14px] p-lg"
    >
      <View className="w-12 h-12 rounded-lg bg-lime-dim items-center justify-center">
        <Text className="text-sm font-extrabold text-lime">{badge}</Text>
      </View>
      <View className="flex-1 gap-[2px]">
        <Text className="text-base font-semibold text-foreground">{name}</Text>
        <Text className="text-xs text-foreground-secondary">{description}</Text>
      </View>
      <ChevronRight size={18} color={colors['foreground-tertiary']} />
    </Pressable>
  );
}
```

- [ ] **Step 16: Run test — verify PASS**

### 7e: QuickStartCard

- [ ] **Step 17: Write failing test**

```tsx
// __tests__/features/home/quick-start-card.test.tsx
import { render, screen, fireEvent } from '~/test/test-utils';
import { QuickStartCard } from '~/features/home/components/quick-start-card';

describe('QuickStartCard', () => {
  it('renders quick start info', () => {
    render(<QuickStartCard onPress={jest.fn()} />);
    expect(screen.getByText('빠른 시작')).toBeTruthy();
    expect(screen.getByText('운동 종목을 직접 골라 바로 기록')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<QuickStartCard onPress={onPress} />);
    fireEvent.press(screen.getByText('빠른 시작'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 18: Run test — verify FAIL**

- [ ] **Step 19: Implement**

```tsx
// src/features/home/components/quick-start-card.tsx
import { Pressable } from 'react-native';
import { Text } from '@pumpu-log/ui-kit';
import { Zap } from 'lucide-react-native';
import { colors } from '@pumpu-log/ui-kit';

interface QuickStartCardProps {
  onPress: () => void;
}

export function QuickStartCard({ onPress }: QuickStartCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-lg border border-border-subtle flex-row items-center justify-center gap-[14px] p-lg"
    >
      <Zap size={20} color={colors.yellow} />
      <Text className="text-[15px] font-semibold text-foreground">빠른 시작</Text>
      <Text className="text-xs text-foreground-secondary">운동 종목을 직접 골라 바로 기록</Text>
    </Pressable>
  );
}
```

- [ ] **Step 20: Run all component tests**

Run: `cd apps/mobile && pnpm test -- --testPathPattern=features/home`
Expected: ALL PASS

- [ ] **Step 21: Create use-greeting hook**

```ts
// src/features/home/hooks/use-greeting.ts
import { useMemo } from 'react';
import { getGreeting } from '~/shared/utils/greeting';

export function useGreeting() {
  return useMemo(() => {
    const hour = new Date().getHours();
    return getGreeting(hour);
  }, []);
}
```

- [ ] **Step 22: Commit**

```bash
git add apps/mobile/src/features/home/components/ apps/mobile/src/features/home/hooks/ apps/mobile/__tests__/features/home/
git commit -m "feat: implement Home feature components with TDD"
```

---

## Task 8: Home Screen 조립 (TDD)

**Files:**
- Create: `apps/mobile/src/features/home/home-screen.tsx`
- Create: `apps/mobile/src/features/home/home-empty-screen.tsx`
- Create: `apps/mobile/src/features/home/index.ts`
- Test: `apps/mobile/__tests__/features/home/home-screen.test.tsx`
- Test: `apps/mobile/__tests__/features/home/home-empty-screen.test.tsx`

- [ ] **Step 1: Write failing test for HomeScreen**

```tsx
// __tests__/features/home/home-screen.test.tsx
import { render, screen } from '~/test/test-utils';
import { HomeScreenContent } from '~/features/home/home-screen';

const props = {
  greeting: '좋은 아침이에요!',
  programName: 'PHUL',
  routineName: 'Day 2 · 하체 파워',
  dayProgress: '2 / 4',
  exercises: ['스쿼트', '레그 프레스', '레그 컬 외 2개'],
  recentSessions: [
    { day: '20', month: '3월', name: '상체 파워', detail: 'PHUL Day 1 · 5개 운동 · 48분' },
    { day: '18', month: '3월', name: '하체 근비대', detail: 'PHUL Day 4 · 5개 운동 · 52분' },
  ],
  onStartWorkout: jest.fn(),
  onViewAllHistory: jest.fn(),
};

describe('HomeScreenContent', () => {
  it('renders greeting section', () => {
    render(<HomeScreenContent {...props} />);
    expect(screen.getByText('좋은 아침이에요!')).toBeTruthy();
    expect(screen.getByText('오늘도 펌핑할 준비 되셨나요?')).toBeTruthy();
  });

  it('renders today workout card', () => {
    render(<HomeScreenContent {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('Day 2 · 하체 파워')).toBeTruthy();
  });

  it('renders recent workout section', () => {
    render(<HomeScreenContent {...props} />);
    expect(screen.getByText('최근 운동')).toBeTruthy();
    expect(screen.getByText('상체 파워')).toBeTruthy();
    expect(screen.getByText('하체 근비대')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test — verify FAIL**

- [ ] **Step 3: Implement home-screen.tsx**

```tsx
// src/features/home/home-screen.tsx
import { ScrollView, View } from 'react-native';
import { SectionHeader } from '@pumpu-log/ui-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GreetingSection } from './components/greeting-section';
import { TodayWorkoutCard } from './components/today-workout-card';
import { RecentWorkoutItem } from './components/recent-workout-item';
import { useGreeting } from './hooks/use-greeting';
import { useProgramStore } from '~/shared/stores/program-store';
import { useWorkoutHistoryStore } from '~/shared/stores/workout-history-store';

interface RecentSessionView {
  day: string;
  month: string;
  name: string;
  detail: string;
}

export interface HomeScreenContentProps {
  greeting: string;
  programName: string;
  routineName: string;
  dayProgress: string;
  exercises: string[];
  recentSessions: RecentSessionView[];
  onStartWorkout: () => void;
  onViewAllHistory: () => void;
}

export function HomeScreenContent({
  greeting,
  programName,
  routineName,
  dayProgress,
  exercises,
  recentSessions,
  onStartWorkout,
  onViewAllHistory,
}: HomeScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2xl p-2xl pt-xl">
      <GreetingSection greeting={greeting} subtitle="오늘도 펌핑할 준비 되셨나요?" />

      <View className="gap-md">
        <SectionHeader title="오늘의 운동" />
        <TodayWorkoutCard
          programName={programName}
          routineName={routineName}
          dayProgress={dayProgress}
          exercises={exercises}
          onStart={onStartWorkout}
        />
      </View>

      <View className="gap-md">
        <SectionHeader title="최근 운동" actionLabel="전체보기" onAction={onViewAllHistory} />
        {recentSessions.map((session) => (
          <RecentWorkoutItem
            key={`${session.day}-${session.name}`}
            day={session.day}
            month={session.month}
            name={session.name}
            detail={session.detail}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const greeting = useGreeting();
  const activeProgram = useProgramStore((s) => s.getActiveProgram());
  const currentRoutine = useProgramStore((s) => s.getCurrentRoutine());
  const currentDayIndex = useProgramStore((s) => s.currentDayIndex);
  const hasActiveProgram = useProgramStore((s) => s.hasActiveProgram());
  const recentSessions = useWorkoutHistoryStore((s) => s.getRecentSessions(2));

  if (!hasActiveProgram) {
    // Delegate to HomeEmptyScreen — imported dynamically in the tab file
    return null;
  }

  const routineExercises = currentRoutine?.exercises ?? [];
  const exerciseNames = routineExercises.slice(0, 2).map((e) => e.exerciseId);
  if (routineExercises.length > 2) {
    exerciseNames.push(`외 ${routineExercises.length - 2}개`);
  }

  const dayProgress = `${currentDayIndex + 1} / ${activeProgram?.routines.length ?? 0}`;

  const recentSessionViews = recentSessions.map((s) => {
    const date = new Date(s.startedAt);
    return {
      day: String(date.getDate()),
      month: `${date.getMonth() + 1}월`,
      name: s.routineName ?? '운동',
      detail: `${s.programName ?? ''} · ${s.exercises.length}개 운동 · ${s.durationMinutes ?? 0}분`,
    };
  });

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HomeScreenContent
        greeting={greeting}
        programName={activeProgram?.name ?? ''}
        routineName={currentRoutine?.name ?? ''}
        dayProgress={dayProgress}
        exercises={exerciseNames}
        recentSessions={recentSessionViews}
        onStartWorkout={() => {}}
        onViewAllHistory={() => {}}
      />
    </View>
  );
}
```

- [ ] **Step 4: Run test — verify PASS**

- [ ] **Step 5: Write failing test for HomeEmptyScreen**

```tsx
// __tests__/features/home/home-empty-screen.test.tsx
import { render, screen, fireEvent } from '~/test/test-utils';
import { HomeEmptyScreenContent } from '~/features/home/home-empty-screen';

const props = {
  greeting: '반가워요!',
  templates: [
    { id: 'tpl-phul', badge: '4D', name: 'PHUL', description: '파워 + 근비대 · 주 4일' },
    { id: 'tpl-ppl', badge: '6D', name: 'PPL', description: 'Push · Pull · Legs · 주 6일' },
    { id: 'tpl-upper-lower', badge: '4D', name: 'Upper / Lower', description: '상체 · 하체 분할 · 주 4일' },
  ],
  onSelectTemplate: jest.fn(),
  onCreateCustom: jest.fn(),
  onQuickStart: jest.fn(),
};

describe('HomeEmptyScreenContent', () => {
  it('renders onboarding greeting', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('반가워요!')).toBeTruthy();
    expect(screen.getByText('어떤 프로그램으로 시작할까요?')).toBeTruthy();
  });

  it('renders program templates', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('PPL')).toBeTruthy();
    expect(screen.getByText('Upper / Lower')).toBeTruthy();
  });

  it('renders custom program button', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('나만의 프로그램 만들기')).toBeTruthy();
  });

  it('renders quick start card', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('빠른 시작')).toBeTruthy();
  });

  it('calls onCreateCustom when button pressed', () => {
    render(<HomeEmptyScreenContent {...props} />);
    fireEvent.press(screen.getByText('나만의 프로그램 만들기'));
    expect(props.onCreateCustom).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 6: Run test — verify FAIL**

- [ ] **Step 7: Implement home-empty-screen.tsx**

```tsx
// src/features/home/home-empty-screen.tsx
import { ScrollView, View } from 'react-native';
import { Button, SectionHeader, Text } from '@pumpu-log/ui-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GreetingSection } from './components/greeting-section';
import { ProgramTemplateCard } from './components/program-template-card';
import { QuickStartCard } from './components/quick-start-card';
import { useProgramStore } from '~/shared/stores/program-store';

interface TemplateView {
  id: string;
  badge: string;
  name: string;
  description: string;
}

export interface HomeEmptyScreenContentProps {
  greeting: string;
  templates: TemplateView[];
  onSelectTemplate: (id: string) => void;
  onCreateCustom: () => void;
  onQuickStart: () => void;
}

export function HomeEmptyScreenContent({
  greeting,
  templates,
  onSelectTemplate,
  onCreateCustom,
  onQuickStart,
}: HomeEmptyScreenContentProps) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2xl p-2xl pt-xl">
      <GreetingSection greeting={greeting} subtitle="어떤 프로그램으로 시작할까요?" />

      <View className="gap-md">
        <SectionHeader title="추천 프로그램" />
        <View className="gap-[10px]">
          {templates.map((tpl) => (
            <ProgramTemplateCard
              key={tpl.id}
              badge={tpl.badge}
              name={tpl.name}
              description={tpl.description}
              onPress={() => onSelectTemplate(tpl.id)}
            />
          ))}
        </View>
      </View>

      <Button variant="outline" onPress={onCreateCustom}>
        <Text className="font-semibold text-lime">나만의 프로그램 만들기</Text>
      </Button>

      <View className="gap-md">
        <SectionHeader title="프로그램 없이 바로 시작" />
        <QuickStartCard onPress={onQuickStart} />
      </View>
    </ScrollView>
  );
}

function getDaysLabel(daysPerWeek: number): string {
  return `${daysPerWeek}D`;
}

export function HomeEmptyScreen() {
  const insets = useSafeAreaInsets();
  const programs = useProgramStore((s) => s.programs);
  const templates = programs
    .filter((p) => p.isTemplate)
    .map((p) => ({
      id: p.id,
      badge: getDaysLabel(p.daysPerWeek),
      name: p.name,
      description: p.description,
    }));

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <HomeEmptyScreenContent
        greeting="반가워요!"
        templates={templates}
        onSelectTemplate={() => {}}
        onCreateCustom={() => {}}
        onQuickStart={() => {}}
      />
    </View>
  );
}
```

- [ ] **Step 8: Run test — verify PASS**

- [ ] **Step 9: Create index.ts (public API)**

```ts
// src/features/home/index.ts
export { HomeScreen } from './home-screen';
export { HomeEmptyScreen } from './home-empty-screen';
```

- [ ] **Step 10: Update app/(tabs)/index.tsx to switch between states**

```tsx
// app/(tabs)/index.tsx
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
```

- [ ] **Step 11: Run all tests**

Run: `cd apps/mobile && pnpm test`
Expected: ALL PASS

- [ ] **Step 12: Commit**

```bash
git add apps/mobile/src/features/home/ apps/mobile/__tests__/features/home/ apps/mobile/app/
git commit -m "feat: assemble Home and HomeEmpty screens with store integration (TDD)"
```

---

## Task 9: iOS 시뮬레이터 검증

- [ ] **Step 1: Start Expo dev server and open iOS simulator**

```bash
cd apps/mobile && npx expo run:ios --device "iPhone 16 Pro"
```

- [ ] **Step 2: Verify Home Empty screen renders correctly**

Verify: onboarding greeting, 3 template cards, custom program button, quick start card, tab bar.

- [ ] **Step 3: Verify switching to Home screen with data**

In code, temporarily set `activeProgramId` to `'tpl-phul'` and `currentDayIndex` to `1`. Add mock workout history. Verify the home screen renders correctly with today's workout card and recent workout items.

- [ ] **Step 4: Revert temporary test data**

- [ ] **Step 5: Commit any visual fixes**

```bash
git add -A && git commit -m "fix: polish Home screen layout and styling"
```

---

## Task 10: 최종 리뷰 및 커밋

- [ ] **Step 1: Run full test suite**

```bash
cd apps/mobile && pnpm test
```

- [ ] **Step 2: Run linter**

```bash
cd /Users/woojo/workspace/pumpu-log && pnpm lint
```

- [ ] **Step 3: Run typecheck**

```bash
cd apps/mobile && pnpm typecheck
```

- [ ] **Step 4: Fix any issues found**

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "chore: final cleanup and verification for Home screen"
```
