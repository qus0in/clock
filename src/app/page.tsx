import { Button } from "@/components/ui/button";

// 메인 홈페이지 컴포넌트 선언
export default function Home() {
  // 메인 화면 렌더링
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Clock Project</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        코드 및 깃 컨벤션 테스트가 완료되었습니다.
      </p>
      
      {/* 셰드씨엔(shadcn) 버튼 테스트 */}
      <Button>시작하기</Button>
    </div>
  );
}
