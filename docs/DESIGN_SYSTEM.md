# UI & UX Design System (ClockBeat)

## 1. Claymorphism
- **적용 대상**: 시계 카드 컴포넌트, 중앙 컨트롤러, 하단 푸터, 토글 버튼.
- **적용 방식**: 둥근 모서리(`rounded-[3.5rem] 등`)와 부드러운 단색 배경 색상, 그리고 다중 `box-shadow`를 활용해 깊이를 형성. 외곽 그림자(`drop-shadow`)와 내부 빛 번짐/질감 처리(`inset shadow`)를 양면에 적용하여 부드러운 점토 같은 입체감을 극대화했습니다.
- **포인트 데코레이션**: 배경은 너무 복잡한 패턴이나 블러 대신 심플한 솔리드/소프트 그라데이션으로 두어 클레이모피즘 컴포넌트 특유의 볼륨감과 입체적인 양감이 돋보이도록 구성.

## 2. Dynamic Typography & FOUT Prevention
- 폰트 최적화 오류(FOUT)를 억제하기 위해, React 클라이언트 상태 내에서 `document.fonts.ready` 약속 구문을 활용하여 브라우저 로딩 대기 래퍼를 구성했습니다. 이를 통해 로드되기 전의 지전분한 폰트 노출을 제거했습니다.
- 시간에 관련된 가변 숫자가 있는 영역은 `font-mono` 및 `tabular-nums` CSS 유틸리티를 적용해 숫자 변경에 따른 좌우 떨림(Layout Shift)을 방지했습니다.

## 3. ECG Wave Formulation
- **수학적 근사**: `Math.random()`을 사용하여 가우시안 분포(Gaussian Distribution)를 적용. 심박동의 특징인 Q, R, S, T 파형의 진폭 변동성을 수학적으로 계산하여 시각화했습니다. 
- **애니메이션**: `dasharray` 와 `pulse` 를 사용하여 중앙 지점에 점진적 그라데이션 및 네온빛 윤곽선을 그려냈습니다. 진폭이 극에 달할 때도 `viewBox="0 0 200 80"` 너비 내에서 안전하게 제한됩니다.
