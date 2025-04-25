
import type { Metadata } from "next";
import HomeContent from "./components/HomeContent";

export const metadata: Metadata = {
  title: "Home | Bet Genie UK",
  description: "Explore top sports predictions on Bet Genie UK.",
};


export default function HomePage() {
  return (
    <HomeContent/>
  );
}
