"use client";
import React, { useState, useLayoutEffect, useEffect } from "react";
import HomeCenter from "./components/HomeCenter";
import HomeSidebar from "./components/HomeSidebar";
import ValueForMoney from "./components/ValueForMoney";

interface MatchOdds {
  odds_calculation_id: string;
  date: string;
  time: string;
  home_team_logo: string;
  away_team_logo: string;
  home_team_id: string;
  home_team_name: string;
  home_team_league: string;
  home_team_country: string;
  match_league: string;
  match_country: string;
  away_team_id: string;
  away_team_name: string;
  away_team_league: string;
  away_team_country: string;
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
  home_odds: number;
  draw_odds: number;
  away_odds: number;
}

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [matches, setMatches] = useState<MatchOdds[]>([]);

  let leftContainer = 200;
  let rightContainer = 240;
  let centerContainer = width - (leftContainer + rightContainer + 200);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/odds-calculation/calculated-odds");
        if (response.ok) {
          const data = await response.json();
          setMatches(data.calculated_odds);
        } else {
          console.error("Failed to fetch match data");
        }
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="flex flex-row justify-between w-full gap-4 p-4 overflow-hidden">
      {/* Sidebar (Left Side) */}
      <div style={{ width: leftContainer }}>
        <HomeSidebar
          onSelectCountry={setSelectedCountry}
          onSelectLeague={setSelectedLeague}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
        />
      </div>

      {/* Main Content (Center) */}
      <div style={{ width: centerContainer }}>
        <HomeCenter
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
          matches={matches}
        />
      </div>

      {/* Right Side */}
      <div style={{ width: rightContainer }}>
        <ValueForMoney matches={matches} />
      </div>
    </div>
  );
}
