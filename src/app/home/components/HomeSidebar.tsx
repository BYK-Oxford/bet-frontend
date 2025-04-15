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
    <div className="space-y-4">
      <InfoBox
        title="Top Leagues"
        items={[
          { name: "English Premier League", src: "/teamlogo/English Premier League.png" },
          { name: "Scottish Premier League", src: "/teamlogo/Scottish.png" },
          { name: "English Championship", src: "/teamlogo/English Championship.png" },
          { name: "Scottish Championship", src: "/teamlogo/Scottish.png" }
        ]}
        onItemClick={handleLeagueClick}
        selectedItem={selectedLeague}
        onClear={clearLeague}
      />

      <InfoBox
        title="Country"
        items={[
          { name: "England", src: "/teamlogo/England.png" },
          { name: "Scotland", src: "/teamlogo/Scotland.png" },
        ]}
        onItemClick={handleCountryClick}
        selectedItem={selectedCountry}
        onClear={clearCountry}
      />
    </div>
  );
}
