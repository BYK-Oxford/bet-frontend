"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SoccerBall } from "@phosphor-icons/react";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { name: "Football", href: "/home", icon: <SoccerBall size={24} weight="fill" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>(pathname === "/" ? "/home" : pathname);

  useEffect(() => {
    setSelected(pathname === "/" ? "/home" : pathname);
  }, [pathname]);

  return (
    <aside className="sidebar w-full lg:w-18 h-16 lg:h-screen  lg:fixed relative lg:top-0 lg:left-0 flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start border-b lg:border-r border-[rgba(255,255,255,0.1)] bg-gray-800 text-white">
     {/* Logo - only on large screens */}
     <Link href="/home">
      <div className="hidden lg:block pt-4 mb-6">
          <Image
            // src="/BetGenieLogo.png"
            src="/mainLogo.png"
            alt="Bet Genie Logo"
            width={200} // you can go higher like 400 if you want
            height={0}  // height becomes auto with style
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
      </Link>

      {/* Buttons layout adapts to screen size */}
      <div className="flex flex-row lg:flex-col gap-x-4 p-2 lg:p-2 lg:gap-x-0 lg:space-y-6 w-full justify-center">
        {menuItems.map((item, index) => {
          const isActive = selected === item.href;
          return (
            <Link key={`${item.name}-${index}`} href={item.href}>
              <button
                onClick={() => setSelected(item.href)}
                className={`sidebar-btn relative flex items-center justify-center w-12 h-12 rounded-lg transition-all shrink-0 ${isActive ? "active" : ""}`}
              >
                {item.icon}
              </button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
