"use client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import HomeCenter from "./HomeCenter";
import HomeSidebar from "./HomeSidebar";
import ValueForMoney from "./ValueForMoney";
import { useMatchContext } from "../../../context/MatchContext";
import TermsModal from "./../../components/ui/TermsModal";

export default function HomeContent() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const { matches, loading } = useMatchContext();

  let leftContainer = 200;
  let rightContainer = 240;
  let centerContainer = width - (leftContainer + rightContainer + 200);

  useLayoutEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted");
    if (!accepted) {
      setShowTerms(true);
    }
  }, []);

  const handleAccept = () => setShowTerms(false);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row justify-between w-full gap-4 overflow-hidden">
      {showTerms && <TermsModal onAccept={handleAccept} />}

      {/* Sidebar comes first on small screen */}
      <div
        className={`order-1 md:order-none`}
        style={{
          width: width >= 1024 ? `${leftContainer}px` : "100%",
          flexShrink: 0,
        }}
      >
        <HomeSidebar
          onSelectCountry={setSelectedCountry}
          onSelectLeague={setSelectedLeague}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
        />
      </div>

      {/* Center content appears second on small screens */}
      <div
        className="w-full lg:w-auto order-2 md:order-none"
        style={{ width: width >= 1024 ? centerContainer : "100%" }}
      >
        <HomeCenter
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
          matches={matches}
        />
      </div>

      {/* ValueForMoney comes last on all screens */}
      <div
        className="w-full md:w-1/4 lg:w-1/5 order-3 md:order-none"
        style={{
          width: width >= 1024 ? rightContainer : "100%",
          minHeight: 500,
        }}
      >
        <ValueForMoney
          matches={matches}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
        />
      </div>
    </div>
  );
}
