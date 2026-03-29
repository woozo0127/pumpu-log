# Pumpu Log — Project Rules

## 개발 워크플로우

모든 작업은 다음 프로세스를 따른다:

1. **Pencil 디자인 확인** — `pumpu-log-ralph.pen`만 참조. `pumpu-log.pen`은 무시.
2. **TDD** — 테스트 먼저 → 실패 확인 → 구현 → 통과 확인
3. **작업 단위마다 커밋** — 기능 하나 완성될 때마다 반드시 커밋
4. **커밋 전 코드 리뷰** — code-reviewer agent 실행
5. **리뷰 이슈 수정 후 재커밋**
6. **시뮬레이터 회귀테스트** — Expo 개발 서버(`expo start --ios`) + iOS 시뮬레이터 스크린샷 확인. 네이티브 빌드(prebuild/pod install) 하지 않음.

## 기술 스택

- Expo SDK 53 (managed workflow) + Expo Router v4
- NativeWind v4 + Tailwind
- Zustand v5 (상태관리)
- Jest + React Native Testing Library (테스트)
- Biome (린터)
- pnpm monorepo (node-linker=hoisted)

## 프로젝트 구조

- `packages/ui-kit/` — 공유 UI 컴포넌트 (@pumpu-log/ui-kit)
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
