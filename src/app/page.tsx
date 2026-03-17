import { ClockDisplay } from "@/components/ClockDisplay";

// 메인 홈페이지 컴포넌트 선언
export default function Home() {
  // 메인 화면 렌더링
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4">
      {/* 제목 폰트 적용 (Paperlogy) */}
      <h1 className="font-heading text-5xl font-bold tracking-tight mb-8">
        Clock Project
      </h1>
      
      {/* 내용 폰트 적용 (Pretendard -> Noto Sans KR 백업) */}
      <p className="font-sans text-lg text-zinc-600 dark:text-zinc-400 mb-12">
        설정된 다운로드 폰트들로 작성된 시계 위젯 데모입니다.
      </p>
      
      {/* 분리된 시계 모듈을 불러옵니다 */}
      <ClockDisplay />
    </div>
  );
}
