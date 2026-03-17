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
        
        {/* 한글 날짜 및 요일 표시 */}
        <div className="font-heading text-lg font-bold text-foreground mb-4 opacity-80 tracking-widest md:text-2xl md:mb-6">
          {displayTime.getFullYear()}년 {displayTime.getMonth() + 1}월 {displayTime.getDate()}일 (
          {['일', '월', '화', '수', '목', '금', '토'][displayTime.getDay()]})
        </div>

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
      <footer className="mt-12 flex items-center justify-center pb-8">
        <a 
          href="https://github.com/qus0in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-foreground"
        >
          {/* 최신 스타일의 GitHub 모노 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="text-[10px] font-bold tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            GITHUB / QUS0IN
          </span>
        </a>
      </footer>
    </div>
  );
}

