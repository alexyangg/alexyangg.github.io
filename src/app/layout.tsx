import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import BackgroundFX from "@/components/BackgroundFX";
import ScrollManager from "@/components/ScrollManager";
import CustomCursor from "@/components/CustomCursor";

import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

export const metadata: Metadata = {
  title: "Alex Yang",
  description: "Software Engineer Portfolio",
};

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={rubik.variable}>
      <body className="bg-transparent">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LenisProvider>
            {/* stacking context root */}
            <div className="relative min-h-screen">
              {/* background layer */}
              <BackgroundFX />
              <ScrollManager />
              <CustomCursor />
              {/* content layer */}
              <div className="relative z-10 min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 transition-colors">
                {children}
              </div>
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
