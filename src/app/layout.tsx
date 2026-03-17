import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clock.qus0in.dev/"),
  title: "ClockBeat",
  description: "심장 박동을 담은 역동적인 시계",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ClockBeat",
    description: "심장 박동을 담은 역동적인 시계",
    url: "https://clock.qus0in.dev/",
    siteName: "ClockBeat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClockBeat OG Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
