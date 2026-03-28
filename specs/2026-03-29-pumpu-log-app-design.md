# Pumpu Log - 운동 기록 앱 설계 문서

## 개요

Pumpu Log는 웨이트 트레이닝 프로그램 관리 및 운동 기록 앱입니다. 사용자는 프로그램(PHUL, PPL 등)을 선택하거나 직접 만들어 운동을 기록하고, 히스토리와 통계를 확인할 수 있습니다.

## 기술 스택

- **프레임워크**: Expo SDK 53 (최신) + Expo Router v4
- **언어**: TypeScript (strict)
- **스타일링**: NativeWind v4 (기존 ui-kit과 동일)
- **상태관리**: Zustand v5 + MMKV persist
- **테스트**: Jest + React Native Testing Library
- **린터**: Biome (기존 설정 활용)
- **UI 컴포넌트**: @pumpu-log/ui-kit (기존 패키지)

## 아키텍처

### Feature-based 모듈 구조

```
apps/mobile/
├── app/                          # Expo Router (라우팅만)
│   ├── _layout.tsx               # Root layout (providers)
│   └── (tabs)/
│       ├── _layout.tsx           # Tab navigator
│       ├── index.tsx             # Home tab
│       ├── programs.tsx          # Programs tab
│       ├── history.tsx           # History tab
│       └── stats.tsx             # Stats tab
├── src/
│   ├── features/
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── greeting-section.tsx
│   │   │   │   ├── today-workout-card.tsx
│   │   │   │   ├── recent-workout-item.tsx
│   │   │   │   ├── program-template-card.tsx
│   │   │   │   └── quick-start-card.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-home-data.ts
│   │   │   ├── home-screen.tsx
│   │   │   ├── home-empty-screen.tsx
│   │   │   └── index.ts           # public API
│   │   ├── workout/               # 운동 기록 (다음 세션)
│   │   ├── program/               # 프로그램 관리 (다음 세션)
│   │   ├── history/               # 기록 조회 (다음 세션)
│   │   └── stats/                 # 통계 (다음 세션)
│   ├── shared/
│   │   ├── stores/
│   │   │   ├── workout-store.ts   # 운동 세션 상태
│   │   │   ├── program-store.ts   # 프로그램/루틴 상태
│   │   │   └── history-store.ts   # 운동 기록 상태
│   │   ├── types/
│   │   │   ├── workout.ts         # 운동 도메인 타입
│   │   │   ├── program.ts         # 프로그램 도메인 타입
│   │   │   └── exercise.ts        # 운동 종목 타입
│   │   └── utils/
│   │       ├── date.ts            # 날짜 유틸
│   │       └── greeting.ts        # 인사말 유틸
│   └── test/
│       └── test-utils.tsx         # 테스트 헬퍼
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 설계 원칙

1. **Feature 캡슐화**: 각 feature는 `index.ts`를 통해서만 외부에 노출. 내부 구현은 변경 자유.
2. **Store 경계**: Zustand store는 `shared/stores/`에 위치하되, 각 store는 하나의 도메인만 담당.
3. **Screen vs Component**: `app/` 디렉토리는 라우팅 설정만. 실제 UI는 feature 폴더의 screen 컴포넌트가 담당.
4. **ui-kit 활용**: 기존 @pumpu-log/ui-kit 컴포넌트를 최대한 재사용.

## 도메인 모델

### Exercise (운동 종목)

```typescript
interface Exercise {
  id: string;
  name: string;            // "스쿼트", "벤치프레스"
  category: ExerciseCategory;
  isCustom: boolean;
}

type ExerciseCategory = 'chest' | 'back' | 'shoulder' | 'legs' | 'arms' | 'core' | 'cardio';
```

### Program (프로그램)

```typescript
interface Program {
  id: string;
  name: string;            // "PHUL", "PPL"
  daysPerWeek: number;
  routines: Routine[];
  isTemplate: boolean;     // 추천 프로그램 여부
  createdAt: string;
}

interface Routine {
  id: string;
  name: string;            // "Day 1 · 상체 파워"
  dayIndex: number;
  exercises: RoutineExercise[];
}

interface RoutineExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: number;
  restSeconds: number;
}
```

### WorkoutSession (운동 세션)

```typescript
interface WorkoutSession {
  id: string;
  programId?: string;
  routineId?: string;
  startedAt: string;
  completedAt?: string;
  exercises: WorkoutExercise[];
}

interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
}

interface WorkoutSet {
  weight: number;
  reps: number;
  isCompleted: boolean;
}
```

## 화면 설계 (디자인 파일 기반)

### Home 화면 (데이터 있을 때)

- **StatusBar**: 시스템 상태바
- **인사말 섹션**: 시간대별 인사 + 서브텍스트
- **오늘의 운동 카드**: 프로그램명, 루틴명, Day 진행도(Badge), 운동 종목 리스트(Dot + 텍스트), "운동 시작" 버튼
- **최근 운동 섹션**: SectionHeader("최근 운동", "전체보기") + 운동 기록 아이템(날짜, 루틴명, 상세)
- **TabBar**: Home(활성), Programs, History, Stats

### Home Empty 화면 (온보딩)

- **인사말**: "반가워요!" + "어떤 프로그램으로 시작할까요?"
- **추천 프로그램**: PHUL, PPL, Upper/Lower 템플릿 카드
- **나만의 프로그램 만들기**: outline 버튼
- **빠른 시작**: Zap 아이콘 + "빠른 시작" 카드

### 전체 화면 목록 (이번 세션: Home만 구현)

| 화면 | 상태 |
|------|------|
| Home | 이번 세션 구현 |
| Home - Empty (Onboarding) | 이번 세션 구현 |
| Programs | 다음 세션 |
| Programs - Empty | 다음 세션 |
| History | 다음 세션 |
| History - Expanded | 다음 세션 |
| History - Workout Detail | 다음 세션 |
| Workout | 다음 세션 |
| Workout - Exercise List Sheet | 다음 세션 |
| Workout - Last Exercise | 다음 세션 |
| Workout - Set Swipe Delete | 다음 세션 |
| Workout - Rest Timer | 다음 세션 |
| Workout - Timer Done | 다음 세션 |
| Workout - Timer Settings | 다음 세션 |
| Workout - Summary | 다음 세션 |
| Workout - Exit Dialog | 다음 세션 |
| Create Program - Name | 다음 세션 |
| Create Program - Days | 다음 세션 |
| Edit Routine | 다음 세션 |
| Exercise Search | 다음 세션 |
| Custom Exercise Form | 다음 세션 |
| Quick Start - Exercise Select | 다음 세션 |
| Stats - Coming Soon | 다음 세션 |
| Stats - Main | 다음 세션 |
| Stats - Exercise Detail | 다음 세션 |
| Dialog - Delete Program | 다음 세션 |
| Dialog - Delete Routine | 다음 세션 |
| Toast - Workout Complete | 다음 세션 |
| Programs - Context Menu | 다음 세션 |

## 데이터 전략

- **저장소**: Zustand + zustand/persist + react-native-mmkv
- **초기 데이터**: 추천 프로그램 템플릿은 앱에 하드코딩 (seed data)
- **동기화**: 현재는 로컬 전용. store 인터페이스를 통해 접근하므로 나중에 API 레이어 추가 가능.

## 테스트 전략

- **단위 테스트**: store 로직, 유틸 함수, hooks
- **컴포넌트 테스트**: React Native Testing Library로 렌더링 + 인터랙션
- **TDD**: 테스트 먼저 작성 → 실패 확인 → 구현 → 통과 확인
