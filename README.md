# ClockBeat

**ClockBeat**는 심장 박동(ECG) 패턴과 세련된 유체 애니메이션, 그리고 현대적인 **글래스모피즘(Glassmorphism)** UI를 특징으로 하는 실시간 시계 웹 애플리케이션입니다.

- **URL**: [https://clock.qus0in.dev/](https://clock.qus0in.dev/)

## 🌟 주요 기능 (Key Features)

### 1. 글래스모피즘 & 모션 (Glassmorphism & Motion)
- 애플리케이션 전반에 걸쳐 반투명 배경, 블러 효과(`backdrop-blur`), 1픽셀 두께의 은은한 테두리를 사용해 마치 유리와 같은 시각적 깊이를 부여했습니다.
- 테마 토글 버튼, 타임존 전환 버튼 등 사용자가 인터랙션하는 요소 모두에서 스무스한 트랜지션 애니메이션을 느낄 수 있습니다.

### 2. 가우시안 심박 파형 SVG (ECG SVG Animation)
- 수학의 정규분포 곡선(가우시안 분포) 기반으로 매 렌더링 사이클(2초)마다 새로운 파동 진폭을 랜덤하게 그려냅니다.
- CSS `stroke-dasharray` 애니메이션이 결합되어 실시간으로 선이 그려지고 빛을 발산(`pulse-glow`)하는 생명체 같은 시각 효과를 연출합니다.

### 3. FOUT 차단 로직 (Prevent Flash of Unstyled Text)
- 커스텀 시계 폰트가 브라우저에 모두 로드될 때까지 렌더링을 차단하여, 폰트 뒤바뀜 현상(FOUT)이나 숫자가 깨지는 오류를 원천 방지합니다 (`document.fonts.ready` 활용).

### 4. 고정폭 넘버 렌더링 (Tabular Nums & Monospace)
- 시간과 날짜처럼 값이 빈번히 달라지더라도 컴포넌트 전체 UI가 흔들리지 않도록 고정폭 속성을 추가하여 시각적 안정성을 대폭 향상했습니다.

### 5. LocalStorage & 하이드레이션 (LocalStorage Synchronization)
- 사용자가 선택한 타임존(KST/UTC) 정보를 LocalStorage에 저장하여 탭을 닫아도 정보가 유지됩니다. Next.js의 하이드레이션 오류를 막기 위해 `useEffect` 마운트 시점에 안전하게 상태를 반영했습니다.

## 🚀 배포 환경 (Deployment)

- **스택**: Next.js 16 (App Router), Tailwind CSS v4, TypeScript
- **플랫폼**: Cloudflare Workers
- **어댑터**: OpenNext.js (`@opennextjs/cloudflare`)
- Edge 엣지 캐시 서버가 실시간 시계를 캐싱하지 않게끔 `page.tsx`를 동적 렌더링으로 강제(`force-dynamic`)하고 세부적인 Cache-Control 헤더 설정을 구현했습니다.

## 🛠 실행 방법 (Getting Started)

1. 저장소를 클론한 후 패키지를 설치합니다:
```bash
pnpm install
```

2. 변경된 OG 이미지가 있다면 빌드합니다 (Sharp 기반 정적 이미지 생성기 내장):
```bash
pnpm generate:og
```

3. 로컬 환경에서 테스트합니다:
```bash
pnpm dev
```
브라우저에서 `http://localhost:3000` 접속 후 로컬 렌더링을 확인하세요.
