"use client"; // Add this to ensure the component is client-side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for client-side navigation
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
  date: string;
  league: string;
  time: string;
  team1: string;
  team2: string;
  home_team_primary_color: string | null;
  home_team_secondary_color: string | null;
  away_team_primary_color: string | null;
  away_team_secondary_color: string | null;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
  live_data?: LiveData; // ✅ optional live data
  stats_banded_data?: StatsBandedData;
}

const MatchCard: React.FC<MatchProps> = ({
  matchId,
  league,
  date,
  time,
  team1,
  team2,
  home_team_primary_color,
  home_team_secondary_color,
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
}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will be triggered only on the client side
  }, []);

  // Utility to find the closest StatEntry to live minute
  const getRelevantEntry = (entries: StatEntry[], liveMinute: number) => {
    return (
      [...entries].reverse().find((entry) => liveMinute >= entry.time) ||
      entries[0]
    ); // fallback to first
  };

  const handleCardClick = () => {
    if (!isClient) return;

    const matchData = {
      matchId,
      league,
      date,
      time,
      team1,
      team2,
      home_team_primary_color,
      home_team_secondary_color,
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

    // Store the data in sessionStorage
    sessionStorage.setItem("matchData", JSON.stringify(matchData));

    // Navigate with only matchId in the URL
    router.push(`/match_detail/${matchId}`);
  };

  if (!isClient) return null; // Ensure nothing is rendered on SSR

  let showFireEffect = false;

  if (
    live_data &&
    live_data.live_home_odds &&
    live_data.live_draw_odds &&
    live_data.live_away_odds
  ) {
    // ❌ Disable fire effect if match is full-time
    if (live_data.is_live == false) {
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
      const diffHome = Math.abs(calculated_home_chance - liveHomeChance) * 100;
      // const diffDraw = Math.abs(liveDrawChance - calculated_draw_chance) * 100;
      const diffAway = Math.abs(calculated_away_chance - liveAwayChance) * 100;

      // Step 4: identify who was favorite pre game.
      const maxPreCalc = Math.max(
        calculated_home_chance,
        calculated_away_chance
      );

      // Trigger fire effect only if:
      // 1) Difference >= 20%
      // 2) The pre-calculated chance (home/draw/away) is the largest among the three
      if (
        (diffHome >= 15 && calculated_home_chance === maxPreCalc) ||
        (diffAway >= 15 && calculated_away_chance === maxPreCalc)
      ) {
        showFireEffect = true;
      }

      // Step 5: Check live stats only if fire effect is not already triggered
      if (!showFireEffect && stats_banded_data) {
        const { corners, shots_on_target } = stats_banded_data;

        const checkStat = (
          liveStatHome: number | null,
          liveStatAway: number | null,
          statCategory: StatCategory,
          liveMinute: number,
          liveHomeScore: number | null,
          liveAwayScore: number | null
        ) => {
          //if home live score < = away live score

          if (
            liveStatHome !== null &&
            statCategory.home.length > 0 &&
            liveHomeScore !== null &&
            liveAwayScore !== null &&
            liveHomeScore <= liveAwayScore
          ) {
            const homeEntry = getRelevantEntry(statCategory.home, liveMinute);

            if (liveStatHome > homeEntry.actual) {
              showFireEffect = statCategory.home_correlation > 0;
            }
          }

          // if away live score < = home live score

          if (
            liveStatAway !== null &&
            statCategory.away.length > 0 &&
            liveHomeScore !== null &&
            liveAwayScore !== null &&
            liveAwayScore <= liveHomeScore
          ) {
            const awayEntry = getRelevantEntry(statCategory.away, liveMinute);

            if (liveStatAway > awayEntry.actual) {
              showFireEffect = statCategory.away_correlation > 0;
            }
          }
        };

        if (!showFireEffect && stats_banded_data && live_data?.match_time) {
          const { corners, shots_on_target } = stats_banded_data;
          const liveMinute = parseInt(
            live_data.match_time.replace("'", ""),
            10
          );

          checkStat(
            live_data.corners_home,
            live_data.corners_away,
            corners,
            liveMinute,
            live_data.live_home_score,
            live_data.live_away_score
          );
          checkStat(
            live_data.shots_on_target_home,
            live_data.shots_on_target_away,
            shots_on_target,
            liveMinute,
            live_data.live_home_score,
            live_data.live_away_score
          );
        }
      }
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={`space-y-2 relative bg-[#2E2E30] text-white p-4 rounded-xl flex flex-col items-center w-52 min-h-[160px] cursor-pointer ${
        showFireEffect ? "fire-border" : ""
      }`}
    >
      <div className="text-xs text-gray-400 w-full text-center">
        {(() => {
          const { localDate, localTime } = getLocalDateTime(date, time);
          return (
            <>
              <div className="flex justify-between items-center w-full text-xs text-gray-400">
                {showFireEffect && live_data?.is_live ? (
                  <div className="absolute top-0 left-0 w-6 -m-1 -mt-2">
                    <Image
                      src="/burning.png"
                      alt="fire Image"
                      width={15}
                      height={15}
                    />
                  </div>
                ) : (
                  <div className="w-6" />
                )}
                <div className="text-center flex-1">
                  {localDate}, {localTime}
                </div>
                {live_data?.is_live ? (
                  <div className="flex items-center justify-end w-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </div>
                ) : (
                  <div className="w-6" />
                )}
              </div>

              {live_data?.is_live && live_data.match_time ? (
                <div className="text-green-400 text-[10px] font-semibold">
                  In-Play: {live_data.match_time}'
                </div>
              ) : live_data && !live_data.is_live ? (
                <div className="text-white text-[10px] font-semibold">FT</div>
              ) : null}
            </>
          );
        })()}
      </div>

      {/* Teams and VS */}
      <div className="flex items-start justify-center gap-4 mt-3">
        <div className="flex flex-col items-center w-20">
          <div className="w-12 h-12 bg-[#2A2A2C] rounded-full flex items-center justify-center mb-1">
            <JerseySVG
              bodyColor={home_team_primary_color || "#FFFFFF"}
              accentColor={home_team_secondary_color || "#000000"}
              width={40}
              height={40}
            />
          </div>
          <span className="text-[10px] px-1 text-center break-words leading-tight h-[36px] flex items-center justify-center text-ellipsis overflow-hidden">
            {team1}
          </span>
        </div>

        <div className="flex flex-row items-center min-w-[30px] justify-center h-full">
          {live_data?.is_live ? (
            <span className="text-[12px] font-bold text-green-400">
              {live_data.live_home_score} : {live_data.live_away_score}
            </span>
          ) : live_data ? (
            <span className="text-[12px] font-bold text-white">
              {live_data.live_home_score} : {live_data.live_away_score}
            </span>
          ) : (
            <span className="text-sm">VS</span>
          )}
        </div>

        <div className="flex flex-col items-center w-20">
          <div className="w-12 h-12 bg-[#2A2A2C] rounded-full flex items-center justify-center mb-1">
            <JerseySVG
              bodyColor={away_team_primary_color || "#FFFFFF"}
              accentColor={away_team_secondary_color || "#000000"}
              width={40}
              height={40}
            />
          </div>
          <span className="text-[10px] px-1 text-center break-words leading-tight h-[36px] flex items-center justify-center text-ellipsis overflow-hidden">
            {team2}
          </span>
        </div>
      </div>

      {/* Odds Row */}
      <div className="flex justify-center gap-4 mt-auto">
        {odds.map((odd, index) => (
          <span
            key={index}
            className="bg-[#2A2A2C] px-3 py-1 rounded-lg text-xs border border-[#464649]"
          >
            {odd}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MatchCard;
