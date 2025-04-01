"use client";
import HomeBanner from "./HomeBanner";
import MatchDetailHeader from "../../match_detail/components/MatchDetailHeader";
import MatchHeader from "./MatchHeader";
import MatchList from "./MatchList";
import MatchListHeader from "./MatchListHeader";
import MatchNewData from "./MatchNewData";


export default function HomeCenter() {
  return (
    <div className="space-y-4">
      <HomeBanner/>
      <div className="space-y-1">
        <MatchHeader
        leagueName="English Premier League"
        leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
        onPrev={() => console.log("Previous")}
        onNext={() => console.log("Next")}
        onSeeAll={() => console.log("See All")}/>
        <MatchList/>
      </div>

      
      <div className="space-y-1">
        <MatchListHeader
        leagueName="English Premier League"
        leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"/>
        <div className="bg-[#2E2E30] text-white p-4 rounded-xl w-full min-w-[400px] max-w-[800px] min-h-[200px] h-auto overflow-hidden">
          <div className="flex justify-between text-xs text-white font-semibold border-b border-[rgba(255,255,255,0.1)] pb-2 px-4">
            <span className="w-20">Date</span>
            <span className="flex-1 text-center">Match</span>
            <span className="w-20 text-right">Odds</span>
          </div>
          <MatchNewData/>
        </div>
      </div>

      <MatchDetailHeader
        date="March 31, 2025"
        time="18:00"
        team1="Liverpool"
        team2="Arsenal"
        logo1="https://brandlogos.net/wp-content/uploads/2025/02/liverpool_f.c.-logo_brandlogos.net_vr9dx-300x548.png" 
        logo2="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" 
        odds={[1.5, 2.0, 3.0]} 
      />
      
  </div>
  );
}
