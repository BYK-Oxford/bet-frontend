"use client";
import HomeBanner from "./HomeBanner";
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
        <MatchNewData/>
      </div>
  </div>
  );
}
