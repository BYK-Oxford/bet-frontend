import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";

interface MatchProps {
  league: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
  onBack: () => void; 
}

const MatchDetailHeader: React.FC<MatchProps> = ({league, date, time, team1, team2, logo1, logo2, odds, onBack }) => {
    return (
      <div className="relative bg-[#2E2E30] text-white p-4 flex flex-col rounded-xl items-center w-full min-w-[400px] max-w-[700px] justify-between gap-4 overflow-hidden">
        
        {/* Background Logos */}
        <img 
          src={logo1} 
          alt={team1} 
          className="absolute left-15 top-1/2 transform -translate-y-1/2 opacity-20 w-40 h-40 object-contain filter brightness-25 invert-[15%]"
        />
        <img 
          src={logo2} 
          alt={team2} 
          className="absolute right-15 top-1/2 transform -translate-y-1/2 opacity-20 w-40 h-40 object-contain filter brightness-25 invert-[15%]"
        />

        {/* Header Row */}
        <div className="flex items-center justify-between w-full border-b border-[#464649] pb-2 relative z-10">
          {/* Back Button */}
          <div onClick={onBack}
            className="h-8 w-8 border border-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center 
            text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.1)] cursor-pointer transition-all"
          >
            <ArrowLeft size={16} />
          </div>

          {/* League Name */}
          <h2 className="text-sm font-semibold">{league}</h2>

          {/* Empty div for spacing (to center the league name) */}
          <div className="w-6" />
        </div>
        
        {/* Date and Time */}
        <div className="text-xs flex justify-center text-gray-400 w-full relative z-10">
          <div>{date}, </div>
          <div>{time}</div>
        </div>

        {/* Teams Row - Centered Layout */}
        <div className="flex items-center justify-center flex-1 gap-3 relative z-10">
          {/* Team 1 */}
          <div className="flex items-center gap-2 w-28 justify-end">
            <span className="text-sm font-bold truncate">{team1}</span>
          </div>
          <div className="w-18 h-18 bg-[#2A2A2C] rounded-full flex items-center justify-center my-1">
              <img 
                src={logo1} 
                alt={team1} 
                className="w-10 h-10 object-contain aspect-square"
              />
          </div>

          {/* VS */}
          <span className="text-xs font-semibold w-8 text-center">VS</span>

          {/* Team 2 */}
          <div className="w-18 h-18 bg-[#2A2A2C] rounded-full flex items-center justify-center my-1">
              <img 
                src={logo2} 
                alt={team2} 
                className="w-10 h-10 object-contain aspect-square"
              />
          </div>
          <div className="flex items-center gap-2 w-28 justify-start">
            <span className="text-sm font-bold truncate">{team2}</span>
          </div>
        </div>

        {/* Odds Row */}
        <div className="flex gap-2 relative z-10">
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

export default MatchDetailHeader;
