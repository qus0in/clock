---
description: 프로젝트 배포 (Deploy) 프로세스
---

# Deploy Workflow
이 워크플로우는 코드를 상업용 또는 스테이징 환경에 배포할 때 사용됩니다.

1. 배포 전 빌드 안정성 테스트 수행 (`pnpm build`)
2. 터미널 명령어를 통해 대상 플랫폼(예: Vercel, Cloudflare, AWS 등)으로 배포합니다. 
3. "이 워크플로우는 사용자의 명확한 지시 하에만 진행해야 합니다."
