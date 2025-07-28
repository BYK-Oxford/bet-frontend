"use client";

import React from "react";
import FootballStatBandedChart from "../../../../app/components/ui/StatChart";

type Stats = {
  label: string;
  team1: number;
  team2: number;
};

interface StatChartContainerProps {
  statsData: Stats[];
  statLabel: string; // NEW prop to specify which stat to display
}

type StatPoint = {
  time: number;
  stdRange: [number, number];
  actual: number;
  liveActual?: number | null;
};

const StatChartContainer: React.FC<StatChartContainerProps> = ({
  statsData,
  statLabel,
}) => {
  // Find the stat object based on the statLabel prop
  const stat = statsData.find((s) => s.label === statLabel);
  if (!stat) return null;

  const timeIntervals = [0, 15, 30, 45, 60, 75, 90];

  const getBandedPoints = (avg: number): StatPoint[] => {
    const perMinute = avg / 90;
    return timeIntervals.map((t) => {
      const val = parseFloat((perMinute * t).toFixed(2));
      const std = val * 0.25;
      return {
        time: t,
        stdRange: [val - std, val + std],
        actual: val,
        liveActual: null,
      };
    });
  };

  const team1Data = getBandedPoints(stat.team1);
  const team2Data = getBandedPoints(stat.team2);

  return (
    <div className="flex flex-col sm:flex-row gap-2 bg-[#2E2E30] text-white rounded-xl w-full sm:max-w-[600px]">
      <FootballStatBandedChart
        data={team1Data}
        statLabel={statLabel}
        title={`Home: ${statLabel}`}
      />
      <FootballStatBandedChart
        data={team2Data}
        statLabel={statLabel}
        title={`Away: ${statLabel}`}
      />
    </div>
  );
};

export default StatChartContainer;
