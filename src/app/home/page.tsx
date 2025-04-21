"use client";
import React, { useState, useLayoutEffect } from "react";
import HomeCenter from "./components/HomeCenter";
import HomeSidebar from "./components/HomeSidebar";
import ValueForMoney from "./components/ValueForMoney";
import { useMatchContext } from "../../context/MatchContext";

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [width, setWidth] = useState(0);

  const { matches, loading } = useMatchContext();

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

  return (
    <div className="flex flex-row justify-between w-full gap-4 p-4 overflow-hidden">
      <div style={{ width: leftContainer }}>
        <HomeSidebar
          onSelectCountry={setSelectedCountry}
          onSelectLeague={setSelectedLeague}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
        />
      </div>

      <div style={{ width: centerContainer }}>
        <HomeCenter
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
          matches={matches}
        />
      </div>

      <div style={{ width: rightContainer }}>
        <ValueForMoney matches={matches} />
      </div>
    </div>
  );
}
