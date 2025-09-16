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
              src: "/teamlogo/England.png",
            },
            {
              name: "English Championship",
              src: "/teamlogo/England.png",
            },
            { name: "Scottish Premiership", src: "/teamlogo/Scotland.png" },
            { name: "Scottish Championship", src: "/teamlogo/Scotland.png" },
            { name: "Italian Serie A", src: "/teamlogo/Italy.png" },
            { name: "Italian Serie B", src: "/teamlogo/Italy.png" },
            { name: "Spanish La Liga", src: "/teamlogo/Spain.png" },
            { name: "Spanish Segunda Division", src: "/teamlogo/Spain.png" },
            { name: "German Bundesliga", src: "/teamlogo/German.png" },
            { name: "German Bundesliga 2", src: "/teamlogo/German.png" },
            { name: "French Ligue 1", src: "/teamlogo/France.png" },
            { name: "Turkish Super League", src: "/teamlogo/Turkey.png" },
            // { name: "Portuguese Primeria Liga", src: "/teamlogo/Turkey.png" },
            // { name: "Dutch Eredivise", src: "/teamlogo/Turkey.png" },
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
            { name: "Italy", src: "/teamlogo/Italy.png" },
            { name: "Spain", src: "/teamlogo/Spain.png" },
            { name: "German", src: "/teamlogo/German.png" },
            { name: "France", src: "/teamlogo/France.png" },
            { name: "Turkey", src: "/teamlogo/Turkey.png" },
            // { name: "Portugal", src: "/teamlogo/Turkey.png" },
            // { name: "Netherlands", src: "/teamlogo/Turkey.png" },
          ]}
          onItemClick={handleCountryClick}
          selectedItem={selectedCountry}
          onClear={clearCountry}
        />
      </div>
    </div>
  );
}
