# Pumpu Log — Project Rules

## 개발 워크플로우

모든 작업은 다음 프로세스를 따른다:

1. **Pencil 디자인 확인** — `pumpu-log-ralph.pen`만 참조. `pumpu-log.pen`은 무시.
2. **TDD** — 테스트 먼저 → 실패 확인 → 구현 → 통과 확인
3. **작업 단위마다 커밋** — 기능 하나 완성될 때마다 반드시 커밋
4. **커밋 전 타입체크 & 린트** — `pnpm typecheck` + `pnpm lint` 실행 후 오류 없을 때만 커밋
5. **커밋 전 코드 리뷰** — code-reviewer agent 실행
6. **리뷰 이슈 수정 후 재커밋**
7. **시뮬레이터 회귀테스트** — 변경사항의 영향 범위를 파악하고, 영향받는 화면을 Expo 개발 서버(`expo start --ios`) + iOS 시뮬레이터로 직접 확인. 네이티브 빌드(prebuild/pod install) 하지 않음.

## 코딩 가이드라인

### UI 컴포넌트 우선순위

UI를 구현할 때는 반드시 `@pumpu-log/ui-kit`의 컴포넌트를 최우선으로 사용한다.
- ui-kit에 있는 컴포넌트는 직접 구현하거나 외부 라이브러리로 대체하지 않는다.
- ui-kit에 없는 컴포넌트가 필요하면, 먼저 ui-kit에 추가한 후 사용한다.

### 코드 스타일

코드 스타일은 `biome.json` 설정을 따른다 (space 2칸, lineWidth 100, single quote, semicolons, trailing commas).

## 기술 스택

- Expo SDK 53 (managed workflow) + Expo Router v4
- NativeWind v4 + Tailwind
- Zustand v5 (상태관리)
- Jest + React Native Testing Library (테스트)
- Biome (린터)
- pnpm monorepo (node-linker=hoisted)

## 프로젝트 구조

- `packages/ui-kit/` — 공유 UI 컴포넌트 (@pumpu-log/ui-kit)
- `specs/` — 설계 문서 (앱 디자인, 구현 계획 등). 작업 전 관련 스펙 먼저 참조.
- `apps/mobile/` — Expo 모바일 앱
  - `app/` — Expo Router 라우팅만
  - `src/features/` — feature-based 모듈 (컴포넌트, hooks, index.ts)
  - `src/shared/` — stores, types, data, utils
  - `__tests__/` — 테스트 (features/ 구조 미러링)

## 테스트 실행

```bash
cd apps/mobile && pnpm test
```

루트에서 `pnpm test`는 모바일 앱이 아닌 루트 패키지의 test 스크립트를 실행하므로 주의.
