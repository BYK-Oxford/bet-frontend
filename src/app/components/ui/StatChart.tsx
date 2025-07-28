"use client";
import React from "react";
import type { TooltipProps } from "recharts";
import type { Payload as LegendPayload } from "recharts/types/component/DefaultLegendContent";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatPoint = {
  time: number; // e.g., 0, 15, ..., 90
  stdRange: [number, number]; // [lower bound, upper bound]
  actual: number | null; // actual value at that time
  liveActual?: number | null;
};

type FootballStatBandedChartProps = {
  data: StatPoint[];
  title?: string;
  statLabel?: string;
};

const FootballStatBandedChart: React.FC<FootballStatBandedChartProps> = ({
  data,
  title = "Stat Banded Chart",
  statLabel = "Shots",
}) => {
  // Determine if there's any liveActual data
  const hasLiveActual = data.some(
    (d) => d.liveActual !== null && d.liveActual !== undefined
  );

  // Prepare data for Recharts
  const chartData = data.map((d) => ({
    time: d.time,
    stdRange: d.stdRange,
    actual: d.actual,
    liveActual: d.liveActual ?? null,
  }));

  const renderFilteredTooltip: TooltipProps<number, string>["content"] = ({
    payload,
    label,
  }) => {
    if (!payload || !payload.length) return null;

    const filtered = payload.filter((p) => p.dataKey !== "stdRange");

    return (
      <div className="bg-[#333] p-2 rounded text-xs text-white border border-gray-600">
        <p className="mb-1">{label}’</p>
        {filtered.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  const renderFilteredLegend = ({
    payload = [],
  }: {
    payload?: LegendPayload[];
  }) => {
    const filtered = payload.filter((entry) => {
      if (entry.dataKey === "stdRange") return false;
      if (entry.dataKey === "liveActual" && !hasLiveActual) return false;
      return true;
    });

    return (
      <ul className="flex gap-4 text-xs mt-2 text-white">
        {filtered.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-[300px] bg-[#2E2E30] rounded-xl pb-10 pt-4 px-4 shadow text-white">
      <h2 className="text-sm font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="time"
            stroke="#ccc"
            fontSize={10}
            tickFormatter={(value) => `${value}’`}
          />
          <YAxis stroke="#ccc" fontSize={10} />
          <Tooltip content={renderFilteredTooltip} />
          <Legend content={renderFilteredLegend} />

          {/* Standard deviation range */}
          <Area
            type="monotone"
            dataKey="stdRange"
            stroke="none"
            fill="#aae5e67d"
            connectNulls
            dot={false}
            activeDot={false}
          />

          {/* Actual stat line */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#03BEC2"
            dot={{ r: 2 }}
            name={statLabel}
            isAnimationActive={false}
            connectNulls
          />

          {/* Live stat line (only if exists) */}
          {hasLiveActual && (
            <Line
              type="monotone"
              dataKey="liveActual"
              stroke="#FF5733"
              dot={{ r: 2 }}
              name="Live Stats"
              isAnimationActive={false}
              connectNulls
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FootballStatBandedChart;
