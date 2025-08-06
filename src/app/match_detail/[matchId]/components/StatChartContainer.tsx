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
  statLabel: string;
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
  // Safety check
  if (!Array.isArray(statsData) || statsData.length === 0) {
    return (
      <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px] bg-[#2E2E30] rounded-xl">
        <img
          src="/logo2.png"
          alt="Bet Genie Logo"
          className="absolute inset-0 w-80 mx-auto my-auto object-contain opacity-20"
        />
        <p className="relative z-10">
          No statistical data found for the selected metric.
        </p>
      </div>
    );
  }

  // Find the matching stat
  const stat = statsData.find((s) => s.label === statLabel);

  if (!stat) {
    return (
      <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px] bg-[#2E2E30] rounded-xl">
        <img
          src="/logo2.png"
          alt="Bet Genie Logo"
          className="absolute inset-0 w-80 mx-auto my-auto object-contain opacity-20"
        />
        <p className="relative z-10">
          No {statLabel} data available for either team.
        </p>
      </div>
    );
  }

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
        liveActual: 2,
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
        liveTime={22} // current minute
        liveValue={2}
        title={`Home: ${statLabel}`}
      />
      <FootballStatBandedChart
        data={team2Data}
        statLabel={statLabel}
        liveTime={60} // current minute
        liveValue={2}
        title={`Away: ${statLabel}`}
      />
    </div>
  );
};

export default StatChartContainer;
