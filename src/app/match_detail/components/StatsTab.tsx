import React from "react";

const statsData = [
  { label: "Goals Half Time", team1: 5, team2: 15 },
  { label: "Goals Full Time", team1: 8, team2: 20 },
  { label: "Average Corners", team1: 16, team2: 8 },
  { label: "Average Yellow Cards", team1: 16, team2: 8 },
  { label: "Average Red Cards", team1: 16, team2: 8 },
];

const StatsTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      {statsData.map((stat, index) => {
        const max = Math.max(stat.team1, stat.team2);
        const isTeam1Higher = stat.team1 > stat.team2;
        
        const team1Width = (stat.team1 / max) * 100;
        const team2Width = (stat.team2 / max) * 100;

        return (
          <div key={index} className="w-full">
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <span>{stat.team1}</span>
              <span>{stat.label}</span>
              <span>{stat.team2}</span>
            </div>
            <div className="flex h-2 mt-1 bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`${isTeam1Higher ? "bg-cyan-400" : "bg-gray-400"} h-full`}
                style={{ width: `${team1Width}%` }}
              />
              <div
                className={`${!isTeam1Higher ? "bg-cyan-400" : "bg-gray-400"} h-full`}
                style={{ width: `${team2Width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsTab;
