'use client';

import Link from 'next/link';
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useMatchContext } from "../../../context/MatchContext";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { matches } = useMatchContext();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };


  const filtered =
    query.trim() === ""
      ? []
      : matches.filter(
          m =>
            m.home_team_name.toLowerCase().includes(query.toLowerCase()) ||
            m.away_team_name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <header className="relative text-white px-6 py-2 flex justify-between items-center border-b border-[rgba(255,255,255,0.1)]">
      {/* Search bar */}
      <div className="relative w-72">
        <div className="flex items-center space-x-2 bg-[#2E2E30] px-3 py-2 rounded">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search matches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-white placeholder-[#7C7C7F] placeholder:text-xs text-sm focus:outline-none w-full"
          />
        </div>

        {/* Dropdown Results */}
        {filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-[#2E2E30] rounded shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
            {filtered.map((match) => (
              <div
                key={match.odds_calculation_id}
                className="px-3 py-2 hover:bg-[#333] cursor-pointer text-sm"
                onClick={() => {
                  setQuery("");
                  const matchData = {
                    matchId: match.odds_calculation_id,
                    league: match.match_league || "Unknown League", 
                    date: formatDate(match.date),
                    time: match.time.slice(0,5),
                    team1: match.home_team_name,
                    team2: match.away_team_name,
                    logo1: match.home_team_logo,
                    logo2: match.away_team_logo,
                    odds: [match.home_odds,match.draw_odds,match.away_odds], // ensure it's an array
                    calculated_home_chance: match.calculated_home_chance,
                    calculated_draw_chance: match.calculated_draw_chance,
                    calculated_away_chance: match.calculated_away_chance,
                  };
                
                  sessionStorage.setItem("matchData", JSON.stringify(matchData));
                  router.push(`/match_detail/${match.odds_calculation_id}`);
                }}
              >
                {match.home_team_name} vs {match.away_team_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nav links + profile */}
      <div className="flex items-center space-x-6">
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Matches
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
          </ul>
        </nav>
        {/* <div className="w-10 h-10 bg-gray-600 rounded-full"></div> */}
      </div>
    </header>
  );
}
