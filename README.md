# Pumpu Log

![Pumpu Log](./assets/images/readme-cover.png)

운동 루틴과 볼륨을 기록하는 모바일 앱 프로토타입. Expo Router 기반 React Native 프로젝트로, 자체 UI 킷과 프리뷰 라우트 위에서 디자인을 빠르게 검증한다.

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
assets/              # 아이콘 · 스플래시 이미지
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
