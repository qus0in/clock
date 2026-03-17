import { ClockDisplay } from "@/components/ClockDisplay";
import { ModeToggle } from "@/components/ModeToggle";

// 에지 캐싱 방지를 위한 동적 렌더링 강제
export const dynamic = "force-dynamic";

// 메인 홈페이지 컴포넌트 선언
export default function Home() {
  // 메인 화면 렌더링
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* 테마 전환 버튼 - 우측 상단 고정 */}
      <div className="absolute top-8 right-8">
        <ModeToggle />
      </div>

      <ClockDisplay />
    </div>
  );
}
