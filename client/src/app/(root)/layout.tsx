import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuneShare| Where Music Unites",
  description: "TuneShare is a Next.js-powered platform designed for music enthusiasts to share their favorite tunes, discover new tracks, and connect with a vibrant community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
