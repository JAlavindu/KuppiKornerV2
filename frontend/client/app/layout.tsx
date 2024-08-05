"use client";
import "./globals.css";
import { K2D } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";

const k2d = K2D({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-K2D",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${k2d.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-[#492a70] dark:to-[#250848] duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
