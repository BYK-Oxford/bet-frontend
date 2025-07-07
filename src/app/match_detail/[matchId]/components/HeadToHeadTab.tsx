import React from "react";
import teamLogos from "../../../home/components/teamLogos";
import JerseySVG from "../../../components/ui/Jersey";

interface MatchProps {
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

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const HeadToHeadTab: React.FC<{ matches: MatchProps[] }> = ({ matches }) => {
  const [showFullTime, setShowFullTime] = React.useState(true);
  return (
    <>
      <div className="flex justify-end mb-2 items-center gap-2">
        <span className="text-xs text-gray-300">Half-Time</span>
        <button
          onClick={() => setShowFullTime(!showFullTime)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${
            showFullTime ? "bg-[#03BEC2]" : "bg-gray-400"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              showFullTime ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-xs text-gray-300">Full-Time</span>
      </div>
      <div className="flex flex-col space-y-3">
        {matches.length === 0 ? (
          <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px]">
            {/* Background watermark image */}
            <img
              // src="/BetGenieLogo.png"
              src="/logo2.png"
              alt="Bet Genie Logo"
              className="absolute inset-0 w-80 mx-auto my-auto object-contain opacity-20"
            />

            {/* Text on top */}
            <p className="relative z-10">
              No past Head 2 Head matches available.
            </p>
          </div>
        ) : (
          matches.map((match, index) => (
            <div
              key={index}
              className="text-white p-2 flex items-center w-full justify-between gap-4 border-b border-[rgba(255,255,255,0.1)]"
            >
              {/* Date */}
              <div className="text-[10px] text-gray-400">
                {formatDate(match.date)}
              </div>

              {/* Teams Row */}
              <div className="flex items-center justify-center flex-1 gap-3">
                {/* Team 1 */}
                <div className="flex items-center justify-center text-right leading-tight">
                  <span className="text-xs">{match.team1}</span>
                  {/* <img
                  src={teamLogos[match.team1]}
                  alt={match.team1}
                  className="w-8 h-8 object-contain p-1 mt-1"
                /> */}
                  <JerseySVG
                    bodyColor={match.home_team_primary_color || "#FFFFFF"}
                    accentColor={match.home_team_secondary_color || "#000000"}
                    width={30}
                    height={30}
                  />
                </div>

                {/* Score */}
                <span className="text-xs font-semibold w-12 text-center">
                  {showFullTime ? match.score.full : match.score.half}
                </span>

                {/* Team 2 */}
                <div className="flex items-center justify-center text-left leading-tight">
                  {/* <img
                  src={teamLogos[match.team2]}
                  alt={match.team2}
                  className="w-8 h-8 object-contain p-1 mb-1"
                /> */}
                  <JerseySVG
                    bodyColor={match.away_team_primary_color || "#FFFFFF"}
                    accentColor={match.away_team_secondary_color || "#000000"}
                    width={30}
                    height={30}
                  />
                  <span className="text-xs">{match.team2}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HeadToHeadTab;
