"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import teamLogos from "./teamLogos";
import JerseySVG from "../../components/ui/Jersey";

interface MatchOdds {
  odds_calculation_id: string;
  date: string;
  time: string;
  home_team_logo: string;
  away_team_logo: string;
  home_team_id: string;
  home_team_name: string;
  home_team_primary_color: string | null;
  home_team_secondary_color: string | null;
  away_team_primary_color: string | null;
  away_team_secondary_color: string | null;
  home_team_league: string;
  home_team_country: string;
  match_league: string;
  match_country: string;
  away_team_id: string;
  away_team_name: string;
  away_team_league: string;
  away_team_country: string;
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
  home_odds: number;
  draw_odds: number;
  away_odds: number;
}

interface Props {
  matches: MatchOdds[] | undefined; // Ensure that matches can be undefined or empty initially
  selectedCountry: string | null;
  selectedLeague: string | null;
}

export default function ValueForMoney({
  matches,
  selectedCountry,
  selectedLeague,
}: Props) {
  const router = useRouter();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate Tuesday of this week
  const tuesday = new Date(today);

  // JS Sunday = 0, Monday = 1, ..., Saturday = 6
  // We want week to start on Tuesday (2)
  const diffToTuesday =
    dayOfWeek === 0 ? -5 : dayOfWeek === 1 ? 1 : 2 - dayOfWeek;
  tuesday.setDate(today.getDate() + diffToTuesday);
  tuesday.setHours(0, 0, 0, 0);

  // Calculate next Monday (end of the week)
  const nextMonday = new Date(tuesday);
  nextMonday.setDate(tuesday.getDate() + 6);
  nextMonday.setHours(23, 59, 59, 999);

  if (!matches) {
    return <div className="text-white p-4">Loading matches...</div>; // Show a loading state if matches is undefined
  }
  const filteredMatches = matches
    .filter((match) => {
      // Country & League filter
      const countryMatch =
        !selectedCountry || match.match_country === selectedCountry;
      const leagueMatch =
        !selectedLeague || match.match_league === selectedLeague;
      return countryMatch && leagueMatch;
    })
    .filter((match) => {
      // Week filter
      const matchDate = new Date(match.date);
      return matchDate >= tuesday && matchDate <= nextMonday;
    });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const probA = 1 / a.home_odds + 1 / a.draw_odds + 1 / a.away_odds;
    const probB = 1 / b.home_odds + 1 / b.draw_odds + 1 / b.away_odds;

    const bookmakerPctA = [
      1 / a.home_odds / probA,
      1 / a.draw_odds / probA,
      1 / a.away_odds / probA,
    ];
    const bookmakerPctB = [
      1 / b.home_odds / probB,
      1 / b.draw_odds / probB,
      1 / b.away_odds / probB,
    ];

    const maxDiffA = Math.max(
      a.calculated_home_chance - bookmakerPctA[0],
      a.calculated_draw_chance - bookmakerPctA[1],
      a.calculated_away_chance - bookmakerPctA[2]
    );

    const maxDiffB = Math.max(
      b.calculated_home_chance - bookmakerPctB[0],
      b.calculated_draw_chance - bookmakerPctB[1],
      b.calculated_away_chance - bookmakerPctB[2]
    );

    return maxDiffB - maxDiffA;
  });

  const handleClick = (match: MatchOdds) => {
    const matchData = {
      matchId: match.odds_calculation_id,
      league: match.match_league,
      date: match.date,
      time: match.time.slice(0, 5),
      team1: match.home_team_name,
      team2: match.away_team_name,
      home_team_primary_color: match.home_team_primary_color,
      home_team_secondary_color: match.home_team_secondary_color,
      away_team_primary_color: match.away_team_primary_color,
      away_team_secondary_color: match.away_team_secondary_color,
      logo1: teamLogos[match.home_team_name],
      logo2: teamLogos[match.away_team_name],
      odds: [match.home_odds, match.draw_odds, match.away_odds],
      calculated_home_chance: match.calculated_home_chance,
      calculated_draw_chance: match.calculated_draw_chance,
      calculated_away_chance: match.calculated_away_chance,
    };

    sessionStorage.setItem("matchData", JSON.stringify(matchData));
    router.push(`/match_detail/${match.odds_calculation_id}`);
  };

  return (
    <>
      <div className="flex flex-row items-start relative group">
        <h1 className="text-xl flex-1 font-bold mb-4">Value For Money</h1>

        <div className="w-8 h-8 text-[10px] text-[#03BEC2] font-bold border border-[#03BEC2] rounded-full flex items-center justify-center relative hover:z-10">
          V4M
          {/* Tooltip */}
          <div className="absolute text-[10px] top-full mt-2 left-1/2 -translate-x-[95%] bg-[#161616] text-white text-xs px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-lg w-48 text-left">
            V4M known as Value for Money is where the calculated chance of
            winning is greater than the return (what bookmakers value the chance
            of winning of that option)
            <br />
            <br />
            In basic terms it is not a guaranteed win but it is where you get
            the maximum return with the calculated risk - where the arbitrage is
            in favour at the peak point.
          </div>
        </div>
      </div>

      <div className="w-full py-2 bg-[#2E2E30] text-white rounded-lg">
        <div>
          {sortedMatches.slice(0, 13).map((match, index) => {
            const bookmakerProb =
              1 / match.home_odds + 1 / match.draw_odds + 1 / match.away_odds;

            const bookmakerHomePct = 1 / match.home_odds / bookmakerProb;
            const bookmakerDrawPct = 1 / match.draw_odds / bookmakerProb;
            const bookmakerAwayPct = 1 / match.away_odds / bookmakerProb;

            const diffHome =
              match.calculated_home_chance * 100 - bookmakerHomePct * 100;
            const diffDraw =
              match.calculated_draw_chance * 100 - bookmakerDrawPct * 100;
            const diffAway =
              match.calculated_away_chance * 100 - bookmakerAwayPct * 100;

            const maxDiff = Math.max(diffHome, diffDraw, diffAway);
            if (maxDiff <= 9) return null;
            return (
              <div
                key={match.odds_calculation_id}
                onClick={() => handleClick(match)}
                className={`cursor-pointer flex items-center justify-between hover:bg-[#1a1a1a] transition-all hover:rounded-lg ${
                  index !== 12 ? "border-b border-[#3a3a3a] py-2 mb-2" : ""
                }`}
              >
                {/* Teams with names below logos */}
                <div className="flex items-center justify-start gap-2 px-2 flex-1">
                  {/* Home Team */}
                  <div className="flex flex-col items-center w-[50px] h-[60px]">
                    <JerseySVG
                      bodyColor={match.home_team_primary_color || "#FFFFFF"}
                      accentColor={match.home_team_secondary_color || "#000000"}
                      width={28}
                      height={28}
                    />
                    <div className="w-full text-center mt-1 h-[30px] overflow-hidden leading-tight">
                      <span className="text-[8px] text-gray-300 block">
                        {match.home_team_name}
                      </span>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="w-[10px] flex justify-center">
                    <span className="text-gray-400 text-[8px]">vs</span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center w-[50px] h-[60px]">
                    <JerseySVG
                      bodyColor={match.away_team_primary_color || "#FFFFFF"}
                      accentColor={match.away_team_secondary_color || "#000000"}
                      width={28}
                      height={28}
                    />
                    <div className="w-full text-center mt-1 h-[30px] overflow-hidden leading-tight">
                      <span className="text-[8px] text-gray-300 block">
                        {match.away_team_name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Differences */}
                <div className="flex flex-col text-[8px] font-mono items-end px-2">
                  <span
                    className={`flex items-center gap-1 ${
                      diffHome === maxDiff
                        ? "text-[#03BEC2] text-[12px] font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {diffHome === maxDiff && (
                      <>
                        <span className="w-6 h-6 flex items-center justify-center text-[8px] border border-[#03BEC2] rounded-full">
                          V4M
                        </span>
                        <span className="text-[#03BEC2]">-</span>
                      </>
                    )}
                    Home
                  </span>

                  <span
                    className={`flex items-center gap-1 ${
                      diffDraw === maxDiff
                        ? "text-[#03BEC2] text-[12px] font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {diffDraw === maxDiff && (
                      <>
                        <span className="w-6 h-6 flex items-center justify-center text-[8px] border border-[#03BEC2] rounded-full">
                          V4M
                        </span>
                        <span className="text-[#03BEC2]">-</span>
                      </>
                    )}
                    Draw
                  </span>

                  <span
                    className={`flex items-center gap-1 ${
                      diffAway === maxDiff
                        ? "text-[#03BEC2] text-[12px] font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {diffAway === maxDiff && (
                      <>
                        <span className="w-6 h-6 flex items-center justify-center text-[8px] border border-[#03BEC2] rounded-full">
                          V4M
                        </span>
                        <span className="text-[#03BEC2]">-</span>
                      </>
                    )}
                    Away
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
