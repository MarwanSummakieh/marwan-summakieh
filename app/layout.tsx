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
  title: "Marwan Summakieh | Digital Space",
  description: "Portfolio of Marwan Summakieh, Software Engineer.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#070a17] text-white`}>
        <SiteHeader />
        <main className="mx-auto min-h-screen max-w-6xl px-4 pb-32 pt-6 sm:px-6">
          {children}
        </main>
        <ChatDrawer />
      </body>
    </html>
  );
}
