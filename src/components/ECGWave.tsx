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
  // 렌더링될 때마다(2초마다) 생성되며, 시작과 끝은 항상 y=20에서 일치함
  const pathData = useMemo(() => {
    const q = gaussian(6, 1.0); // Q파 깊이
    const r = gaussian(-32, 3.0); // R파 높이 (메인 진폭 강화)
    const s = gaussian(38, 3.0); // S파 깊이
    
    // 항상 y=20으로 복귀하기 위한 보정값 (q+r+s+j = 0)
    const j = -(q + r + s);

    // M0 20 (시작) -> h70 (안정된 시작 기선) -> 파동 -> h90 (안정된 끝 기선)
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
