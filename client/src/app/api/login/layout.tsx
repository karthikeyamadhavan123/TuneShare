import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " 🎵 Login to TuneShare – Discover & Share Music Effortlessly",
  description: "Sign in for TuneShare to connect with musicians, share your audio and video tracks, and collaborate on creative projects. Unlock a world of opportunities to expand your music network and discover talented artists!",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <>
      {children}
    </>
  );
}
