export const EXERCISE_NAMES: Record<string, string> = {
  'bench-press': '벤치프레스',
  'overhead-press': '오버헤드 프레스',
  'barbell-row': '바벨 로우',
  squat: '스쿼트',
  'leg-press': '레그 프레스',
  'leg-curl': '레그 컬',
  'incline-db-press': '인클라인 덤벨프레스',
  'cable-fly': '케이블 플라이',
  'lat-pulldown': '랫 풀다운',
  'front-squat': '프론트 스쿼트',
  'romanian-deadlift': '루마니안 데드리프트',
  'calf-raise': '카프 레이즈',
  'face-pull': '페이스 풀',
};

export function getExerciseName(id: string): string {
  return EXERCISE_NAMES[id] ?? id;
}
