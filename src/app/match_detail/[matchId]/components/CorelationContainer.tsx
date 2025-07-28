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
  return (
    <div className="w-full sm:w-auto h-auto bg-[#2E2E30] rounded-xl p-4 shadow text-white">
      <h2 className="text-md font-semibold mb-4">📊 Correlation Table</h2>

      <pre className="text-xs overflow-x-auto">
        {JSON.stringify(rawData, null, 2)}
      </pre>
    </div>
  );
};

export default CorrelationContainer;
