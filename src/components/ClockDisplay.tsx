"use client";

import { useState, useEffect } from "react";
import { ECGWave } from "@/components/ECGWave";

// 실시간 시계 컴포넌트 선언
export function ClockDisplay() {
  const [time, setTime] = useState<Date | null>(null);
  const [isUTC, setIsUTC] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 컴포넌트 마운트 시 타이머 등록 및 설정 불러오기
  useEffect(() => {
    // 폰트 로드 확인
    document.fonts.ready.then(() => setIsReady(true));

    // 저장된 타임존 설정 불러오기
    const savedTimeZone = localStorage.getItem("clock-timezone");
    if (savedTimeZone === "utc") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsUTC(true);
    }
    
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 타임존 변경 시 로컬스토리지 저장
  const toggleTimeZone = (utc: boolean) => {
    setIsUTC(utc);
    localStorage.setItem("clock-timezone", utc ? "utc" : "kst");
  };

  if (!time || !isReady) return <div className="min-h-screen" />;

  // 타임존 계산 및 포맷팅
  const displayTime = isUTC ? new Date(time.getTime() + time.getTimezoneOffset() * 60000) : time;
  const formatNum = (v: number) => v.toString().padStart(2, "0");

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 md:gap-10">
      {/* 클레이모피즘 스타일의 시계 카드 */}
      <div className="relative flex w-full max-w-2xl flex-col items-center clay-card p-10 transition-all duration-500 md:p-16">
        
        {/* 애니메이션 한 사이클(2초)이 끝날 때마다 새로운 가우시안 파형으로 갱신 */}
        <ECGWave key={Math.floor(time.getSeconds() / 2)} />

        {/* 가운데 정렬된 타임존 가이드 텍스트 */}
        <h2 className="font-heading text-xs tracking-[0.4em] text-muted-foreground mt-8 mb-4 font-bold text-center w-full md:text-sm md:mb-10">
          {isUTC ? "UNIVERSAL TIME" : "KOREA STANDARD TIME"}
        </h2>
        
        {/* 한글 날짜 및 요일 표시 (Monospace 적용) */}
        <div className="font-mono tabular-nums text-lg font-bold text-foreground mb-4 opacity-80 tracking-wider text-center w-full md:text-2xl md:mb-6">
          {displayTime.getFullYear()}년 {displayTime.getMonth() + 1}월 {displayTime.getDate()}일 (
          {['일', '월', '화', '수', '목', '금', '토'][displayTime.getDay()]})
        </div>

        {/* 시간 표시부: 타임존 전환 시 부드러운 전환 효과 적용 */}
        <div 
          key={isUTC ? "utc" : "kst"}
          className="font-clock text-4xl font-bold tracking-tighter text-foreground transition-all duration-500 animate-in fade-in zoom-in-95 sm:text-7xl md:text-8xl md:tracking-widest dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {formatNum(displayTime.getHours())}:{formatNum(displayTime.getMinutes())}:{formatNum(displayTime.getSeconds())}
        </div>
      </div>

      {/* 타임존 전환 버튼부: 클레이모피즘 및 슬라이딩 애니메이션 적용 */}
      <div className="relative flex gap-1 p-1 clay-panel rounded-xl w-fit">
        {/* 활성 상태 표시 배경 슬라이더 (클레이모피즘 반영) */}
        <div 
          className="absolute top-1 bottom-1 left-1 clay-btn-active rounded-lg transition-all duration-300 ease-in-out"
          style={{ 
            width: "calc(50% - 4px)", 
            transform: `translateX(${isUTC ? "100%" : "0%"})` 
          }}
        />
        <button 
          className={`relative z-10 h-10 w-24 rounded-lg font-bold text-xs transition-colors duration-300 ${!isUTC ? "text-primary dark:text-white" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => toggleTimeZone(false)}
        >
          KST
        </button>
        <button 
          className={`relative z-10 h-10 w-24 rounded-lg font-bold text-xs transition-colors duration-300 ${isUTC ? "text-primary dark:text-white" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => toggleTimeZone(true)}
        >
          UTC
        </button>
      </div>
    </div>
  );
}

