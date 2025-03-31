"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SoccerBall, Trophy, Calendar } from "@phosphor-icons/react";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

// Sidebar menu items
const menuItems: MenuItem[] = [
  { name: "Football", href: "/home", icon: <SoccerBall size={24} weight="fill" /> },
  { name: "Competitions", href: "/competitions", icon: <Trophy size={24} weight="fill" /> },
  { name: "Matches", href: "/matches", icon: <Calendar size={24} weight="fill" /> },
];

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path
  const [selected, setSelected] = useState<string>(pathname === "/" ? "/home" : pathname); // Default to /home if on root

  useEffect(() => {
    // Update selected state based on the pathname when the component re-renders
    if (pathname === "/") {
      setSelected("/home");
    } else {
      setSelected(pathname);
    }
  }, [pathname]);

  return (
    <aside className="sidebar w-15 h-screen p-4 fixed flex flex-col items-center space-y-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold">Bet Genie</h1>
      </div>

      {menuItems.map((item) => {
        const isActive = selected === item.href; // Check if the current path matches the item's href
        return (
          <Link key={item.name} href={item.href}>
            <button
              onClick={() => setSelected(item.href)} // Update the selected state on click
              className={`sidebar-btn flex items-center justify-center w-12 h-12 rounded-lg transition-all ${isActive ? "active" : ""}`}
            >
              {item.icon}
            </button>
          </Link>
        );
      })}
    </aside>
  );
}
