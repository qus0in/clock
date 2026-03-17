import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const APP_NAME = "ClockBeat";
const APP_DESCRIPTION = "Can You Feel My ClockBeat?";
const APP_URL = "https://clock.qus0in.dev/";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: APP_NAME,
  description: APP_DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
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
