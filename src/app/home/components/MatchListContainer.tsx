"use client";

import React from "react";
import { useRouter } from "next/navigation";
import JerseySVG from "../../components/ui/Jersey";
import { getLocalDateTime } from "../../utils/dateUtils";
import Image from "next/image";

interface StatEntry {
  time: number;
  actual: number;
  stdRange: [number, number];
}

interface StatCategory {
  home: StatEntry[];
  away: StatEntry[];
  home_correlation: number;
  away_correlation: number;
}

interface StatsBandedData {
  corners: StatCategory;
  shots_on_target: StatCategory;
}

interface LiveData {
  is_live: boolean;
  scrape_url: string;
  live_home_score: number | null;
  live_away_score: number | null;
  match_time: string | null;
  live_home_odds: number | null;
  live_draw_odds: number | null;
  live_away_odds: number | null;
  shots_on_target_home: number | null;
  shots_on_target_away: number | null;
  corners_home: number | null;
  corners_away: number | null;
  last_updated: string | null;
}

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
  live_data?: LiveData; // ✅ optional live data
  stats_banded_data?: StatsBandedData;
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
  live_data,
  stats_banded_data,
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
      live_data,
      stats_banded_data,
    };

    sessionStorage.setItem("matchData", JSON.stringify(matchData));

    // Navigate using clean URL
    router.push(`/match_detail/${matchId}`);
  };

  let showFireEffect = false;

  if (
    live_data &&
    live_data.live_home_odds &&
    live_data.live_draw_odds &&
    live_data.live_away_odds
  ) {
    // ❌ Disable fire effect if match is full-time
    if (live_data.match_time === "FT") {
      showFireEffect = false;
    } else {
      // Step 1: Full live bookmaker probability
      const liveProb =
        1 / live_data.live_home_odds +
        1 / live_data.live_draw_odds +
        1 / live_data.live_away_odds;

      // Step 2: Individual live chances
      const liveHomeChance = 1 / live_data.live_home_odds / liveProb;
      const liveDrawChance = 1 / live_data.live_draw_odds / liveProb;
      const liveAwayChance = 1 / live_data.live_away_odds / liveProb;

      // Step 3: Calculate difference with pre-calculated chances
      const diffHome = Math.abs(liveHomeChance - calculated_home_chance) * 100;
      // const diffDraw = Math.abs(liveDrawChance - calculated_draw_chance) * 100;
      const diffAway = Math.abs(liveAwayChance - calculated_away_chance) * 100;

      // Step 4: Trigger effect if difference >= 20% for the largest calculated chance
      const maxPreCalc = Math.max(
        calculated_home_chance,
        calculated_away_chance
      );

      // Trigger fire effect only if:
      // 1) Difference >= 20%
      // 2) The pre-calculated chance (home/draw/away) is the largest among the three
      if (
        (diffHome >= 20 && calculated_home_chance === maxPreCalc) ||
        (diffAway >= 20 && calculated_away_chance === maxPreCalc)
      ) {
        showFireEffect = true;
      }

      // Step 5: Check live stats only if fire effect is not already triggered
      if (!showFireEffect && stats_banded_data) {
        const { corners, shots_on_target } = stats_banded_data;

        const checkStat = (
          liveStatHome: number | null,
          liveStatAway: number | null,
          statCategory: StatCategory
        ) => {
          if (
            liveStatHome !== null &&
            liveStatHome > statCategory.home.slice(-1)[0].stdRange[1]
          ) {
            if (statCategory.home_correlation > 0) {
              showFireEffect = true;
            } else {
              showFireEffect = false;
            }
          }

          if (
            liveStatAway !== null &&
            liveStatAway > statCategory.away.slice(-1)[0].stdRange[1]
          ) {
            if (statCategory.away_correlation > 0) {
              showFireEffect = true;
            } else {
              showFireEffect = false;
            }
          }
        };

        checkStat(live_data.corners_home, live_data.corners_away, corners);
        checkStat(
          live_data.shots_on_target_home,
          live_data.shots_on_target_away,
          shots_on_target
        );
      }
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer hover:bg-[#1a1a1a] transition-all hover:rounded-lg text-white p-2 flex flex-col sm:flex-row items-center w-full sm:min-w-[400px] max-w-[700px] justify-between gap-4 ${
        isLast ? "" : "border-b border-[#3a3a3a] pb-4 mb-2"
      } ${showFireEffect ? "fire-border" : ""}`}
    >
      <div className="flex flex-col items-start text-left gap-1">
        {live_data?.is_live ? (
          <div className="flex items-center  w-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        ) : (
          <div className="w-6" />
        )}
        {/* Date and Time */}
        {(() => {
          const { localDate, localTime } = getLocalDateTime(date, time);
          return (
            <div className="text-[10px] text-gray-400 w-20">
              {localDate}, {localTime}
            </div>
          );
        })()}

        {live_data?.is_live && live_data.match_time && (
          <div className="text-green-400 text-[10px] font-semibold">
            In-Play: {live_data?.match_time}
          </div>
        )}
      </div>

      {/* Teams Row */}
      <div className="flex items-center justify-center flex-1 gap-3">
        <div className="flex items-center gap-2 w-28 justify-end">
          <span className="text-[10px] text-right leading-tight break-normal whitespace-normal w-[80px]">
            {team1}
          </span>

          <JerseySVG
            bodyColor={home_team_primary_color || "#FFFFFF"}
            accentColor={home_team_secondary_color || "#000000"}
            width={40}
            height={40}
            className="shrink-0"
          />
        </div>

        <span className="text-xs font-semibold w-8 text-center">
          {live_data?.is_live ? (
            <span className="text-green-400">
              {live_data.live_home_score} : {live_data.live_away_score}
            </span>
          ) : (
            "VS"
          )}
        </span>

        <div className="flex items-center gap-2 w-28 justify-start">
          <JerseySVG
            bodyColor={away_team_primary_color || "#FFFFFF"}
            accentColor={away_team_secondary_color || "#000000"}
            width={40}
            height={40}
            className="shrink-0"
          />

          <span className="text-[10px] text-left leading-tight break-normal whitespace-normal w-[80px]">
            {team2}
          </span>
        </div>
      </div>

      {/* Odds Row */}
      <div className="flex gap-2 min-w-[130px] justify-end">
        {odds.map((odd, index) => (
          <span
            key={index}
            className="bg-[#2A2A2C] w-12 text-center py-1 rounded-lg text-xs border border-[#464649]"
          >
            {odd}
          </span>
        ))}
      </div>

      {/* Flame at Top-Right */}
      {showFireEffect && (
        <div className="absolute top-0 right-0 -m-2 -mr-3 w-6">
          <Image src="/burning.png" alt="fire icon" width={15} height={15} />
        </div>
      )}
    </div>
  );
};

export default MatchListContainer;
