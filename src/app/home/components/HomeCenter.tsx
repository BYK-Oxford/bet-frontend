"use client";
import React, { useEffect, useState } from "react";
import HomeBanner from "./HomeBanner";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";

// Type definition for match odds
interface MatchOdds {
  odds_calculation_id: string;
  date: string;
  time: string;
  home_team_logo: string;
  away_team_logo: string;
  home_team_id: string;
  home_team_name: string;
  home_team_league: string;
  away_team_id: string;
  away_team_name: string;
  away_team_league: string;
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
  home_odds: number;
  draw_odds: number;
  away_odds: number;
}

const HomeCenter: React.FC = () => {
  const [matches, setMatches] = useState<MatchOdds[]>([]); // State for storing match data

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
  }, []); // Only run once on mount

  // Helper function to format the date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short',  // Abbreviated month name (e.g., "Apr")
      day: 'numeric'   // Day of the month as a number (e.g., "7")
    };
    return date.toLocaleDateString(undefined, options); // Formats as "Apr 7"
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
  
    // Format the time (Hour and Minute)
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    };
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  
    return formattedTime;
  };

    
  // Group matches by league
  const groupedMatches = matches.reduce((acc: Record<string, MatchOdds[]>, match: MatchOdds) => {
    if (!acc[match.home_team_league]) {
      acc[match.home_team_league] = [];
    }
    acc[match.home_team_league].push(match);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <HomeBanner />

      {/* Render headers and match cards for each league */}
      {Object.keys(groupedMatches).map((league) => (
        <div key={league}>
          <MatchHeader
            leagueName={league}
            leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg" // Modify this for actual league logos
            onPrev={() => console.log("Previous")}
            onNext={() => console.log("Next")}
            onSeeAll={() => console.log("See All")}
          />
          <div className="space-y-4 flex gap-2">
            {groupedMatches[league].map((match, index) => (
              <MatchCard
                matchId={match.odds_calculation_id}
                key={index}
                date={formatDate(match.date)} 
                time={match.time.slice(0, 5)}
                team1={match.home_team_name}
                team2={match.away_team_name}
                logo1="https://brandlogos.net/wp-content/uploads/2025/02/liverpool_f.c.-logo_brandlogos.net_vr9dx-300x548.png"
                logo2="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" 
                odds={[match.home_odds, match.draw_odds, match.away_odds]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCenter;
