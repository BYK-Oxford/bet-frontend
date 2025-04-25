
import type { Metadata } from "next";
import HomeContent from "./components/HomeContent";

export const metadata: Metadata = {
  title: "Home | Bet Genie UK",
  description: `Explore top sports predictions on Bet Genie UK, 
  where we focus on delivering Value for Money (V4M) betting opportunities. 
  V4M is a strategy that helps bettors identify options where the calculated chance 
  of winning exceeds the return offered by bookmakers. While not a guaranteed win, 
  this method allows you to maximize your returns with carefully calculated risks. 
  Our goal is to pinpoint arbitrage opportunities where the odds are in your favor, 
  providing you with the best possible value in the sports betting market.`,
};


export default function HomePage() {
  return (
    <HomeContent/>
  );
}
