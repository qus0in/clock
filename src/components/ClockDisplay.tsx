"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// 실시간 시계 컴포넌트 선언
export function ClockDisplay() {
  const [time, setTime] = useState<Date | null>(null);
  const [isUTC, setIsUTC] = useState(false);

  // 컴포넌트 마운트 시 타이머 등록
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="h-40" />;

  // 타임존 계산 및 포맷팅
  const displayTime = isUTC ? new Date(time.getTime() + time.getTimezoneOffset() * 60000) : time;
  const formatNum = (v: number) => v.toString().padStart(2, "0");

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 md:gap-10">
      {/* 테마 연동 카드 */}
      <div className="relative flex w-full max-w-2xl flex-col items-center rounded-[3.5rem] bg-card p-10 shadow-2xl border-8 border-zinc-200 transition-colors duration-500 md:p-16 dark:bg-zinc-950 dark:border-zinc-800 dark:shadow-[0_0_60px_-15px_rgba(255,255,255,0.1)]">
        
        {/* 가로 심박동 파형 애니메이션 (ECG/EKG Wave) */}
        <div className="absolute top-6 w-full flex flex-col items-center gap-1 opacity-70 animate-pulse-glow">
          <svg
            viewBox="0 0 200 20"
            className="w-32 h-6 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] dark:text-red-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 심박동 베이스 라인 및 스파이크 */}
            <path
              className="animate-ecg"
              d="M0 10 h80 l5 -8 l5 15 l5 -12 l5 5 h100"
            />
          </svg>
        </div>

        {/* 가운데 정렬된 타임존 가이드 텍스트 */}
        <h2 className="font-heading text-xs tracking-[0.4em] text-muted-foreground mt-8 mb-4 font-bold text-center w-full md:text-sm md:mb-10">
          {isUTC ? "UNIVERSAL TIME" : "KOREA STANDARD TIME"}
        </h2>
        
        {/* 시간 표시부 */}
        <div className="font-clock text-4xl font-bold tracking-tighter text-foreground transition-colors sm:text-7xl md:text-8xl md:tracking-widest dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          {formatNum(displayTime.getHours())}:{formatNum(displayTime.getMinutes())}:{formatNum(displayTime.getSeconds())}
        </div>
      </div>

      {/* 버튼 디자인 유지 */}
      <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <Button 
          variant={!isUTC ? "secondary" : "ghost"} 
          className="h-10 rounded-lg px-6 font-bold text-xs md:text-sm"
          onClick={() => setIsUTC(false)}
        >
          KST
        </Button>
        <Button 
          variant={isUTC ? "secondary" : "ghost"} 
          className="h-10 rounded-lg px-6 font-bold text-xs md:text-sm"
          onClick={() => setIsUTC(true)}
        >
          UTC
        </Button>
      </div>
    </div>
  );
}

