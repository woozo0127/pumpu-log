# Pumpu Log

![Pumpu Log](./assets/images/onboarding-screen.png)

> **오늘보다 조금 더 무겁게.**

운동 한 세트마다 무게·횟수를 기록하고, 다음 목표를 자동으로 제안받는 모바일 앱이다. 점진적 과부하(progressive overload)를 게임 스코어처럼 시각화해 "어제의 나"를 한 단계씩 넘기는 경험에 집중한다.

## 어떤 앱인가

- **세트 단위 로깅** — 무게·반복수·RPE를 빠르게 입력해 운동 볼륨을 누적한다.
- **자동 다음 목표** — 직전 세션의 기록을 바탕으로 다음 세트의 추천 무게/횟수를 제시한다.
- **1RM 트래킹** — 추정 1RM 대비 현재 강도(%1RM)를 원형 차트로 한눈에 본다.
- **루틴 프리뷰** — 홈 / 루틴 / 워크아웃 화면을 라우트별로 분리해 디자인을 빠르게 검증한다.

다크 배경에 라임 액센트, 큰 숫자 타이포그래피로 "한 번에 한 가지 숫자"만 보게 해 운동 중에도 시선이 흐트러지지 않도록 했다.

## 기술 스택

- Expo SDK 54 / React Native 0.81 / React 19
- expo-router (file-based routing, typed routes)
- TypeScript strict, path alias `#/*`
- Biome (format/lint), ESLint (expo config)
- pnpm

## 시작하기

```bash
pnpm install
pnpm start          # Expo Dev Tools
pnpm ios            # iOS 시뮬레이터
pnpm android        # Android 에뮬레이터
pnpm web            # 웹
```

진입 화면(`app/index.tsx`)에서 다음 라우트로 이동할 수 있다.

- `/preview/gallery` — UI Kit 갤러리
- `/preview/home` · `/preview/routine` · `/preview/workout` — 화면 프리뷰
- `/preview/tabs/home` — Liquid Glass 네이티브 탭 프리뷰

## 디렉터리 구조

```
app/                 # expo-router 라우트
  index.tsx          # 진입 메뉴
  preview/           # 화면별 프리뷰 + 갤러리
components/ui/       # 자체 UI 킷 (badge, card, gradient-hero, ...)
  theme.ts           # palette / spacing / radius / shadow / motion 토큰
.design/             # 디자인 프로토타입 (코드 빌드 대상 아님)
assets/              # 아이콘 · 스플래시 · 온보딩 이미지
```

## 디자인 토큰

`components/ui/theme.ts`의 `palette`, `theme`을 단일 출처로 사용한다.
- `palette.neutral` (0~1000), `lime` 액센트, alpha 셰이드
- `theme.space` / `theme.radius` / `theme.shadow` / `theme.motion`

## 코드 스타일

- 인덴트는 스페이스 2칸
- JS/TS 문자열은 작은따옴표, JSX 속성은 큰따옴표 (Biome `quoteStyle` 설정)
- 경로 import는 `#/...` alias 사용

## 스크립트

| 명령 | 설명 |
| --- | --- |
| `pnpm start` | Expo 개발 서버 |
| `pnpm ios` / `pnpm android` / `pnpm web` | 플랫폼별 실행 |
| `pnpm lint` | `expo lint` (ESLint) |
| `pnpm biome` | Biome 검사 |
| `pnpm biome:fix` | Biome 자동 수정 |
