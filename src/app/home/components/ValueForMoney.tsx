"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import teamLogos from "./teamLogos";

interface MatchOdds {
  odds_calculation_id: string;
  date: string;
  time: string;
  home_team_logo: string;
  away_team_logo: string;
  home_team_id: string;
  home_team_name: string;
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
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export default function ValueForMoney({ matches }: Props) {
  const router = useRouter();

  if (!matches) {
    return <div className="text-white p-4">Loading matches...</div>; // Show a loading state if matches is undefined
  }

  const sortedMatches = [...matches].sort((a, b) => {
    const probA = 1 / a.home_odds + 1 / a.draw_odds + 1 / a.away_odds;
    const probB = 1 / b.home_odds + 1 / b.draw_odds + 1 / b.away_odds;

    const bookmakerPctA = [
      (1 / a.home_odds) / probA,
      (1 / a.draw_odds) / probA,
      (1 / a.away_odds) / probA,
    ];
    const bookmakerPctB = [
      (1 / b.home_odds) / probB,
      (1 / b.draw_odds) / probB,
      (1 / b.away_odds) / probB,
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
      league:match.match_league,
      date: formatDate(match.date),
      time: match.time.slice(0,5),
      team1: match.home_team_name,
      team2: match.away_team_name,
      logo1: teamLogos[match.home_team_name],
      logo2: teamLogos[match.away_team_name],
      odds: [match.home_odds, match.draw_odds, match.away_odds],
    };
  
    sessionStorage.setItem("matchData", JSON.stringify(matchData));
    router.push(`/match_detail/${match.odds_calculation_id}`);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Value For Money</h1>
      <div className="w-full py-2 px-2 bg-[#2E2E30] text-white rounded-lg">
        <div>
          {sortedMatches.slice(0, 13).map((match, index) => {
            const bookmakerProb =
              1 / match.home_odds + 1 / match.draw_odds + 1 / match.away_odds;

            const bookmakerHomePct = (1 / match.home_odds) / bookmakerProb;
            const bookmakerDrawPct = (1 / match.draw_odds) / bookmakerProb;
            const bookmakerAwayPct = (1 / match.away_odds) / bookmakerProb;

            const diffHome =
              match.calculated_home_chance * 100 - bookmakerHomePct * 100;
            const diffDraw =
              match.calculated_draw_chance * 100 - bookmakerDrawPct * 100;
            const diffAway =
              match.calculated_away_chance * 100 - bookmakerAwayPct * 100;

            const maxDiff = Math.max(diffHome, diffDraw, diffAway);

            return (
              <div
                key={match.odds_calculation_id}
                onClick={() => handleClick(match)}
                className={`cursor-pointer flex items-center justify-between p-4 hover:bg-[#1a1a1a] transition-all hover:rounded-lg ${
                  index !== 12 ? "border-b border-[#3a3a3a] pb-4 mb-2" : ""
                }`}
              >
                {/* Teams */}
                <div className="flex items-center space-x-2">
                  <Image
                    src={teamLogos[match.home_team_name] || match.home_team_logo}
                    alt={match.home_team_name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                  <span className="text-gray-400 text-[8px]">vs</span>
                  <Image
                    src={teamLogos[match.away_team_name] || match.away_team_logo}
                    alt={match.away_team_name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Differences */}
                <div className="flex flex-col text-[8px] font-mono items-end">
                  <span
                    className={`${
                      diffHome === maxDiff
                        ? "text-green-300 text-[10px] font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    H: {diffHome.toFixed(2)}%
                  </span>
                  <span
                    className={`${
                      diffDraw === maxDiff
                        ? "text-green-300 text-[10px] font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    D: {diffDraw.toFixed(2)}%
                  </span>
                  <span
                    className={`${
                      diffAway === maxDiff
                        ? "text-green-300 text-[10px] font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    A: {diffAway.toFixed(2)}%
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
