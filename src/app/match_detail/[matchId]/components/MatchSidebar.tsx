"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList, LabelProps
} from "recharts";

type MatchData = {
  matchId: string;
  league: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number]; // [home, draw, away]
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
};

const MatchSidebar = ({ matchData }: { matchData: MatchData }) => {
  const { odds, calculated_home_chance, calculated_draw_chance, calculated_away_chance } =
    matchData;

  const totalBookmakerProb = 1 / odds[0] + 1 / odds[1] + 1 / odds[2];

  const data = [
    {
      name: "Home",
      Bookmaker: ((1 / odds[0]) / totalBookmakerProb) * 100,
      BetGenie: calculated_home_chance * 100,
    },
    {
      name: "Draw",
      Bookmaker: ((1 / odds[1]) / totalBookmakerProb) * 100,
      BetGenie: calculated_draw_chance * 100,
    },
    {
      name: "Away",
      Bookmaker: ((1 / odds[2]) / totalBookmakerProb) * 100,
      BetGenie: calculated_away_chance * 100,
    },
  ];

  // Find the index with the maximum difference for BetGenie only
  const maxDiffIndex = data.reduce(
    (maxIdx, curr, idx, arr) => {
      const currDiff = Math.abs(curr.Bookmaker - curr.BetGenie);
      const maxDiff = Math.abs(arr[maxIdx].Bookmaker - arr[maxIdx].BetGenie);
      return currDiff > maxDiff ? idx : maxIdx;
    },
    0
  );

  return (
    <div className="w-full sm:w-60 h-auto bg-[#2E2E30] rounded-xl p-4 shadow text-white">
      <h2 className="text-md font-semibold mb-2">Our Value Prediction</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
          barCategoryGap="10%"
          barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" fontSize={10} />
          <YAxis
            stroke="#ccc"
            fontSize={10}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              border: "none",
              borderRadius: "6px", fontSize: "10px",
            }}
            labelStyle={{ color: "#fff", fontSize: "10px" }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
          />
          <Legend
            verticalAlign="top"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: "10px",
              marginTop: "-20px",
              marginBottom: "10px",
            }}
            formatter={(value) => {
              if (value === "Bookmaker")
                return <span style={{ color: "#888" }}>Bookmaker</span>;
              if (value === "BetGenie")
                return <span style={{ color: "#03BEC2" }}>BetGenie</span>;
              return value;
            }}
          />
          {/* Bookmaker Bar */}
          <Bar dataKey="Bookmaker" fill="#555" barSize={10} radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="Bookmaker"
              content={({ x, y, index }) =>
                index === maxDiffIndex && index !== data.findIndex(d => d.name === "Draw") ? null : null // Do not render stars for Bookmaker
              }
            />
          </Bar>
          {/* BetGenie Bar */}
          <Bar dataKey="BetGenie" fill="#03BEC2" barSize={10} radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="BetGenie"
              content={({ x, y, index }: LabelProps) => {
                if (typeof index !== "number") return null;

                const betGenieVal = data[index].BetGenie;
                const bookmakerVal = data[index].Bookmaker;
                const diff = betGenieVal - bookmakerVal;

                const isMaxDiff = index === maxDiffIndex;
                const isPositiveGain = diff > 0;

                return isMaxDiff && isPositiveGain ? (
                  <text
                    x={Number(x) + 5}
                    y={Number(y) - 8}
                    fill="#03BEC2"
                    fontSize={14}
                    textAnchor="middle"
                  >
                    ★
                  </text>
                ) : null;
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MatchSidebar;
