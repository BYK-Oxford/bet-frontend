// context/MatchContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

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

interface MatchContextType {
  matches: MatchOdds[];
  loading: boolean;
}

const MatchContext = createContext<MatchContextType>({
  matches: [],
  loading: true,
});

export const useMatchContext = () => useContext(MatchContext);

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<MatchOdds[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://bet-backend-1.onrender.com/odds-calculation/calculated-odds/");
        const data = await res.json();
        const uniqueMatchesMap = new Map<string, MatchOdds>();

        data.calculated_odds.forEach((match: MatchOdds) => {
          const key = `${match.home_team_id}-${match.away_team_id}-${match.date}`;
          if (!uniqueMatchesMap.has(key)) {
            uniqueMatchesMap.set(key, match);
          }
        });

        const uniqueMatches = Array.from(uniqueMatchesMap.values());
        setMatches(uniqueMatches);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <MatchContext.Provider value={{ matches, loading }}>
      {children}
    </MatchContext.Provider>
  );
}
