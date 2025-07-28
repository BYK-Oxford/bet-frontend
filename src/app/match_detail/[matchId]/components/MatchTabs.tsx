"use client";

import React, { useState } from "react";
import StatsTab from "./StatsTab";
import HeadToHeadTab from "./HeadToHeadTab";

interface HistoricMatch {
  date: string;
  team1: string;
  team2: string;
  home_team_primary_color: string | null;
  home_team_secondary_color: string | null;
  away_team_primary_color: string | null;
  away_team_secondary_color: string | null;
  logo1: string;
  logo2: string;
  score: {
    full: string;
    half: string;
  };
}

interface Stats {
  label: string;
  team1: number;
  team2: number;
}

interface MatchTabsProps {
  statsData: Stats[];
  headToHeadData: HistoricMatch[];
}

const MatchTabs: React.FC<MatchTabsProps> = ({ statsData, headToHeadData }) => {
  const [activeTab, setActiveTab] = useState<"stats" | "headToHead">("stats");

  return (
    <div className="bg-[#2E2E30] text-white p-4 rounded-xl w-full sm:max-w-[600px]">
      {/* Tabs */}
      <div className="flex justify-start border-b border-[rgba(255,255,255,0.1)]">
        <button
          className={`px-4 py-2 text-xs w-auto mb-2 ${
            activeTab === "stats"
              ? "text-[#03BEC2] font-semibold border-b-2 border-[#03BEC2]"
              : "text-white"
          }`}
          onClick={() => setActiveTab("stats")}
        >
          H2H Stats
        </button>

        <button
          className={`px-4 py-2 text-xs w-auto mb-2 ${
            activeTab === "headToHead"
              ? "text-[#03BEC2] font-semibold border-b-2 border-[#03BEC2]"
              : "text-white"
          }`}
          onClick={() => setActiveTab("headToHead")}
        >
          H2H Results
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
