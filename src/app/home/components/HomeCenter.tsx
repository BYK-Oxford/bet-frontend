"use client";
import React, { useEffect, useMemo, useRef } from "react";
import HomeBanner from "./HomeBanner";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";
import MatchListContainer from "./MatchListContainer";
import MatchListHeader from "./MatchListHeader";
import teamLogos from "./teamLogos";
import Image from "next/image";

interface StatEntry {
  time: number;
  actual: number;
  stdRange: [number, number];
}

interface StatCategory {
  home: StatEntry[];
  away: StatEntry[];
  home_correlation: number;
  away_correlation: number;
}

interface StatsBandedData {
  corners: StatCategory;
  shots_on_target: StatCategory;
}

interface LiveData {
  is_live: boolean;
  scrape_url: string;
  live_home_score: number | null;
  live_away_score: number | null;
  match_time: string | null;
  live_home_odds: number | null;
  live_draw_odds: number | null;
  live_away_odds: number | null;
  shots_on_target_home: number | null;
  shots_on_target_away: number | null;
  corners_home: number | null;
  corners_away: number | null;
  last_updated: string | null;
}

interface MatchOdds {
  odds_calculation_id: string;
  date: string;
  time: string;
  home_team_logo: string;
  away_team_logo: string;
  home_team_id: string;
  home_team_name: string;
  home_team_primary_color: string | null;
  home_team_secondary_color: string | null;
  home_team_league: string;
  home_team_country: string;
  match_league: string;
  match_country: string;
  away_team_id: string;
  away_team_name: string;
  away_team_primary_color: string | null;
  away_team_secondary_color: string | null;
  away_team_league: string;
  away_team_country: string;
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
  home_odds: number;
  draw_odds: number;
  away_odds: number;
  live_data?: LiveData; // ✅ optional live data
  stats_banded_data?: StatsBandedData;
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
  matches,
}) => {
  // Create an array of refs for scroll containers
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countryCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const leagueContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll left
  const scrollLeft = (index: number) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index]?.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  // Scroll right
  const scrollRight = (index: number) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index]?.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
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

  const leagueToCountryLogo: Record<string, string> = {
    "English Premier League": "England",
    "English Championship": "England",
    "German Bundesliga": "German",
    "German Bundesliga 2": "German",
    "Italian Serie A": "Italy",
    "Italian Serie B": "Italy",
    "Scottish Premiership": "Scotland",
    "Scottish Championship": "Scotland",
    "Spanish La Liga": "Spain",
    "Spanish Segunda Division": "Spain",
    "Turkish Super League": "Turkey",
    "French Ligue 1": "France",
    "Dutch Eredivisie": "Netherlands",
    "Portuguese Primeira Liga": "Portugal",
  };

  const noMatchesAvailable =
    filteredByLeague.length === 0 &&
    (selectedCountry !== null || selectedLeague !== null);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR check

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) return; // only scroll on mobile

    if (selectedCountry && !selectedLeague) {
      const card = countryCardRefs.current[selectedCountry];
      if (card) {
        const y = card.getBoundingClientRect().top + window.scrollY - 150; // offset 150px
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else if (selectedLeague) {
      const container = leagueContainerRefs.current[selectedLeague];
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCountry, selectedLeague]);

  return (
    <>
      {selectedLeague ? (
        <div className="bg-[#1E1E20] rounded-lg space-y-4">
          <HomeBanner />
          <MatchListHeader
            leagueName={selectedLeague}
            leagueLogo={`/teamlogo/${
              leagueToCountryLogo[selectedLeague] || "default"
            }.png`}
          />
          <div className="bg-[#2E2E30] text-white p-2 rounded-xl w-full max-w-[700px] min-h-[200px] h-auto overflow-hidden">
            <div className="space-y-2">
              {!noMatchesAvailable ? (
                filteredByLeague.map((match, index) => (
                  <div
                    key={`${match.match_league}-${match.odds_calculation_id}`} // unique
                    id={`league-container-${match.match_league.replace(
                      /\s+/g,
                      "-"
                    )}`}
                    ref={(el) => {
                      if (index === 0) {
                        leagueContainerRefs.current[match.match_league] = el;
                      }
                    }}
                    className="flex gap-2 p-2 overflow-x-auto scrollbar-hide"
                  >
                    <MatchListContainer
                      league={match.match_league}
                      matchId={match.odds_calculation_id}
                      date={match.date}
                      time={match.time.slice(0, 5)}
                      team1={match.home_team_name}
                      home_team_primary_color={match.home_team_primary_color}
                      home_team_secondary_color={
                        match.home_team_secondary_color
                      }
                      away_team_primary_color={match.away_team_primary_color}
                      away_team_secondary_color={
                        match.away_team_secondary_color
                      }
                      team2={match.away_team_name}
                      logo1={
                        teamLogos[match.home_team_name] || match.home_team_logo
                      }
                      logo2={
                        teamLogos[match.away_team_name] || match.away_team_logo
                      }
                      odds={[match.home_odds, match.draw_odds, match.away_odds]}
                      isLast={index === filteredByLeague.length - 1}
                      calculated_home_chance={match.calculated_home_chance}
                      calculated_draw_chance={match.calculated_draw_chance}
                      calculated_away_chance={match.calculated_away_chance}
                      live_data={match.live_data}
                      stats_banded_data={match.stats_banded_data}
                    />
                  </div>
                ))
              ) : (
                <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px]">
                  {/* Background watermark image */}

                  <Image
                    src="/logo2.png"
                    alt="Bet Genie Logo"
                    width={128}
                    height={128}
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
          {(() => {
            const allMatches = Object.values(groupedMatches).flat();
            const liveMatches = allMatches.filter(
              (match) => match.live_data?.is_live === true
            );

            return liveMatches.length > 0 ? (
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  {/* Blinking dot */}
                  <div className="flex items-center justify-center w-4 h-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </div>

                  {/* Match Header */}
                  <div className="w-full">
                    <MatchHeader
                      leagueName="In-Play Matches"
                      showSeeAll={false}
                      scrollLeft={() => scrollLeft(-1)}
                      scrollRight={() => scrollRight(-1)}
                    />
                  </div>
                </div>

                <div
                  ref={(el) => {
                    scrollContainerRefs.current[-1] = el; // optional: assign a ref index for live
                  }}
                  className="flex gap-2 p-2 overflow-x-auto scrollbar-hide"
                >
                  {liveMatches.map((match) => (
                    <MatchCard
                      key={`live-${match.odds_calculation_id}`}
                      matchId={match.odds_calculation_id}
                      league={match.match_league}
                      date={match.date}
                      time={match.time.slice(0, 5)}
                      team1={match.home_team_name}
                      team2={match.away_team_name}
                      home_team_primary_color={match.home_team_primary_color}
                      home_team_secondary_color={
                        match.home_team_secondary_color
                      }
                      away_team_primary_color={match.away_team_primary_color}
                      away_team_secondary_color={
                        match.away_team_secondary_color
                      }
                      logo1={
                        teamLogos[match.home_team_name] || match.home_team_logo
                      }
                      logo2={
                        teamLogos[match.away_team_name] || match.away_team_logo
                      }
                      odds={[match.home_odds, match.draw_odds, match.away_odds]}
                      calculated_home_chance={match.calculated_home_chance}
                      calculated_draw_chance={match.calculated_draw_chance}
                      calculated_away_chance={match.calculated_away_chance}
                      live_data={match.live_data}
                      stats_banded_data={match.stats_banded_data}
                    />
                  ))}
                </div>
              </div>
            ) : null;
          })()}
          {noMatchesAvailable ? (
            <div className="relative text-gray-400 text-sm text-center p-4 flex items-center justify-center min-h-[150px]">
              {/* Background watermark image */}

              <Image
                src="/logo2.png"
                alt="Bet Genie Logo"
                width={128}
                height={128}
                className="absolute inset-0 w-32 h-32 mx-auto my-auto object-contain opacity-10 grayscale"
              />

              {/* Text on top */}
              <p className="relative z-10">No future matches currently</p>
            </div>
          ) : (
            Object.entries(groupedMatches).map(([league, matchList], index) => {
              return (
                <div key={`league-${league}`}>
                  <MatchHeader
                    leagueName={league}
                    leagueLogo={
                      matchList.length > 0
                        ? `/teamlogo/${
                            leagueToCountryLogo[league] || "default"
                          }.png`
                        : "/default-league-flag.png"
                    }
                    showSeeAll={true}
                    onSeeAll={() => setSelectedLeague(league)}
                    scrollLeft={() => scrollLeft(index)} // Pass the index
                    scrollRight={() => scrollRight(index)} // Pass the index
                  />
                  <div
                    ref={(el) => {
                      scrollContainerRefs.current[index] = el;
                    }}
                    className="flex gap-2 p-2 overflow-x-auto scrollbar-hide "
                  >
                    {[...matchList] // copy so we don't mutate original
                      .sort((a, b) => {
                        // live matches first
                        if (a.live_data?.is_live && !b.live_data?.is_live)
                          return -1;
                        if (!a.live_data?.is_live && b.live_data?.is_live)
                          return 1;
                        return 0; // keep original order otherwise
                      })
                      .map((match, i) => (
                        <div
                          key={`league-${league}-match-${match.odds_calculation_id}`}
                          ref={(el) => {
                            if (i === 0) {
                              countryCardRefs.current[match.match_country] = el;
                            }
                          }}
                        >
                          <MatchCard
                            matchId={match.odds_calculation_id}
                            league={match.match_league}
                            date={match.date}
                            time={match.time.slice(0, 5)}
                            team1={match.home_team_name}
                            team2={match.away_team_name}
                            home_team_primary_color={
                              match.home_team_primary_color
                            }
                            home_team_secondary_color={
                              match.home_team_secondary_color
                            }
                            away_team_primary_color={
                              match.away_team_primary_color
                            }
                            away_team_secondary_color={
                              match.away_team_secondary_color
                            }
                            logo1={
                              teamLogos[match.home_team_name] ||
                              match.home_team_logo
                            }
                            logo2={
                              teamLogos[match.away_team_name] ||
                              match.away_team_logo
                            }
                            odds={[
                              match.home_odds,
                              match.draw_odds,
                              match.away_odds,
                            ]}
                            calculated_home_chance={
                              match.calculated_home_chance
                            }
                            calculated_draw_chance={
                              match.calculated_draw_chance
                            }
                            calculated_away_chance={
                              match.calculated_away_chance
                            }
                            live_data={match.live_data}
                            stats_banded_data={match.stats_banded_data}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </>
  );
};

export default HomeCenter;
