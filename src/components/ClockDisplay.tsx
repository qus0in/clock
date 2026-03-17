"use client";

import { useState, useEffect } from "react";

// 실시간 시계 컴포넌트 선언
export function ClockDisplay() {
  const [time, setTime] = useState<Date | null>(null);

  // 컴포넌트 마운트 시 시간 설정 및 1초 단위 타이머 등록
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 하이드레이션 에러 방지를 위한 초기 빈 상태
  if (!time) return <div className="h-40" />;

  // 시, 분, 초 포맷팅 함수
  const formatNum = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center rounded-3xl bg-zinc-900 p-10 shadow-2xl">
      <h2 className="font-heading text-2xl tracking-widest text-zinc-400 mb-4">
        LOCAL TIME
      </h2>
      
      {/* 숫자에 font-clock 적용 (Orbitron) */}
      <div className="font-clock text-7xl md:text-9xl font-bold text-white tracking-[0.2em] shadow-black drop-shadow-lg">
        {formatNum(time.getHours())}:{formatNum(time.getMinutes())}:{formatNum(time.getSeconds())}
      </div>
      
      {/* 내용에 font-sans 적용 (Pretendard -> Noto Sans KR 백업) */}
      <p className="font-sans text-lg text-zinc-500 mt-6">
        시간은 금입니다. 소중한 하루 보내세요!
      </p>
    </div>
  );
}
