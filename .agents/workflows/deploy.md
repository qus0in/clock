---
description: 프로젝트 배포 (Deploy) 프로세스 - OpenNext on Cloudflare Workers
---

# Deploy Workflow

이 워크플로우는 Next.js 애플리케이션을 OpenNext 어댑터를 통해 Cloudflare Workers 환경으로 프로덕션 배포할 때 사용됩니다.

1. 배포 전 환경별 린트 및 타입 에러 체크를 수행합니다.
// turbo
2. 패키지 설치 여부와 `pnpm generate:og`로 최신 OG Image를 확보합니다.
// turbo
3. `pnpm deploy` 커멘드를 통하여 코드를 빌드(`next build`)하고, `.open-next` 스크립트를 생성한 뒤 Cloudflare 인프라에 직접 배포를 진행합니다. 이 과정에서 클라우드플레어 인증 브라우저 창이 열릴 수 있습니다.
