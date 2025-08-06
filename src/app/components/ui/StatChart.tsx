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
  Scatter,
  ResponsiveContainer,
  ReferenceLine,
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
  liveTime?: number;
  liveValue?: number;
};

const FootballStatBandedChart: React.FC<FootballStatBandedChartProps> = ({
  data,
  title = "Stat Banded Chart",
  statLabel = "Shots",
  liveTime,
  liveValue,
}) => {
  const findNearestTimeIndex = (data: StatPoint[], liveTime: number) => {
    let nearestIndex = 0;
    let minDiff = Infinity;

    data.forEach((d, i) => {
      const diff = Math.abs(d.time - liveTime);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = i;
      }
    });

    return nearestIndex;
  };

  const nearestIndex =
    liveTime !== undefined ? findNearestTimeIndex(data, liveTime) : -1;

  // Prepare data for Recharts
  const chartData = data.map((d, i) => ({
    time: d.time,
    stdRange: d.stdRange,
    actual: d.actual,
    liveActual:
      liveTime !== undefined && liveValue !== undefined && i === nearestIndex
        ? liveValue
        : null,
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

  // Flatten all values to calculate Y-axis bounds
  const allYValues = chartData.flatMap((d) => [
    d.actual,
    d.liveActual,
    ...(d.stdRange ?? []),
  ]);

  const validYValues = allYValues.filter(
    (v): v is number => v !== null && v !== undefined
  );
  const maxY = Math.ceil(Math.max(...validYValues));

  const step = Math.ceil(maxY / 5); // or any number of steps you want
  const ticks = Array.from({ length: 6 }, (_, i) => i * step);

  const FootballIcon = (props: any) => {
    const { cx, cy, size = 20 } = props; // cx, cy are passed by Recharts for positioning

    return (
      <svg
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="#FF6F61"
          stroke="#333"
          strokeWidth="2"
        />
        <path
          d="M32 2a30 30 0 0 1 21 51L32 32 11 53A30 30 0 0 1 32 2z"
          fill="#fff"
          stroke="#333"
          strokeWidth="2"
        />
        {/* You can add more details here */}
      </svg>
    );
  };

  return (
    <div className="w-full h-[300px] bg-[#2E2E30] rounded-xl pb-10 pt-4 px-4 text-white">
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
            domain={[0, 90]}
            type="number"
            ticks={[0, 15, 30, 45, 60, 75, 90]}
          />
          <YAxis
            stroke="#ccc"
            fontSize={10}
            domain={[0, maxY]}
            ticks={ticks} // or tweak as needed
          />
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

          {/* Live dot */}
          {liveTime !== undefined && liveValue !== undefined && (
            <Scatter
              data={chartData}
              dataKey="liveActual"
              fill="#FF6F61"
              name="Live"
              shape="circle"
              line={{ connectNulls: false }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FootballStatBandedChart;
