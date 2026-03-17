---
name: NextJS Rendering Optimization
description: 프론트엔드 최적화 구문 (하이드레이션 방어, 에지 캐시 방지 등)
---

# NextJS Rendering Optimization

이 스킬은 실시간 데이터를 다루는 Next.js(특히 App Router 모델) 개발 시 참고할 성능 최적화 규칙입니다.

## 1. 엣지 캐싱 무력화 (force-dynamic)
시계 및 실시간 파형을 그리는 이 앱의 성격에 맞게 낡은(Stale) HTML 페이지를 캐싱하는 것은 치명적입니다.
- 페이지 최상단, 즉 `page.tsx` 등 엔트리 컴포넌트에 언제나 `export const dynamic = "force-dynamic";` 구문을 명시하여 빌드 렌더링이 아닌 매 요청마다의 동적 렌더링을 띄우게 제어합니다.

## 2. LocalStorage 하이드레이션 (Hydration) 동기화 오류 방어
서버 렌더링(SSR)에는 `window.localStorage`가 존재하지 않기 때문에, 클라이언트 측 상태(State)와 초기 렌더링 페이로드가 다르면 React 하이드레이션 오류가 발생합니다.
- 따라서 초기 컴포넌트 마운트 전에는 `isReady` 플래그 등으로 렌더링을 방어하거나, 빈 화면(`null`)을 출력합니다.
- `useEffect` 훅 내부에서 `localStorage.getItem`을 검증한 뒤 setState(`setIsUTC()`, `setTime()`) 등을 통해 안전하게 초기 상태를 덮어씁니다.
