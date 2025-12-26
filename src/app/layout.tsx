import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LenisProvider>
            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors font-sans">
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
