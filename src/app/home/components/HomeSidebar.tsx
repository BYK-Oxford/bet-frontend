import { useState } from "react";
import InfoBox from "./InfoBox";

type HomeSidebarProps = {
  onSelectCountry: (country: string | null) => void;
  onSelectLeague: (league: string | null) => void;
  selectedCountry: string | null;
  selectedLeague: string | null;
};

export default function HomeSidebar({
  onSelectCountry,
  onSelectLeague,
  selectedCountry,
  selectedLeague,
}: HomeSidebarProps) {
  // Handle country selection
  const handleCountryClick = (country: string) => {
    onSelectCountry(country);
    onSelectLeague(null); // Clear league
  };

  // Handle league selection
  const handleLeagueClick = (league: string) => {
    onSelectLeague(league);
    onSelectCountry(null); // Clear country
  };

  const clearCountry = () => onSelectCountry(null);
  const clearLeague = () => onSelectLeague(null);

  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full h-full">
      <div className="w-full lg:w-full md:w-1/2">
        <InfoBox
          title="Top Leagues"
          items={[
            {
              name: "English Premier League",
              src: "/teamlogo/English Premier League.png",
            },
            { name: "Scottish Premier League", src: "/teamlogo/Scottish.png" },
            {
              name: "English Championship",
              src: "/teamlogo/English Championship.png",
            },
            { name: "Scottish Championship", src: "/teamlogo/Scottish.png" },
            { name: "Süper Lig", src: "/teamlogo/Super Lig.png" },
            { name: "Serie A", src: "/teamlogo/Serie A.png" },
            { name: "Serie B", src: "/teamlogo/Serie B.png" },
            { name: "La Liga", src: "/teamlogo/La Liga.png" },
            { name: "La Liga 2", src: "/teamlogo/La Liga2.png" },
            { name: "Bundesliga", src: "/teamlogo/Bundesliga.png" },
            { name: "Bundesliga 2", src: "/teamlogo/Bundesliga 2.png" },
          ]}
          onItemClick={handleLeagueClick}
          selectedItem={selectedLeague}
          onClear={clearLeague}
        />
      </div>

      <div className="w-full lg:w-full md:w-1/2">
        <InfoBox
          title="Country"
          items={[
            { name: "England", src: "/teamlogo/England.png" },
            { name: "Scotland", src: "/teamlogo/Scotland.png" },
            { name: "Turkey", src: "/teamlogo/Turkey.png" },
            { name: "Italy", src: "/teamlogo/Italy.png" },
            { name: "Spain", src: "/teamlogo/Spain.png" },
            { name: "German", src: "/teamlogo/German.png" },
          ]}
          onItemClick={handleCountryClick}
          selectedItem={selectedCountry}
          onClear={clearCountry}
        />
      </div>
    </div>
  );
}
