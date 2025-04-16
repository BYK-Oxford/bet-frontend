"use client";
import React, { useState, useLayoutEffect } from "react";
import HomeCenter from "./components/HomeCenter";
import HomeSidebar from "./components/HomeSidebar";
import ValueForMoney from "./components/ValueForMoney";

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [width, setWidth] = useState(0);

  let leftContainer = 200;
  let rightContainer = 250;
  let centerContainer= width-(leftContainer+rightContainer+200)
  

  const handleSelectCountry = (country: string | null) => {
    setSelectedCountry(country);
  };

  const handleSelectLeague = (league: string | null) => {
    setSelectedLeague(league);
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Initial resize call to get window width
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  // Empty dependency array means it runs once when the component mounts


  
  return (
    <div className="flex flex-row justify-between w-full gap-4 p-4 overflow-hidden">
      {/* Sidebar (Left Side) */}
      <div style={{
        width:leftContainer
      }}>
        <HomeSidebar 
          onSelectCountry={handleSelectCountry} 
          onSelectLeague={handleSelectLeague}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
        />
        
      </div>

      {/* Main Content (Right Side) */}
      <div style={{
        width: centerContainer
      }}>
        <HomeCenter selectedCountry={selectedCountry} 
        selectedLeague={selectedLeague} 
        setSelectedLeague={setSelectedLeague} />
      </div>

      <div style={{
        width:rightContainer
      }}>
        <ValueForMoney />
      </div>
    </div>
  );
}
