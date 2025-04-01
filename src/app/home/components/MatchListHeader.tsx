"use client";
import Image from "next/image";

type MatchListHeaderProps = {
  leagueName: string;
  leagueLogo: string;
};

export default function MatchListHeader({
  leagueName,
  leagueLogo,
}: MatchListHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg">
      {/* Left Section - League Logo & Name */}
      <div className="flex items-center gap-3">
        <Image
          src={leagueLogo}
          alt={leagueName}
          width={25}
          height={25}
          className="rounded-full"
        />
        <h2 className="text-md font-semibold text-white">{leagueName}</h2>
      </div>
    </div>
  );
}