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

const MatchTabs: React.FC<{ matchId: string }> = ({ matchId }) => {
  const [activeTab, setActiveTab] = useState<"stats" | "headToHead">("stats");

  const [statsData, setStatsData] = useState<Stats[]>([]);
  const [headToHeadData, setHeadToHeadData] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔁 Replace with your actual backend endpoints
        const statsRes = await fetch(`/api/matches/${matchId}/stats`);
        const headToHeadRes = await fetch(`/api/matches/${matchId}/head-to-head`);

        const stats = await statsRes.json();
        const headToHead = await headToHeadRes.json();

        setStatsData(stats);
        setHeadToHeadData(headToHead);
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
          Stats
        </button>
        <button
          className={`px-4 py-2 text-xs ${
            activeTab === "headToHead" ? "text-[#03BEC2] font-semibold border-b-2 border-[#03BEC2]" : "text-white"
          }`}
          onClick={() => setActiveTab("headToHead")}
        >
          Head to Head
        </button>
      </div>

      {/* Content */}
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
