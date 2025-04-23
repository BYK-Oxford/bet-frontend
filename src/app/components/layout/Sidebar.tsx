"use client";
import Link from "next/link";
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
    <aside className="sidebar w-full lg:w-15 h-16 lg:h-screen p-2 lg:p-2 lg:fixed relative lg:top-0 lg:left-0 flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start border-b lg:border-r border-[rgba(255,255,255,0.1)] bg-gray-800 text-white">
     {/* Logo - only on large screens */}
      <div className="hidden lg:block mb-6">
        <h1 className="text-lg font-bold">Bet Genie</h1>
      </div>

      {/* Buttons layout adapts to screen size */}
      <div className="flex flex-row lg:flex-col gap-x-4 lg:gap-x-0 lg:space-y-6 w-full justify-center">
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
