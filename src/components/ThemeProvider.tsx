"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// 테마 제공자 컴포넌트 선언
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
