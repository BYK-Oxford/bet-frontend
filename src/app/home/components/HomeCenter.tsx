import React, { useEffect, useState } from "react";
import HomeBanner from "./HomeBanner";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";
import MatchListContainer from "./MatchListContainer";
import MatchListHeader from "./MatchListHeader";

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

const MATCHES_PER_PAGE = 3;

interface HomeCenterProps {
  selectedCountry: string | null;
  selectedLeague: string | null;
  setSelectedLeague: (league: string | null) => void;
}

const HomeCenter: React.FC<HomeCenterProps> = ({
  selectedCountry,
  selectedLeague,
  setSelectedLeague,
}) => {
  const [matches, setMatches] = useState<MatchOdds[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/odds-calculation/calculated-odds");
        if (response.ok) {
          const data = await response.json();
          setMatches(data.calculated_odds);

          const initialIndexes: Record<string, number> = {};
          data.calculated_odds.forEach((match: MatchOdds) => {
            if (!(match.home_team_league in initialIndexes)) {
              initialIndexes[match.home_team_league] = 0;
            }
          });
          setVisibleIndexes(initialIndexes);
        } else {
          console.error("Failed to fetch match data");
        }
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const filteredMatches = selectedCountry
    ? matches.filter(
        (match) =>
          match.home_team_country === selectedCountry || match.away_team_country === selectedCountry
      )
    : matches;

  const filteredByLeague = selectedLeague
    ? filteredMatches.filter(
        (match) =>
          match.home_team_league === selectedLeague || match.away_team_league === selectedLeague
      )
    : filteredMatches;

  const groupedMatches = filteredByLeague.reduce(
    (acc: Record<string, MatchOdds[]>, match: MatchOdds) => {
      if (!acc[match.home_team_league]) {
        acc[match.home_team_league] = [];
      }
      acc[match.home_team_league].push(match);
      return acc;
    },
    {}
  );

  const handlePrev = (league: string) => {
    setVisibleIndexes((prev) => ({
      ...prev,
      [league]: Math.max(prev[league] - MATCHES_PER_PAGE, 0),
    }));
  };

  const handleNext = (league: string, totalMatches: number) => {
    setVisibleIndexes((prev) => ({
      ...prev,
      [league]: Math.min(prev[league] + MATCHES_PER_PAGE, totalMatches - MATCHES_PER_PAGE),
    }));
  };

  return (
    <div className="space-y-4">
      {selectedLeague ? (
        <div className="bg-[#1E1E20] p-4 rounded-lg space-y-4">
          <MatchListHeader
            leagueName={selectedLeague}
            leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
          />
          <div className="bg-[#2E2E30] text-white p-2 rounded-xl w-full min-w-[400px] max-w-[800px] min-h-[200px] h-auto overflow-hidden">
            <div className="space-y-2">
              {filteredByLeague.map((match, index) => (
                <MatchListContainer
                  key={match.odds_calculation_id}
                  matchId={match.odds_calculation_id}
                  date={formatDate(match.date)}
                  time={match.time.slice(0, 5)}
                  team1={match.home_team_name}
                  team2={match.away_team_name}
                  logo1={match.home_team_logo}
                  logo2={match.away_team_logo}
                  odds={[match.home_odds, match.draw_odds, match.away_odds]}
                  isLast={index === filteredByLeague.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <HomeBanner />
          {Object.keys(groupedMatches).map((league) => {
            const matchList = groupedMatches[league];
            const index = visibleIndexes[league] || 0;
            const paginatedMatches = matchList.slice(index, index + MATCHES_PER_PAGE);
            const isFirstPage = index === 0;
            const isLastPage = index + MATCHES_PER_PAGE >= matchList.length;

            return (
              <div key={league}>
                <MatchHeader
                  leagueName={league}
                  leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
                  onPrev={() => handlePrev(league)}
                  onNext={() => handleNext(league, matchList.length)}
                  onSeeAll={() => setSelectedLeague(league)}
                  canPrev={!isFirstPage}
                  canNext={!isLastPage}
                />
                <div className="flex gap-2 overflow-x-auto">
                  {paginatedMatches.map((match) => (
                    <MatchCard
                      key={match.odds_calculation_id}
                      matchId={match.odds_calculation_id}
                      date={formatDate(match.date)}
                      time={match.time.slice(0, 5)}
                      team1={match.home_team_name}
                      team2={match.away_team_name}
                      logo1={match.home_team_logo}
                      logo2={match.away_team_logo}
                      odds={[match.home_odds, match.draw_odds, match.away_odds]}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default HomeCenter;
