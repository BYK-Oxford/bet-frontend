"use client";
import HomeBanner from "./HomeBanner";
import MatchHeader from "./MatchHeader";
import MatchList from "./MatchList";


export default function HomeCenter() {
  return (
    <div className="space-y-4">
      <HomeBanner/>
      <MatchHeader
      leagueName="English Premier League"
      leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
      onPrev={() => console.log("Previous")}
      onNext={() => console.log("Next")}
      onSeeAll={() => console.log("See All")}/>
      <MatchList/>

  </div>
  );
}
