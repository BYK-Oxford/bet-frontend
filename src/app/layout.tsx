// RootLayout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sports Betting App",
  description: "Betting odds, statistics, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-20 bg-gray-800 text-white">
          <Sidebar />
        </div>
        
        {/* Main content area (right side) */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </body>
  </html>
  );
}
