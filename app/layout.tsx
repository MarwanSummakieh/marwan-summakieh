import type { Metadata } from "next";
import { Geist, Geist_Mono, Bangers, Permanent_Marker } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
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

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marwansummakieh.com"),
  title: "Marwan Summakieh — Full-Stack & Systems Engineer",
  description:
    "Marwan Summakieh ships whole systems: a Linux distro that boots into a controller shell, realtime multiplayer editors, live trading bots, media servers, and finished VR games. MSc Human-Centered AI @ DTU, Copenhagen.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Marwan Summakieh",
    description: "Full-stack & systems engineer in Copenhagen. Recent work: MarwanOS, Trader, Storyroom, Mediawan, Marusic, and an MSc thesis on prosthetic vision.",
    images: ["/brand/marwanos-tag.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bangers.variable} ${marker.variable} wall font-sans text-chalk antialiased`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <ChatDrawer />
      </body>
    </html>
  );
}
