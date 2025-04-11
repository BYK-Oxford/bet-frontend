"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface MatchProps {
  matchId: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
  isLast?: boolean;
}

const MatchListContainer: React.FC<MatchProps> = ({
  matchId,
  date,
  time,
  team1,
  team2,
  logo1,
  logo2,
  odds,
  isLast = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Save match data in sessionStorage
    const matchData = {
      matchId,
      date,
      time,
      team1,
      team2,
      logo1,
      logo2,
      odds,
    };

    sessionStorage.setItem("matchData", JSON.stringify(matchData));

    // Navigate using clean URL
    router.push(`/match_detail/${matchId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer hover:bg-[#1a1a1a] transition-all text-white p-2 flex items-center w-full min-w-[400px] max-w-[700px] justify-between gap-4 ${
        isLast ? "" : "border-b border-[#3a3a3a] pb-4 mb-2"
      }`}
    >
      {/* Date and Time */}
      <div className="text-[10px] text-gray-400 w-20">
        {date}, {time}
      </div>

      {/* Teams Row */}
      <div className="flex items-center justify-center flex-1 gap-3">
        <div className="flex items-center gap-2 w-28 justify-end">
          <span className="text-xs break-words leading-tight max-w-[80px] text-right">
            {team1}
          </span>
          <img src={logo1} alt={team1} className="w-10 h-10 object-contain p-1" />
        </div>
        <span className="text-xs font-semibold w-8 text-center">VS</span>
        <div className="flex items-center gap-2 w-28 justify-start">
          <img src={logo2} alt={team2} className="w-10 h-10 object-contain p-1" />
          <span className="text-xs break-words leading-tight max-w-[80px] text-left">
            {team2}
          </span>
        </div>
      </div>

      {/* Odds Row */}
      <div className="flex gap-2">
        {odds.map((odd, index) => (
          <span
            key={index}
            className="bg-[#2A2A2C] px-4 py-1 rounded-lg text-xs border border-[#464649]"
          >
            {odd}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MatchListContainer;
