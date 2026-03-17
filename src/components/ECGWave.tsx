"use client";

import { useMemo } from "react";

// 가우시안 분포(정규 분포)를 근사하는 랜덤 값 생성기
const gaussian = (mean: number, stdev: number) => {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
};

// 심박동 파형(ECG) 컴포넌트 선언
export function ECGWave() {
  // 렌더링될 때마다(2초마다) 생성되며, 베이스 진폭 확보 후 미세 변동 적용
  const pathData = useMemo(() => {
    // 공통 부분(Base)까지는 확실히 뻗고 그 뒤에 세기(Variation)가 바뀜
    const q = 5 + Math.abs(gaussian(0, 2));   // 최소 깊이 5 + 변동
    const r = -28 - Math.abs(gaussian(0, 10)); // 최소 높이 -28 + 변동 (가장 높은 피크)
    const s = 32 + Math.abs(gaussian(0, 10)); // 최소 깊이 32 + 변동 (가장 낮은 피크)
    
    // 항상 y=20(기본선)으로 복귀하기 위한 보정값
    const j = -(q + r + s);

    // 심전도 경로: 기선(70) -> P파(q5-4) -> QRS컴플렉스(l4-l6-l6-l4) -> 기선(90)
    return `M0 20 h70 q5 -4 10 0 h5 l4 ${q.toFixed(1)} l6 ${r.toFixed(1)} l6 ${s.toFixed(1)} l4 ${j.toFixed(1)} h5 q5 5 10 0 h90`;
  }, []);

  return (
    <div className="absolute top-4 w-full flex flex-col items-center opacity-60 animate-pulse-glow">
      <svg viewBox="0 0 200 40" className="w-48 h-12 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] dark:text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path className="animate-ecg" d={pathData} stroke="url(#ecg-gradient)" />
        <defs>
          <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="30%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
