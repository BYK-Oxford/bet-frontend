"use client";

import React from "react";
import { useRouter } from "next/navigation";
import teamLogos from "./teamLogos";
import JerseySVG from "../../components/ui/Jersey";

interface MatchProps {
  matchId: string;
  league: string;
  date: string;
  time: string;
  team1: string;
  home_team_primary_color: string | null;
  home_team_secondary_color: string | null;
  team2: string;
  away_team_primary_color: string | null;
  away_team_secondary_color: string | null;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
  isLast?: boolean;
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
}

const MatchListContainer: React.FC<MatchProps> = ({
  matchId,
  league,
  date,
  time,
  team1,
  home_team_primary_color,
  home_team_secondary_color,
  team2,
  away_team_primary_color,
  away_team_secondary_color,
  logo1,
  logo2,
  odds,
  calculated_home_chance,
  calculated_draw_chance,
  calculated_away_chance,
  isLast = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Save match data in sessionStorage
    const matchData = {
      matchId,
      league,
      date,
      time,
      team1,
      home_team_primary_color,
      home_team_secondary_color,
      team2,
      away_team_primary_color,
      away_team_secondary_color,
      logo1,
      logo2,
      odds,
      calculated_home_chance,
      calculated_draw_chance,
      calculated_away_chance,
    };

    sessionStorage.setItem("matchData", JSON.stringify(matchData));

    // Navigate using clean URL
    router.push(`/match_detail/${matchId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer hover:bg-[#1a1a1a] transition-all hover:rounded-lg text-white p-2 flex items-center w-full min-w-[400px] max-w-[700px] justify-between gap-4 ${
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
          {/* <img
            src={logo1}
            alt={team1}
            className="w-10 h-10 object-contain p-1"
          /> */}
          <JerseySVG
            bodyColor={home_team_primary_color || "#FFFFFF"}
            accentColor={home_team_secondary_color || "#000000"}
            width={40}
            height={40}
            className="object-contain p-1"
          />
        </div>
        <span className="text-xs font-semibold w-8 text-center">VS</span>
        <div className="flex items-center gap-2 w-28 justify-start">
          {/* <img
            src={logo2}
            alt={team2}
            className="w-10 h-10 object-contain p-1"
          /> */}
          <JerseySVG
            bodyColor={away_team_primary_color || "#FFFFFF"}
            accentColor={away_team_secondary_color || "#000000"}
            width={40}
            height={40}
            className="object-contain p-1"
          />

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
