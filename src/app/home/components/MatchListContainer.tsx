import React from "react";

interface MatchProps {
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
}

const MatchListContainer: React.FC<MatchProps> = ({ date, time, team1, team2, logo1, logo2, odds }) => {
    return (
      <div className="text-white p-2 flex items-center w-full min-w-[400px] max-w-[700px] justify-between gap-4">
        {/* Date and Time */}
        <div className="text-xs text-gray-400 w-20">{date}, {time}</div>

        {/* Teams Row - Centered Layout */}
        <div className="flex items-center justify-center flex-1 gap-3">
          {/* Team 1 */}
          <div className="flex items-center gap-2">
            <span className="text-xs truncate">{team1}</span>
            <img src={logo1} alt={team1} className="w-10 h-10 object-contain p-1" />
          </div>

          <span className="text-xs font-semibold">VS</span>

          {/* Team 2 */}
          <div className="flex items-center gap-2">
            <img src={logo2} alt={team2} className="w-10 h-10 object-contain p-1" />
            <span className="text-xs truncate">{team2}</span>
          </div>
        </div>

        {/* Odds Row */}
        <div className="flex gap-2">
          {odds.map((odd, index) => (
            <span 
              key={index} 
              className="bg-[#2A2A2C] px-4 py-1 rounded-lg text-xs border border-[#464649]">
              {odd}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
export default MatchListContainer;
