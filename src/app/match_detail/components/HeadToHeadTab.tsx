import React from "react";

interface MatchProps {
  date: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  score: string;
}

const HeadToHeadTab: React.FC<{ matches: MatchProps[] }> = ({ matches }) => {
  return (
    <div className="flex flex-col space-y-3">
      {matches.map((match, index) => (
        <div
          key={index}
          className="text-white p-2 flex items-center w-full min-w-[400px] max-w-[700px] justify-between gap-4 border-b border-gray-700"
        >
          {/* Date */}
          <div className="text-xs text-gray-400 w-20">{match.date}</div>

          {/* Teams Row */}
          <div className="flex items-center justify-center flex-1 gap-3">
            {/* Team 1 */}
            <div className="flex items-center gap-2 w-28 justify-end">
              <span className="text-xs truncate">{match.team1}</span>
              <img src={match.logo1} alt={match.team1} className="w-6 h-6 object-contain p-1" />
            </div>

            {/* Score */}
            <span className="text-sm font-semibold w-12 text-center">{match.score}</span>

            {/* Team 2 */}
            <div className="flex items-center gap-2 w-28 justify-start">
              <img src={match.logo2} alt={match.team2} className="w-6 h-6 object-contain p-1" />
              <span className="text-xs truncate">{match.team2}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadToHeadTab;
