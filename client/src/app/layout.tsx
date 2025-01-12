import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from './redux/provider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🎵 TuneShare - Collaborate, Create, and Connect with Music Enthusiasts",
  description: "Join TuneShare, a platform for music creators to collaborate, share audio and video tracks, and connect with others. Discover talented musicians, hire collaborators, and build your creative network in a seamless and interactive environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>

          {children}
        </Providers>
      </body>
    </html>
  );
}
