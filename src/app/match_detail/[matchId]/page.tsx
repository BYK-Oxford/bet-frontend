"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MatchDetailHeader from "./components/MatchDetailHeader";
import MatchTabs from "./components/MatchTabs";
import MatchSidebar from "./components/MatchSidebar";
import teamLogos from "./../../home/components/teamLogos";

const MatchDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.matchId; // Get current route param

  const [matchData, setMatchData] = useState<null | {
    matchId: string;
    league: string;
    date: string;
    time: string;
    team1: string;
    team2: string;
    logo1: string;
    logo2: string;
    odds: [number, number, number];
    calculated_home_chance: number;
    calculated_draw_chance: number;
    calculated_away_chance: number;
  }>(null);

  // Update matchData whenever the route param `id` changes
  useEffect(() => {
    const data = sessionStorage.getItem("matchData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.matchId === currentId) {
        setMatchData(parsed);
      } else {
        setMatchData(null); // Reset if mismatched (optional safety)
      }
    }
  }, [currentId]);

  if (!matchData) return <div>Loading match details...</div>;

  const { league, matchId, date, time, team1, team2, logo1, logo2, odds, calculated_home_chance, calculated_away_chance, calculated_draw_chance } = matchData;

  return (
    <div className="flex justify-center md:px-2">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full max-w-screen-sm md:max-w-4xl">
        {/* Main Content */}
        <div className="w-full">
          <MatchDetailHeader
            league={league}
            date={date}
            time={time}
            team1={team1}
            team2={team2}
            logo1={teamLogos[team1]}
            logo2={teamLogos[team2]}
            odds={odds}
            onBack={() => router.back()}
          />

          <div className="mt-6">
            <MatchTabs matchId={matchId} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-100 mt-2 md:mt-0">
          <MatchSidebar matchData={matchData} />
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
