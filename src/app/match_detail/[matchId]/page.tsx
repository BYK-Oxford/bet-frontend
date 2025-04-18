"use client"; // Ensures this component is client-side

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for client-side navigation
import MatchDetailHeader from "./components/MatchDetailHeader";
import MatchTabs from "./components/MatchTabs";
import MatchSidebar from "./components/MatchSidebar"; 

const MatchDetailPage = () => {
  const router = useRouter();

  // State to hold match data from sessionStorage, including matchId
  const [matchData, setMatchData] = useState<null | {
    matchId: string; // Add matchId to the type
    league: string,
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

  // Read the match data from sessionStorage on component mount
  useEffect(() => {
    const data = sessionStorage.getItem("matchData");
    if (data) {
      const parsed = JSON.parse(data);
      setMatchData(parsed);
    }
  }, []);

  // If matchData is not loaded yet, show a loading state
  if (!matchData) return <div>Loading match details...</div>;

  const { league, matchId, date, time, team1, team2, logo1, logo2, odds, calculated_home_chance, calculated_away_chance, calculated_draw_chance } = matchData;

  return (
    <div className="flex justify-center p-4">
      <div className="flex gap-6 items-start w-full max-w-4xl">
        {/* Main Section */}
        <div className="flex-grow">
          <MatchDetailHeader
            league={league}
            date={date}
            time={time}
            team1={team1}
            team2={team2}
            logo1={logo1}
            logo2={logo2}
            odds={odds}
            onBack={() => router.back()}
          />

          <div className="mt-6">
            {/* Pass the matchId to MatchTabs */}
            <MatchTabs matchId={matchId} />
          </div>
        </div>

        {/* Sidebar */}
        <MatchSidebar matchData={matchData} />
        
      </div>
    </div>
  );
};

export default MatchDetailPage;
