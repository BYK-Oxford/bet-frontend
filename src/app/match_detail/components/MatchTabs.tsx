import React, { useState } from "react";
import StatsTab from "./StatsTab";
import HeadToHeadTab from "./HeadToHeadTab";

const MatchTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"stats" | "headToHead">("stats");

  return (
    <div className="bg-[#2E2E30] text-white p-4 rounded-xl w-full min-w-[400px] max-w-[700px]">
      
      {/* Tab Headers */}
      <div className="flex border-b border-gray-600">
        <button
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === "stats" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === "headToHead" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("headToHead")}
        >
          Head to Head
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "stats" ? <StatsTab /> : <HeadToHeadTab />}
      </div>

    </div>
  );
};

export default MatchTabs;
