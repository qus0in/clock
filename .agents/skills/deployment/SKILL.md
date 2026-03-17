---
name: Cloudflare OpenNext Deployment Guidelines
description: Cloudflare Workers 플랫폼 전용 CLI 배포 규약 및 린트 제어
---

# Cloudflare OpenNext Deployment Guidelines

이 프로젝트는 전통적인 Node.js/Vercel 호스팅이 아닌 **Cloudflare Workers 환경에서 Next.js App Router (v15+)를 실행**하기 위해 OpenNext 어댑터를 활용합니다. 코드를 배포하거나 설정할 때 아래 규약을 따릅니다.

## 1. ESLint V9 및 빌드 예외 디렉토리 관리
OpenNext 컴파일 시 `.open-next` 등의 숨김 폴더에 번들 아티팩트가 생성됩니다. `eslint.config.mjs` 파일 내부의 글로벌 무시 목록(`globalIgnores`)에 해당 워커 생성 디렉토리가 없다면 수천 개의 린트 폭탄 에러가 쏟아질 수 있으므로, 반드시 폴더를 무시 처리(`".open-next/**", ".wrangler/**"`)해 둬야 합니다.
- 또한 `.eslintignore` (레거시) 방식은 v9 환경부터는 병용하지 않습니다.

## 2. 배포 스크립트 실행 순서
`package.json` 상의 `pnpm deploy`가 기본 워크플로우를 담당합니다. 빌드 렌더 구조는 다음과 같습니다:
1. `opennextjs-cloudflare build` (Next.js 빌드 진행 후 에지 워커용 서버 생성)
2. `opennextjs-cloudflare deploy` (wrangler 명령어 없이 `.wrangler` 설정을 통해 직접 CF Workers로 업로드)
3. 정적 자산(Static Assets)과 서버 로직(Worker)의 업로드가 약 30초 내에 이뤄지며, 이로써 Edge 랜더링이 가능한 애플리케이션으로 탈바꿈됩니다.
