import React from "react";
import { sampleCorrelation } from "simple-statistics";

interface MatchStatistics {
  full_time_home_goals: number;
  full_time_away_goals: number;
  full_time_result: "H" | "A" | "D";
  half_time_home_goals: number;
  half_time_away_goals: number;
  half_time_result: "H" | "A" | "D";
  shots_home: number;
  shots_away: number;
  shots_on_target_home: number;
  shots_on_target_away: number;
  fouls_home: number;
  fouls_away: number;
  corners_home: number;
  corners_away: number;
  yellow_cards_home: number;
  yellow_cards_away: number;
  red_cards_home: number;
  red_cards_away: number;
}

interface MatchData {
  match_id: string;
  date: string;
  home_team_id: string;
  away_team_id: string;
  home_team_name: string;
  away_team_name: string;
  home_primary_color: string | null;
  home_secondary_color: string | null;
  away_primary_color: string | null;
  away_secondary_color: string | null;
  statistics: MatchStatistics;
}

interface CorrelationContainerProps {
  rawData: MatchData[];
}

const CorrelationContainer: React.FC<CorrelationContainerProps> = ({
  rawData,
}) => {
  if (!rawData || !Array.isArray(rawData) || rawData.length < 2) {
    return (
      <div className="w-full sm:w-auto h-auto bg-[#2E2E30] rounded-xl p-3 shadow text-white flex items-center justify-center min-h-[150px] relative">
        <img
          src="/logo2.png"
          alt="No Data Logo"
          className="absolute inset-0 w-80 mx-auto my-auto object-contain opacity-20"
        />
        <p className="relative z-10 text-gray-300 text-sm text-center">
          No data available to calculate correlation for past 5 years.
        </p>
      </div>
    );
  }

  // Extract arrays
  const homeCorners = rawData.map((m) => m.statistics.corners_home);
  const homeGoals = rawData.map((m) => m.statistics.full_time_home_goals);
  const homeShotsOnTarget = rawData.map(
    (m) => m.statistics.shots_on_target_home
  );

  const awayCorners = rawData.map((m) => m.statistics.corners_away);
  const awayGoals = rawData.map((m) => m.statistics.full_time_away_goals);
  const awayShotsOnTarget = rawData.map(
    (m) => m.statistics.shots_on_target_away
  );

  // Shots Accuracy (as percentage)
  const homeShotsAccuracy = rawData.map((m) =>
    m.statistics.shots_home > 0
      ? (m.statistics.shots_on_target_home / m.statistics.shots_home) * 100
      : 0
  );

  const awayShotsAccuracy = rawData.map((m) =>
    m.statistics.shots_away > 0
      ? (m.statistics.shots_on_target_away / m.statistics.shots_away) * 100
      : 0
  );

  // Calculate correlations
  const homeCornersGoalsCorr = sampleCorrelation(homeCorners, homeGoals);
  const homeShotsGoalsCorr = sampleCorrelation(homeShotsOnTarget, homeGoals);
  const homeShotsAccrCorr = sampleCorrelation(homeShotsAccuracy, homeGoals);

  const awayCornersGoalsCorr = sampleCorrelation(awayCorners, awayGoals);
  const awayShotsGoalsCorr = sampleCorrelation(awayShotsOnTarget, awayGoals);
  const awayShotsAccrCorr = sampleCorrelation(awayShotsAccuracy, homeGoals);

  return (
    <div className="w-full sm:w-auto h-auto bg-[#2E2E30] rounded-xl p-3 shadow text-white">
      <h2 className="text-md font-semibold mb-4">Correlation Table</h2>
      <table className="w-full text-left border-collapse bg-[#2E2E30] rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.1)]">
            <th className="py-2 text-sm font-semibold text-gray-300">Metric</th>
            <th className="py-2 text-sm font-semibold text-gray-300">Home</th>
            <th className="py-2 text-sm font-semibold text-gray-300">Away</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[rgba(255,255,255,0.1)] last:border-none">
            <td className="py-2 text-xs text-gray-200">Corners vs Goals</td>
            <td className="py-2 text-xs text-gray-200">
              {homeCornersGoalsCorr.toFixed(3)}
            </td>
            <td className="py-2 text-xs text-gray-200">
              {awayCornersGoalsCorr.toFixed(3)}
            </td>
          </tr>
          <tr className="border-b border-gray-700 last:border-none">
            <td className="py-2 text-xs text-gray-200">
              Shots on Target vs Goals
            </td>
            <td className="py-2 text-xs text-gray-200">
              {homeShotsGoalsCorr.toFixed(3)}
            </td>
            <td className="py-2 text-xs text-gray-200">
              {awayShotsGoalsCorr.toFixed(3)}
            </td>
          </tr>
          <tr className="border-b border-gray-700 last:border-none">
            <td className="py-2 text-xs text-gray-200">Shots Accuracy</td>
            <td className="py-2 text-xs text-gray-200">
              {homeShotsAccrCorr.toFixed(3)}
            </td>
            <td className="py-2 text-xs text-gray-200">
              {awayShotsAccrCorr.toFixed(3)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CorrelationContainer;
