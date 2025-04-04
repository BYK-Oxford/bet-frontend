import React, { useState } from "react";
import StatsTab from "./StatsTab";
import HeadToHeadTab from "./HeadToHeadTab";

const matchData = [
  {
    date: "9 Nov, 2021",
    team1: "Manchester United",
    team2: "Manchester City",
    logo1: "https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg",
    logo2: "https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png",
    score: "2 - 4",
  },
  {
    date: "9 Nov, 2020",
    team1: "Manchester United",
    team2: "Manchester City",
    logo1: "https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg",
    logo2: "https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png",
    score: "0 - 1",
  },
  {
    date: "5 Oct, 2019",
    team1: "Manchester United",
    team2: "Manchester City",
    logo1: "https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg",
    logo2: "https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png",
    score: "1 - 4",
  },
  {
    date: "2 Sep, 2018",
    team1: "Manchester United",
    team2: "Manchester City",
    logo1: "https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg",
    logo2: "https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png",
    score: "2 - 0",
  },
  {
    date: "1 Nov, 2017",
    team1: "Manchester United",
    team2: "Manchester City",
    logo1: "https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg",
    logo2: "https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png",
    score: "2 - 1",
  },
];



const MatchTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"stats" | "headToHead">("stats");

  return (
    <div className="bg-[#2E2E30] text-white p-4 rounded-xl w-full min-w-[400px] max-w-[700px]">
      {/* Tab Headers */}
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

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "stats" ? <StatsTab /> : <HeadToHeadTab matches={matchData} />}
      </div>
    </div>
  );
};

export default MatchTabs;
