# Cloudflare Workers 배포 및 캐싱 전략 (ClockBeat)

## 1. OpenNext.js 기반 Edge Rendering
- Vercel이나 Node.js 전용 어댑터 모델을 탈피해, Cloudflare 에지 네트워크 환경에 맞추기 위해 `@opennextjs/cloudflare`를 적용합니다. 이 어댑터 환경에서 `package.json`의 `deploy` 스크립트를 사용하여 Worker를 번들링하고 `wrangler.jsonc` 의 설정을 따릅니다.

## 2. force-dynamic 전략
- 매초 뷰를 업데이트하는 애플리케이션의 버그(낡은 시간값 표출)를 막기 위해, `page.tsx`에 `export const dynamic = "force-dynamic"`을 강제하여 HTML이나 SSR 페이로드를 캐싱하지 않고 요청마다 최신 결과값을 리턴하도록 구성했습니다.

## 3. `_headers` 브라우저 캐싱 제어
- `public/_headers` 파일의 지시어에 따라 루트 경로(`/`)는 `Cache-Control: no-cache, no-store, must-revalidate`를 활성화하여 브라우저에서 HTML 문서를 보존하지 못하도록 막습니다.
- 이를 보완하여 `/fonts/*`, `/favicon.svg` 및 `/_next/static/*` 에 해당하는 무거운 스크립트와 정적 자산에는 `Cache-Control: public, max-age=31536000, immutable` 정책을 사용하여 극강의 로딩 성능 차이를 만듭니다.
