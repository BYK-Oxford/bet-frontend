import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import JerseySVG from "../../../components/ui/Jersey";
import { getLocalDateTime } from "../../../utils/dateUtils";

interface MatchProps {
  league: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  home_team_primary_color: string;
  home_team_secondary_color: string;
  away_team_primary_color: string;
  away_team_secondary_color: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
  onBack: () => void;
  liveHomeScore?: number | null;
  liveAwayScore?: number | null;
  liveMatchTime?: string | null;
  liveHomeOdds?: number | null;
  liveAwayOdds?: number | null;
  liveDrawOdds?: number | null;
  isLive?: boolean;
}

const MatchDetailHeader: React.FC<MatchProps> = ({
  league,
  date,
  time,
  team1,
  team2,
  home_team_primary_color,
  home_team_secondary_color,
  away_team_primary_color,
  away_team_secondary_color,
  logo1,
  logo2,
  odds,
  onBack,
  liveHomeScore,
  liveAwayScore,
  liveMatchTime,
  liveHomeOdds,
  liveAwayOdds,
  liveDrawOdds,
  isLive,
}) => {
  return (
    <div className="relative bg-[#2E2E30] text-white p-4 flex flex-col rounded-xl items-center w-full sm:max-w-[600px] justify-between gap-4 overflow-hidden">
      {/* Background Logos */}
      {logo1 && (
        <JerseySVG
          bodyColor={home_team_primary_color || "#FFFFFF"}
          accentColor={home_team_secondary_color || "#000000"}
          width={24}
          height={24}
          className="absolute left-1/8 top-1/2 transform -translate-y-1/2 opacity-20 w-24 h-24 sm:w-32 sm:h-32 object-contain filter brightness-25 invert-[15%]"
        />
      )}
      {logo2 && (
        <JerseySVG
          bodyColor={away_team_primary_color || "#FFFFFF"}
          accentColor={away_team_secondary_color || "#000000"}
          width={24}
          height={24}
          className="absolute right-1/8 top-1/2 transform -translate-y-1/2 opacity-20 w-24 h-24 sm:w-32 sm:h-32 object-contain filter brightness-25 invert-[15%]"
        />
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between w-full border-b border-[#464649] pb-2 relative z-10">
        {/* Back Button */}
        <div
          onClick={onBack}
          className="h-8 w-8 border border-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center 
          text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.1)] cursor-pointer transition-all"
        >
          <ArrowLeft size={16} />
        </div>

        {/* League Name */}
        <h2 className="text-sm font-semibold">{league}</h2>

        {/* live beep color or empty space if not live*/}
        {isLive ? (
          <div className="flex items-center justify-end w-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        ) : (
          <div className="w-6" />
        )}
      </div>

      {/* Date and Time */}
      {(() => {
        const { localDate, localTime } = getLocalDateTime(date, time);
        return (
          <div className="text-xs flex-col align-center items-center flex justify-center text-gray-400 w-full relative z-10">
            <div className="flex">
              <div>{localDate},&nbsp;</div>
              <div>{localTime}</div>
            </div>
            {/* Live Match Time below date and time */}
            {isLive && liveMatchTime && (
              <div className="text-green-400 font-semibold text-sm">
                Live Time: {liveMatchTime}
              </div>
            )}
          </div>
        );
      })()}

      {/* Teams Row - Centered Layout */}
      <div className="flex items-center justify-center flex-1 gap-3 relative z-10 px-1">
        {/* Team 1 */}
        <div className="flex items-center gap-2 w-28 justify-end">
          <span className="text-xs sm:text-sm md:text-base break-words leading-tight max-w-[80px] sm:max-w-[100px] md:max-w-none text-right font-bold text-center whitespace-normal">
            {team1}
          </span>
        </div>
        <div className="w-16 h-16 bg-[#2A2A2C] rounded-full flex items-center justify-center my-1">
          {logo1 && (
            <JerseySVG
              bodyColor={home_team_primary_color || "#FFFFFF"}
              accentColor={home_team_secondary_color || "#000000"}
              width={50}
              height={50}
            />
          )}
        </div>

        {/* VS */}

        {isLive && liveHomeScore !== null && liveAwayScore !== null ? (
          <span className="text-md font-extrabold text-green-400">
            {liveHomeScore} : {liveAwayScore}
          </span>
        ) : (
          <span className="text-xs font-semibold w-8 text-center">VS</span>
        )}

        {/* Team 2 */}
        <div className="w-16 h-16 bg-[#2A2A2C] rounded-full flex items-center justify-center my-1">
          {logo2 && (
            <JerseySVG
              bodyColor={away_team_primary_color || "#FFFFFF"}
              accentColor={away_team_secondary_color || "#000000"}
              width={50}
              height={50}
            />
          )}
        </div>
        <div className="flex items-center gap-2 w-28 justify-start">
          <span className="text-xs sm:text-sm md:text-base break-words leading-tight max-w-[80px] sm:max-w-[100px] md:max-w-none text-left font-bold text-center whitespace-normal">
            {team2}
          </span>
        </div>
      </div>

      {/* Live Odds (only show if all live odds are present) */}
      {[liveHomeOdds, liveDrawOdds, liveAwayOdds].every(
        (odd) => typeof odd === "number" && odd > 1
      ) && (
        <div className="relative z-10 mt-2 flex flex-col items-center w-full">
          <span className="text-[10px] text-green-400 mb-1 uppercase tracking-wider">
            Live Odds
          </span>
          <div className="flex gap-2">
            <span className="bg-[#1F4323] px-4 py-1 rounded-lg text-xs border border-green-600 text-green-400">
              {liveHomeOdds}
            </span>
            <span className="bg-[#1F4323] px-4 py-1 rounded-lg text-xs border border-green-600 text-green-400">
              {liveDrawOdds}
            </span>
            <span className="bg-[#1F4323] px-4 py-1 rounded-lg text-xs border border-green-600 text-green-400">
              {liveAwayOdds}
            </span>
          </div>
        </div>
      )}
      {/* pre game odds */}
      <div className="flex gap-2 relative z-10">
        {odds.map((odd, index) => (
          <span
            key={index}
            className="bg-[#2A2A2C] px-4 py-1 rounded-lg text-xs border border-[#464649]"
          >
            {odd}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MatchDetailHeader;
