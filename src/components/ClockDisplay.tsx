"use client";

import { useState, useEffect } from "react";
import { ECGWave } from "@/components/ECGWave";

// 실시간 시계 컴포넌트 선언
export function ClockDisplay() {
  const [time, setTime] = useState<Date | null>(null);
  const [isUTC, setIsUTC] = useState(false);

  // 컴포넌트 마운트 시 타이머 등록
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        
        {/* 애니메이션 한 사이클(2초)이 끝날 때마다 새로운 가우시안 파형으로 갱신 */}
        <ECGWave key={Math.floor(time.getSeconds() / 2)} />

        {/* 가운데 정렬된 타임존 가이드 텍스트 */}
        <h2 className="font-heading text-xs tracking-[0.4em] text-muted-foreground mt-8 mb-4 font-bold text-center w-full md:text-sm md:mb-10">
          {isUTC ? "UNIVERSAL TIME" : "KOREA STANDARD TIME"}
        </h2>
        
        {/* 시간 표시부 */}
        <div className="font-clock text-4xl font-bold tracking-tighter text-foreground transition-colors sm:text-7xl md:text-8xl md:tracking-widest dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          {formatNum(displayTime.getHours())}:{formatNum(displayTime.getMinutes())}:{formatNum(displayTime.getSeconds())}
        </div>
      </div>

      {/* 타임존 전환 버튼부: 슬라이딩 애니메이션 적용 */}
      <div className="relative flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 w-fit">
        {/* 활성 상태 표시 배경 슬라이더 */}
        <div 
          className="absolute top-1 bottom-1 left-1 bg-white dark:bg-zinc-700 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
          style={{ 
            width: "calc(50% - 4px)", 
            transform: `translateX(${isUTC ? "100%" : "0%"})` 
          }}
        />
        <button 
          className={`relative z-10 h-10 w-24 rounded-lg font-bold text-xs transition-colors duration-300 ${!isUTC ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setIsUTC(false)}
        >
          KST
        </button>
        <button 
          className={`relative z-10 h-10 w-24 rounded-lg font-bold text-xs transition-colors duration-300 ${isUTC ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setIsUTC(true)}
        >
          UTC
        </button>
      </div>
      {/* 푸터: 깃허브 아이콘 및 링크 */}
      <footer className="mt-8 flex items-center justify-center">
        <a 
          href="https://github.com/qus0in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <span className="text-xs font-medium tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            GITHUB/QUS0IN
          </span>
        </a>
      </footer>
    </div>
  );
}

