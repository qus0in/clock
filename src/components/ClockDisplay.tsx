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
      {/* 테마 연동 카드: Light(카드형) / Dark(발광형) 대응 */}
      <div className="flex w-full max-w-2xl flex-col items-center rounded-[2.5rem] bg-card p-8 shadow-xl ring-1 ring-border transition-colors duration-500 md:p-16 dark:bg-zinc-950 dark:ring-white/10 dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
        <h2 className="font-heading text-xs tracking-[0.4em] text-muted-foreground mb-4 font-bold md:text-sm md:mb-8">
          {isUTC ? "UNIVERSAL TIME" : "KOREA STANDARD TIME"}
        </h2>
        
        {/* 반응형 텍스트: 모바일(4xl) -> 테블릿(7xl) -> 데스크탑(8xl) */}
        <div className="font-clock text-4xl font-bold tracking-tighter text-foreground transition-colors sm:text-7xl md:text-8xl md:tracking-widest dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {formatNum(displayTime.getHours())}:{formatNum(displayTime.getMinutes())}:{formatNum(displayTime.getSeconds())}
        </div>
      </div>

      {/* 반응형 전환 버튼 레이아웃 */}
      <div className="flex gap-2 p-1.5 bg-muted rounded-2xl shadow-inner">
        <Button 
          variant={!isUTC ? "secondary" : "ghost"} 
          className="rounded-xl px-4 py-6 font-bold md:px-8"
          onClick={() => setIsUTC(false)}
        >
          KST
        </Button>
        <Button 
          variant={isUTC ? "secondary" : "ghost"} 
          className="rounded-xl px-4 py-6 font-bold md:px-8"
          onClick={() => setIsUTC(true)}
        >
          UTC
        </Button>
      </div>
    </div>
  );
}

