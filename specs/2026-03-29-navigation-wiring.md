# Navigation Wiring Design

## Goal
모든 화면을 Expo Router로 연결하여 앱이 실제로 동작하게 만든다.

## Routes

| Route | Screen | Type |
|-------|--------|------|
| `(tabs)/index` | Home / HomeEmpty | tab |
| `(tabs)/programs` | Programs / ProgramsEmpty | tab |
| `(tabs)/history` | History / HistoryEmpty | tab |
| `(tabs)/stats` | Stats / StatsEmpty | tab |
| `workout` | WorkoutScreen | stack |
| `workout-summary` | WorkoutSummaryScreen | stack |
| `create-program/name` | CreateProgramNameScreen | stack |
| `create-program/days` | CreateProgramDaysScreen | stack |
| `edit-routine` | EditRoutineScreen | stack |
| `exercise-search` | ExerciseSearchSheet | modal |
| `custom-exercise` | CustomExerciseFormScreen | stack |
| `history-detail` | HistoryDetailScreen | stack |

## Navigation Flows

### 온보딩
- Home Empty: 추천 프로그램 선택 → `useProgramStore.setActiveProgram(id)` → 자동 전환
- Home Empty: "나만의 프로그램 만들기" → `/create-program/name`
- Home Empty: "빠른 시작" → `/workout`

### 프로그램 관리
- Programs/ProgramsEmpty: "새 프로그램 만들기" → `/create-program/name`
- ProgramsEmpty: 인기 프로그램 선택 → `setActiveProgram(id)` → 자동 전환
- Create Program Name: "다음" → `/create-program/days`
- Create Program Days: "완료" → store 저장 → `router.replace('/(tabs)/programs')`

### 운동
- Home: "운동 시작" → `/workout`
- Workout: "운동 완료" → `/workout-summary`
- Workout Summary: "홈으로" → `router.replace('/(tabs)')`

### 기록
- History: 운동 기록 탭 → `/history-detail`
- Home: "전체보기" → History 탭 (index 2)

### Empty 화면 CTA
- History/Stats Empty: "운동 시작하기" → `/workout`
