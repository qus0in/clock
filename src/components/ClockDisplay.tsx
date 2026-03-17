"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// 실시간 시계 컴포넌트 선언
export function ClockDisplay() {
  const [time, setTime] = useState<Date | null>(null);
  const [isUTC, setIsUTC] = useState(false);

  // 컴포넌트 마운트 시 시간 설정 및 타이머 등록
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="h-40" />;

  // 현재 설정된 타임존에 따른 시간 계산
  const displayTime = isUTC ? new Date(time.getTime() + time.getTimezoneOffset() * 60000) : time;
  const formatNum = (v: number) => v.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center rounded-3xl bg-zinc-950 p-10 shadow-2xl dark:bg-zinc-900 ring-1 ring-white/10">
        <h2 className="font-heading text-sm tracking-[0.3em] text-zinc-500 mb-6 font-bold">
          {isUTC ? "UNIVERSAL TIME" : "KOREA STANDARD TIME"}
        </h2>
        
        {/* 숫자에 font-clock 적용 (Orbitron) */}
        <div className="font-clock text-6xl md:text-8xl font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {formatNum(displayTime.getHours())}:{formatNum(displayTime.getMinutes())}:{formatNum(displayTime.getSeconds())}
        </div>
      </div>

      {/* 타임존 전환 버튼 */}
      <div className="flex gap-2 p-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
        <Button 
          variant={!isUTC ? "secondary" : "ghost"} 
          className="rounded-lg px-6 font-semibold"
          onClick={() => setIsUTC(false)}
        >
          KST
        </Button>
        <Button 
          variant={isUTC ? "secondary" : "ghost"} 
          className="rounded-lg px-6 font-semibold"
          onClick={() => setIsUTC(true)}
        >
          UTC
        </Button>
      </div>
    </div>
  );
}

