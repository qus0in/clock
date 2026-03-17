---
name: Design System & Styling Rules
description: UI의 클레이모피즘 적용 지침 및 폰트 레이아웃 안정성 유지 규칙
---

# Design System Rules

이 스킬은 애플리케이션에 일관된 UI/UX 디자인 환경을 적용할 때 활용됩니다.

## 1. 클레이모피즘 (Claymorphism) 적용
새로운 요소 및 기존 요소를 생성할 때, 시각적 깊이감과 점토 같은 둥글고 부드러운 형태를 만들기 위해 전역 CSS(`globals.css`)에 정의된 `.clay-bg`, `.clay-card`, `.clay-btn`, `.clay-panel` 유틸리티 클래스를 사용합니다.
- 외부와 내부에 걸쳐 다중 `box-shadow`를 사용하여 볼륨감을 냅니다.
- 날카로운 각도를 배제하고 둥근 모서리(`rounded-[3.5rem]` 등)를 채택합니다.
- 배경 등에 불필요한 패턴이나 블러 효과(Glassmorphism)는 배제하고 심플하고 매트한 단색 배경을 사용하여 컴포넌트의 양감이 돋보이도록 유지합니다.

## 2. 폰트와 레이아웃 시프트(CLS) 방지
애니메이션이나 시간 렌더링 등으로 숫자가 지속적으로 변동하는 UI는 반드시 `font-mono tabular-nums` 혹은 고정폭 스타일링을 부여하여 텍스트의 흔들림을 막습니다.
- 커스텀 외부 폰트는 `document.fonts.ready` 구문을 활용해 폰트가 100% 로드된 후 화면 렌더링에 돌입시킴으로써 FOUT로 인한 깜빡임을 막습니다.
- 한글 문서 최적화를 위해 CSS의 루트 영역에 적용된 `break-keep` 원칙을 깨지 않고 단어 단위 줄바꿈을 유지합니다.
