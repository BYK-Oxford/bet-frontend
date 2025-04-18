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
  const { league, date, team1, team2, odds, calculated_home_chance, calculated_draw_chance, calculated_away_chance } =
    matchData;

  const totalBookmakerProb =
    1 / odds[0] + 1 / odds[1] + 1 / odds[2];

  const data = [
    {
      name: "Home",
      Bookmaker: ((1 / odds[0]) / totalBookmakerProb) * 100,
      OurModel: calculated_home_chance * 100,
    },
    {
      name: "Draw",
      Bookmaker: ((1 / odds[1]) / totalBookmakerProb) * 100,
      OurModel: calculated_draw_chance * 100,
    },
    {
      name: "Away",
      Bookmaker: ((1 / odds[2]) / totalBookmakerProb) * 100,
      OurModel: calculated_away_chance * 100,
    },
  ];

  return (
    <div className="w-60 h-auto bg-[#2E2E30] rounded-xl p-4 shadow text-white">
      <h2 className="text-md font-semibold mb-2">Our Value Prediction</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" fontSize={10} />
          <YAxis stroke="#ccc" fontSize={10} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Bookmaker" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="OurModel" fill="#03BEC2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MatchSidebar;
