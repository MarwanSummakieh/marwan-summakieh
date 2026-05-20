import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import ChatDrawer from "@/components/layout/ChatDrawer";
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] font-sans text-white antialiased`}>
        <SiteHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatDrawer />
      </body>
    </html>
  );
}
