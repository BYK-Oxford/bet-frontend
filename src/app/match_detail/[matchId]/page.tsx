"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MatchDetailHeader from "./components/MatchDetailHeader";
import MatchTabs from "./components/MatchTabs";
import StatChartContainer from "./components/StatChartContainer";
import MatchSidebar from "./components/MatchSidebar";
import teamLogos from "./../../home/components/teamLogos";
import CorelationContainer from "./components/CorelationContainer";
import MatchTips from "./components/MatchTips";

// 🧠 Types
interface LiveData {
  is_live: boolean;
  scrape_url: string;
  live_home_score: number | null;
  live_away_score: number | null;
  match_time: string | null;
  live_home_odds: number | null;
  live_draw_odds: number | null;
  live_away_odds: number | null;
  shots_on_target_home: number | null;
  shots_on_target_away: number | null;
  corners_home: number | null;
  corners_away: number | null;
  last_updated: string | null;
}

type RawMatchDataType = {
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
  statistics: {
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
  };
};

type MatchDataType = {
  matchId: string;
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
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
};

type Stats = {
  label: string;
  team1: number;
  team2: number;
};

type HistoricMatch = {
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
};

const MatchDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.matchId;

  const [matchData, setMatchData] = useState<MatchDataType | null>(null);
  const [rawMatchData, setRawMatchData] = useState<RawMatchDataType[]>([]);
  const [historicStats, setHistoricStats] = useState<Stats[]>([]);
  const [historicMatches, setHistoricMatches] = useState<HistoricMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState<LiveData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("matchData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.matchId === currentId) {
        setMatchData(parsed);
        if (parsed.live_data) {
          setLiveData(parsed.live_data);
        }
      } else {
        setMatchData(null);
        setLiveData(null);
      }
    }
  }, [currentId]);

  useEffect(() => {
    const data = sessionStorage.getItem("matchData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.matchId === currentId) {
        setMatchData(parsed);
      } else {
        setMatchData(null);
      }
    }
  }, [currentId]);

  useEffect(() => {
    const fetchHistoricData = async () => {
      if (!currentId) return;

      try {
        const res = await fetch(
          `http://localhost:8000/match-statistics/matches/historic/${currentId}`
        );
        const rawData = await res.json();
        setRawMatchData(rawData);

        if (rawData.length === 0) {
          setHistoricStats([]);
          setHistoricMatches([]);
          return;
        }

        const statLabels = [
          { key: "shots", label: "Average Shots" },
          { key: "shots_on_target", label: "Average Shots on Target" },
          { key: "fouls", label: "Average Fouls" },
          { key: "corners", label: "Average Corners" },
          { key: "yellow_cards", label: "Average Yellow Cards" },
          { key: "red_cards", label: "Average Red Cards" },
        ];

        function getStat(
          statistics: Record<string, number>,
          key: string
        ): number {
          return statistics[key] ?? 0;
        }

        const stats = statLabels.map(({ key, label }) => {
          let totalHome = 0;
          let totalAway = 0;

          rawData.forEach((match: { statistics: Record<string, number> }) => {
            totalHome += getStat(match.statistics, `${key}_home`);
            totalAway += getStat(match.statistics, `${key}_away`);
          });

          const count = rawData.length || 1;

          return {
            label,
            team1: Math.round(totalHome / count),
            team2: Math.round(totalAway / count),
          };
        });

        // Calculate Shots on Target / Shots ratio for each team
        // Reuse from existing stats array
        const avgShots = stats.find((s) => s.label === "Average Shots");
        const avgShotsOnTarget = stats.find(
          (s) => s.label === "Average Shots on Target"
        );

        let accuracyHome = 0;
        let accuracyAway = 0;

        if (avgShots && avgShotsOnTarget) {
          accuracyHome =
            avgShots.team1 === 0
              ? 0
              : parseFloat(
                  ((avgShotsOnTarget.team1 / avgShots.team1) * 100).toFixed(1)
                );
          accuracyAway =
            avgShots.team2 === 0
              ? 0
              : parseFloat(
                  ((avgShotsOnTarget.team2 / avgShots.team2) * 100).toFixed(1)
                );
        }

        // Add to stats array
        stats.push({
          label: "Average Shots Accuracy",
          team1: accuracyHome,
          team2: accuracyAway,
        });

        const matches = rawData.map((match: RawMatchDataType) => ({
          date: match.date,
          team1: match.home_team_name,
          team2: match.away_team_name,
          home_team_primary_color: match.home_primary_color,
          home_team_secondary_color: match.home_secondary_color,
          away_team_primary_color: match.away_primary_color,
          away_team_secondary_color: match.away_secondary_color,
          logo1: "",
          logo2: "",
          score: {
            full: `${match.statistics.full_time_home_goals}-${match.statistics.full_time_away_goals}`,
            half: `${match.statistics.half_time_home_goals}-${match.statistics.half_time_away_goals}`,
          },
        }));

        setHistoricStats(stats);
        setHistoricMatches(matches);
      } catch (error) {
        console.error("Failed to fetch historic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricData();
  }, [currentId]);

  if (!matchData || loading) return <div>Loading match details...</div>;

  return (
    <div className="flex justify-center md:px-2">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full max-w-screen-sm md:max-w-4xl">
        {/* Main Content */}
        <div className="w-full">
          <MatchDetailHeader
            league={matchData.league}
            date={matchData.date}
            time={matchData.time}
            team1={matchData.team1}
            team2={matchData.team2}
            home_team_primary_color={matchData.home_team_primary_color}
            home_team_secondary_color={matchData.home_team_secondary_color}
            away_team_primary_color={matchData.away_team_primary_color}
            away_team_secondary_color={matchData.away_team_secondary_color}
            logo1={teamLogos[matchData.team1]}
            logo2={teamLogos[matchData.team2]}
            odds={matchData.odds}
            onBack={() => router.push("/home")}
            liveHomeScore={liveData?.live_home_score}
            liveAwayScore={liveData?.live_away_score}
            liveMatchTime={liveData?.match_time}
            liveHomeOdds={liveData?.live_home_odds}
            liveAwayOdds={liveData?.live_away_odds}
            liveDrawOdds={liveData?.live_draw_odds}
            isLive={liveData?.is_live ?? false}
          />

          <div className="mt-6">
            <MatchTabs
              statsData={historicStats}
              headToHeadData={historicMatches}
            />
          </div>

          {historicStats.some((s) => s.label === "Average Corners") && (
            <div className="mt-6">
              <StatChartContainer
                statsData={historicStats}
                statLabel="Average Corners"
                liveTime={Number(liveData?.match_time)}
                liveHomeValue={liveData?.corners_home ?? undefined}
                liveAwayValue={liveData?.corners_away ?? undefined}
              />
            </div>
          )}

          {historicStats.some((s) => s.label === "Average Shots on Target") && (
            <div className="mt-6">
              <StatChartContainer
                statsData={historicStats}
                statLabel="Average Shots on Target"
                liveTime={Number(liveData?.match_time)}
                liveHomeValue={liveData?.shots_on_target_home ?? undefined}
                liveAwayValue={liveData?.shots_on_target_away ?? undefined}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5 w-full md:w-100 mt-2 md:mt-0">
          <MatchSidebar matchData={matchData} />
          <CorelationContainer rawData={rawMatchData} />
          <MatchTips />
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
