import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-cloudflare-worker-url.com"),
  title: "Clock Project",
  description: "Next.js Clock Application",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Clock Project",
    description: "Next.js Clock Application with Dynamic ECG Wave",
    url: "https://your-cloudflare-worker-url.com",
    siteName: "Clock Project",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clock Project OG Image",
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
