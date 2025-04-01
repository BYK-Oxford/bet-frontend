import React from "react";
import MatchListContainer from "./MatchListContainer";

const matches: {
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
}[] = [
  {
    date: "9 Nov",
    time: "20:30",
    team1: "Man Utd",
    team2: "Man City",
    logo1: "https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg",
    logo2: "https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png",
    odds: [5.89, 2.15, 1.24],
  },
  {
    date: "10 Nov",
    time: "13:30",
    team1: "Liverpool",
    team2: "Arsenal",
    logo1: "https://brandlogos.net/wp-content/uploads/2025/02/liverpool_f.c.-logo_brandlogos.net_vr9dx-300x548.png",
    logo2: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
    odds: [5.89, 2.15, 1.24],
  },
  {
    date: "10 Nov",
    time: "20:30",
    team1: "Chelsea",
    team2: "Tottenham",
    logo1: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    logo2: "https://brandlogos.net/wp-content/uploads/2020/11/tottenham-hotspur-logo.png",
    odds: [5.89, 2.15, 1.24],
  },
];

const MatchNewData: React.FC = () => {
    return (
      <div className="space-y-1 flex flex-col">
        {matches.map((match, index) => (
          <div 
            key={index} 
            className={`pb-2 ${index < matches.length - 1 ? 'border-b border-[rgba(255,255,255,0.1)]' : ''}`}
          >
            <MatchListContainer {...match} />
          </div>
        ))}
      </div>
    );
  };
  

export default MatchNewData;
