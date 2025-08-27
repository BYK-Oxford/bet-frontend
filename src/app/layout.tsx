import type { Metadata } from "next";
import { MatchProvider } from "../context/MatchContext";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    icon: "/smallLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9VK2YN00N6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9VK2YN00N6');
          `}
        </Script>

        {/* site verification for bing */}
        <meta name="msvalidate.01" content="C5476D18650320E358ECB1C4F2CEA6E9" />
      </head>
      <body>
        <MatchProvider>
          {/* Flex container with responsive layout */}
          <div className="flex min-h-screen flex-col lg:flex-row relative">
            {/* Right section: Header + Main stacked vertically */}
            <div className="flex-1 flex flex-col lg:ml-[60px] z-10">
              {" "}
              {/* Push right on large screens */}
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
