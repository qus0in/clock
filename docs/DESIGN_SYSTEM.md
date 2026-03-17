# UI & UX Design System (ClockBeat)

## 1. Glassmorphism
- **적용 대상**: 시계 카드 컴포넌트, 중앙 컨트롤러, 하단 푸터, 토글 버튼.
- **적용 방식**: 불완전한 투명도 배경(`bg-white/30`, `dark:bg-black/30`), 배경 오브젝트의 윤곽을 흩트리는 블러 효과(`backdrop-blur-xl`), 얇은 1픽셀 외곽선(`border-white/20`)의 조합으로 깊이를 형성.
- **포인트 데코레이션**: 배경 화면 양 끝에 위치한 큰 블롭(`blur-[100px]`, `rounded-full`) 객체가 반투명 카드 뒤로 중첩되며 유리 렌즈의 굴절감을 강조합니다.

## 2. Dynamic Typography & FOUT Prevention
- 폰트 최적화 오류(FOUT)를 억제하기 위해, React 클라이언트 상태 내에서 `document.fonts.ready` 약속 구문을 활용하여 브라우저 로딩 대기 래퍼를 구성했습니다. 이를 통해 로드되기 전의 지전분한 폰트 노출을 제거했습니다.
- 시간에 관련된 가변 숫자가 있는 영역은 `font-mono` 및 `tabular-nums` CSS 유틸리티를 적용해 숫자 변경에 따른 좌우 떨림(Layout Shift)을 방지했습니다.

## 3. ECG Wave Formulation
- **수학적 근사**: `Math.random()`을 사용하여 가우시안 분포(Gaussian Distribution)를 적용. 심박동의 특징인 Q, R, S, T 파형의 진폭 변동성을 수학적으로 계산하여 시각화했습니다. 
- **애니메이션**: `dasharray` 와 `pulse` 를 사용하여 중앙 지점에 점진적 그라데이션 및 네온빛 윤곽선을 그려냈습니다. 진폭이 극에 달할 때도 `viewBox="0 0 200 80"` 너비 내에서 안전하게 제한됩니다.
