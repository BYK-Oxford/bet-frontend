"use client";

import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useMatchContext } from "../../../context/MatchContext";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { matches } = useMatchContext();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false); // To toggle nav on small screens

  useEffect(() => {
    // Reset search bar when the path changes
    setQuery("");
  }, [pathname]);

  const filtered =
    query.trim() === ""
      ? []
      : matches.filter(
          (m) =>
            m.home_team_name.toLowerCase().includes(query.toLowerCase()) ||
            m.away_team_name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <header className="relative text-white px-2 py-2 flex justify-between items-center border-b border-[rgba(255,255,255,0.1)]">
      {/* Left side: Logo + Search bar in a row */}
      <div className="flex items-center flex-grow space-x-4">
        {/* Logo */}
        <Link href="/home">
          <div className="flex-shrink-0">
            <Image
              src="/mainLogo.png"
              alt="Bet Genie Logo"
              width={50}
              height={0}
              style={{ width: "140px", height: "auto" }}
              className="block sm:block md:block lg:hidden xl:hidden"
            />
          </div>
        </Link>

        {/* Search bar */}
        <div className="relative w-full max-w-md">
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
            <div className="absolute top-full left-0 right-0 bg-[#2E2E30] rounded shadow-lg mt-1 z-30 max-h-60 overflow-y-auto">
              {filtered.map((match) => (
                <div
                  key={match.odds_calculation_id}
                  className="px-3 py-2 hover:bg-[#333] cursor-pointer text-sm"
                  onClick={() => {
                    setQuery("");
                    const matchData = {
                      matchId: match.odds_calculation_id,
                      league: match.match_league || "Unknown League",
                      date: match.date,
                      time: match.time.slice(0, 5),
                      team1: match.home_team_name,
                      team2: match.away_team_name,
                      logo1: match.home_team_logo,
                      logo2: match.away_team_logo,
                      home_team_primary_color: match.home_team_primary_color,
                      home_team_secondary_color:
                        match.home_team_secondary_color,
                      away_team_primary_color: match.away_team_primary_color,
                      away_team_secondary_color:
                        match.away_team_secondary_color,
                      odds: [match.home_odds, match.draw_odds, match.away_odds],
                      calculated_home_chance: match.calculated_home_chance,
                      calculated_draw_chance: match.calculated_draw_chance,
                      calculated_away_chance: match.calculated_away_chance,
                      liveData: match.live_data,
                    };
                    sessionStorage.setItem(
                      "matchData",
                      JSON.stringify(matchData)
                    );
                    router.push(`/match_detail/${match.odds_calculation_id}`);
                  }}
                >
                  {match.home_team_name} vs {match.away_team_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nav links + profile */}
      <div className="flex items-center space-x-6">
        <nav className="hidden sm:flex">
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Matches
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="text-white p-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isNavOpen && (
        <div className="absolute top-12 right-0 bg-[#2E2E30] w-full p-4 sm:hidden z-20">
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/"
                className="block hover:text-gray-400"
                onClick={() => setIsNavOpen(false)}
              >
                Matches
              </Link>
            </li>
            <li>
              <Link
                href="/home"
                className="block hover:text-gray-400"
                onClick={() => setIsNavOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
