import { Metadata } from "next";
import MatchDetailContent from "./components/MatchDetailContent";

// Dynamic metadata for each match
export const generateMetadata = async ({ params }: { params: { matchId: string } }): Promise<Metadata> => {
  const { matchId } = params;

  // Fetch match data to get team names
  const response = await fetch(`http://127.0.0.1:8000/match-statistics/matches/historic/${matchId}`);
  const matchData = await response.json();

  if (!matchData || matchData.length === 0) {
    return {
      title: `${matchId} | Bet Genie UK`,
      description: `Explore the latest match predictions for ${matchId} on Bet Genie UK.`,
    };
  }

  // Extract team names from the first match data (assuming the structure remains consistent)
  const homeTeam = matchData[0].home_team_name;
  const awayTeam = matchData[0].away_team_name;


  return {
    title: `${homeTeam} vs ${awayTeam} | Bet Genie UK`, // Dynamically update the title
    description: `Explore the latest match predictions for ${homeTeam} vs ${awayTeam} on Bet Genie UK.`, // Dynamically update the description
  };
};

const MatchDetailPage = ({ params }: { params: { matchId: string } }) => {
  return (
    
      <MatchDetailContent/>
  );
};

// Correctly export the page component as default
export default MatchDetailPage;
