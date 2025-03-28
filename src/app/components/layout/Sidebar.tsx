"use client"; 
import { ReactNode, useState } from "react";
import { House, Trophy, Calendar, Users, GearSix, SoccerBall } from "@phosphor-icons/react";

type MenuItem = {
  name: string;
  icon: ReactNode;
};

// Sidebar menu items
const menuItems: MenuItem[] = [
  { name: "Football", icon: <SoccerBall size={24} weight="fill" /> },
];

export default function Sidebar() {
  const [selected, setSelected] = useState<string>(menuItems[0].name);

  return (
    <aside className="sidebar w-15 h-screen p-4 fixed flex flex-col items-center space-y-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold">Bet Genie</h1>
      </div>

      {menuItems.map((item) => {
        const isActive = selected === item.name;

        return (
          <button
            key={item.name}
            onClick={() => setSelected(item.name)}
            className={`sidebar-btn flex items-center justify-center w-12 h-12 rounded-lg transition-all ${
              isActive ? "active" : ""
            }`}
          >
            {item.icon}
          </button>
        );
      })}
    </aside>
  );
}
