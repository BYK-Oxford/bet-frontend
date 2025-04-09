"use client";

import React from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import MatchDetailHeader from "./components/MatchDetailHeader"; // adjust if needed

const MatchDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const matchId = params?.matchId as string;

  // Extract and parse odds safely
  const oddsArray = searchParams.getAll("odds").map(Number);
  let odds: [number, number, number] = [0, 0, 0];

  // Ensure the odds are valid
  if (
    oddsArray.length === 3 &&
    oddsArray.every((n) => typeof n === "number" && !isNaN(n))
  ) {
    odds = oddsArray as [number, number, number];
  }

  if (!matchId) return <div>Loading...</div>;

  return (
    <div className="flex justify-center mt-10">
      <MatchDetailHeader
        league="Premier League"
        date={searchParams.get("date") ?? ""}
        time={searchParams.get("time") ?? ""}
        team1={searchParams.get("team1") ?? ""}
        team2={searchParams.get("team2") ?? ""}
        logo1={searchParams.get("logo1") ?? ""}
        logo2={searchParams.get("logo2") ?? ""}
        odds={odds}
        onBack={() => router.back()}
      />
    </div>
  );
};

export default MatchDetailPage;
