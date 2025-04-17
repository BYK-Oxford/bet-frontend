import React from "react";

interface Stat {
  label: string;
  team1: number;
  team2: number;
}
const StatsTab: React.FC<{ statsData: Stat[] }> = ({ statsData }) => {
  return (
    <div className="flex flex-col space-y-5">
      {statsData.length === 0 ? (
         <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px]">
         {/* Background watermark image */}
         <img
           src="/football-img.png"
           alt=""
           className="absolute inset-0 w-32 h-32 mx-auto my-auto object-contain opacity-10 grayscale"
         />
         
         {/* Text on top */}
         <p className="relative z-10">No past Head 2 Head stats available.</p>
       </div>
      ) : (
        statsData.map((stat, index) => {
          const max = Math.max(stat.team1, stat.team2);
          const isTeam1Higher = stat.team1 > stat.team2;
          const team1Width = (stat.team1 / max) * 100;
          const team2Width = (stat.team2 / max) * 100;

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-400">
                <span>{stat.team1}</span>
                <span>{stat.label}</span>
                <span>{stat.team2}</span>
              </div>
              <div className="flex h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`${
                    isTeam1Higher ? "bg-[#03BEC2]" : "bg-gray-400"
                  } h-full`}
                  style={{ width: `${team1Width}%` }}
                />
                <div
                  className={`${
                    !isTeam1Higher ? "bg-[#03BEC2]" : "bg-gray-400"
                  } h-full`}
                  style={{ width: `${team2Width}%` }}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StatsTab;
