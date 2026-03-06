import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import ChatDrawer from "@/components/layout/ChatDrawer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marwan Summakieh | Full-Stack Engineer & Creative Technologist",
  description: "Portfolio of Marwan Summakieh — Full-Stack Engineer & Creative Technologist. MSc Human-Centered AI @ DTU. React, Next.js, Unity, Python, VR, Azure, Docker.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[hsl(var(--background))] text-[hsl(var(--foreground))]`}>
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto min-h-screen max-w-5xl px-6 pb-32 pt-8 sm:px-8">
            {children}
          </main>
          <ChatDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
