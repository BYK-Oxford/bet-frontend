'use client'
import React, {useMemo, useRef } from "react";
import HomeBanner from "./HomeBanner";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";
import MatchListContainer from "./MatchListContainer";
import MatchListHeader from "./MatchListHeader";
import teamLogos from "./teamLogos";

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

interface HomeCenterProps {
  selectedCountry: string | null;
  selectedLeague: string | null;
  setSelectedLeague: (league: string | null) => void;
  matches: MatchOdds[];
}

const HomeCenter: React.FC<HomeCenterProps> = ({
  selectedCountry,
  selectedLeague,
  setSelectedLeague,
  matches
}) => {
  

  // Create an array of refs for scroll containers
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll left
  const scrollLeft = (index: number) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index]?.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  // Scroll right
  const scrollRight = (index: number) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index]?.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const filteredMatches = useMemo(() => {
    return selectedCountry
      ? matches.filter((match) => match.match_country === selectedCountry)
      : matches;
  }, [matches, selectedCountry]);

  const filteredByLeague = useMemo(() => {
    return selectedLeague
      ? filteredMatches.filter((match) => match.match_league === selectedLeague)
      : filteredMatches;
  }, [filteredMatches, selectedLeague]);

  const groupedMatches = useMemo(() => {
    return filteredByLeague.reduce(
      (acc: Record<string, MatchOdds[]>, match: MatchOdds) => {
        if (!acc[match.match_league]) {
          acc[match.match_league] = [];
        }
        acc[match.match_league].push(match);
        return acc;
      },
      {}
    );
  }, [filteredByLeague]);

  return (
    <>
      {selectedLeague ? (
        <div className="bg-[#1E1E20] rounded-lg space-y-4">
          <HomeBanner />

          <MatchListHeader
            leagueName={selectedLeague}
            leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
          />
          <div className="bg-[#2E2E30] text-white p-2 rounded-xl w-full min-w-[400px] max-w-[800px] min-h-[200px] h-auto overflow-hidden">
            <div className="space-y-2">
              {filteredByLeague.length > 0 ? (
                filteredByLeague.map((match, index) => (
                  <MatchListContainer
                    key={match.odds_calculation_id}
                    league={match.match_league}
                    matchId={match.odds_calculation_id}
                    date={formatDate(match.date)}
                    time={match.time.slice(0, 5)}
                    team1={match.home_team_name}
                    team2={match.away_team_name}
                    logo1={teamLogos[match.home_team_name] || match.home_team_logo}
                    logo2={teamLogos[match.away_team_name] || match.away_team_logo}
                    odds={[match.home_odds, match.draw_odds, match.away_odds]}
                    isLast={index === filteredByLeague.length - 1}
                    calculated_home_chance={match.calculated_home_chance}
                    calculated_draw_chance={match.calculated_draw_chance}
                      calculated_away_chance={match.calculated_away_chance}
                    />
                  ))
                ) : (
                  <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px]">
                    {/* Background watermark image */}
                    <img
                      // src="/BetGenieLogo.png"
                      src="/logo2.png"
                      alt="Bet Genie Logo"
                      className="absolute inset-0 w-32 h-32 mx-auto my-auto object-contain opacity-10 grayscale"
                    />
                    
                    {/* Text on top */}
                    <p className="relative z-10">No future matches currently</p>
                  </div>
                )}
              </div>
            </div>
        </div>
      ) : (
        <>
          <HomeBanner />
          {Object.entries(groupedMatches).map(([league, matchList], index) => {
            return (
              <div key={league}>
                <MatchHeader
                  leagueName={league}
                  leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
                  onSeeAll={() => setSelectedLeague(league)}
                  scrollLeft={() => scrollLeft(index)} // Pass the index
                  scrollRight={() => scrollRight(index)} // Pass the index
                />
                <div
                  ref={(el) => { scrollContainerRefs.current[index] = el; }}
                  className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide"
                >
                  {matchList.map((match) => (
                    <MatchCard
                      key={match.odds_calculation_id}
                      matchId={match.odds_calculation_id}
                      league={match.match_league}
                      date={formatDate(match.date)}
                      time={match.time.slice(0, 5)}
                      team1={match.home_team_name}
                      team2={match.away_team_name}
                      logo1={teamLogos[match.home_team_name] || match.home_team_logo}
                      logo2={teamLogos[match.away_team_name] || match.away_team_logo}
                      odds={[match.home_odds, match.draw_odds, match.away_odds]}
                      calculated_home_chance= {match.calculated_home_chance}
                      calculated_draw_chance= {match.calculated_draw_chance}
                      calculated_away_chance= {match.calculated_away_chance}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default HomeCenter;
