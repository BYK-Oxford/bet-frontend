import type { Metadata } from "next";
import { MatchProvider } from "../context/MatchContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bet Genie",
  description: "Find the best chances to win!",
  icons: {
    icon: '/smallLogo.png', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MatchProvider>
          {/* Flex container with responsive layout */}
          <div className="flex min-h-screen flex-col lg:flex-row relative">
            {/* Right section: Header + Main stacked vertically */}
            <div className="flex-1 flex flex-col lg:ml-[60px] z-10"> {/* Push right on large screens */}
              <Header />
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
          {/* Footer stays at the bottom for all screens */}
          <Footer />
        </MatchProvider>
      </body>
    </html>
  );
}
