"use client";

import React, { useEffect, useState } from "react";
import StatsTab from "./StatsTab";
import HeadToHeadTab from "./HeadToHeadTab";

interface Match {
  date: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  score: string;
}

interface Stats {
  label: string;
  team1: number;
  team2: number;
}

interface RawMatch {
  date: string;
  home_team_name: string;
  away_team_name: string;
  statistics: Record<string, number | string>;
}

const MatchTabs: React.FC<{ matchId: string }> = ({ matchId }) => {
  const [activeTab, setActiveTab] = useState<"stats" | "headToHead">("stats");

  const [statsData, setStatsData] = useState<Stats[]>([]);
  const [headToHeadData, setHeadToHeadData] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/match-statistics/matches/historic/${matchId}`);
        const rawData: RawMatch[] = await res.json();

        if (rawData.length === 0) {
          setStatsData([]);
          setHeadToHeadData([]);
          return;
        }

        // ⚙️ Define stat keys and labels
        const statLabels = [
          { key: "shots", label: "Average Shots" },
          { key: "shots_on_target", label: "Average Shots on Target" },
          { key: "fouls", label: "Average Fouls" },
          { key: "corners", label: "Average Corners" },
          { key: "yellow_cards", label: "Average Yellow Cards" },
          { key: "red_cards", label: "Average Red Cards" },
        ];

        // 📊 Average calculation
        const stats = statLabels.map(({ key, label }) => {
          let totalHome = 0;
          let totalAway = 0;

          rawData.forEach((match) => {
            totalHome += match.statistics[`${key}_home`] as number;
            totalAway += match.statistics[`${key}_away`] as number;
          });

          const count = rawData.length;

          return {
            label,
            team1: Math.round(totalHome / count),
            team2: Math.round(totalAway / count),
          };
        });

        // 🤝 Create head-to-head match data
        const matches: Match[] = rawData.map((match) => ({
          date: match.date,
          team1: match.home_team_name,
          team2: match.away_team_name,
          logo1: "", // Add team logo URLs if available
          logo2: "",
          score: `${match.statistics.full_time_home_goals}-${match.statistics.full_time_away_goals}`,
        }));

        setStatsData(stats);
        setHeadToHeadData(matches);
      } catch (error) {
        console.error("Failed to fetch match data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchId]);

  if (loading) return <div className="text-white p-4">Loading stats...</div>;

  return (
    <div className="bg-[#2E2E30] text-white p-4 rounded-xl w-full min-w-[400px] max-w-[700px]">
      {/* Tabs */}
      <div className="flex border-b border-[rgba(255,255,255,0.1)]">
        <button
          className={`px-4 py-2 text-xs ${
            activeTab === "stats" ? "text-[#03BEC2] font-semibold border-b-2 border-[#03BEC2]" : "text-white"
          }`}
          onClick={() => setActiveTab("stats")}
        >
          H2H Stats
        </button>
        <button
          className={`px-4 py-2 text-xs ${
            activeTab === "headToHead" ? "text-[#03BEC2] font-semibold border-b-2 border-[#03BEC2]" : "text-white"
          }`}
          onClick={() => setActiveTab("headToHead")}
        >
          H2H Results
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "stats" ? (
          <StatsTab statsData={statsData} />
        ) : (
          <HeadToHeadTab matches={headToHeadData} />
        )}
      </div>
    </div>
  );
};

export default MatchTabs;
