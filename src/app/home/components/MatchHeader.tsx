"use client";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type MatchHeaderProps = {
  leagueName: string;
  leagueLogo?: string;
  scrollLeft: () => void;
  scrollRight: () => void;
  onSeeAll?: () => void;
  showSeeAll: boolean;
};

export default function MatchHeader({
  leagueName,
  leagueLogo,
  scrollLeft,
  scrollRight,
  onSeeAll,
  showSeeAll,
}: MatchHeaderProps) {
  // Ref for the scrollable container

  return (
    <>
      <div className="flex items-center justify-between p-2 md:p-4 rounded-lg">
        <div className="flex items-center gap-2 md:gap-3">
          {leagueLogo && (
            <Image
              src={leagueLogo}
              alt={leagueName ?? "League Logo"}
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          <h2 className="text-md font-semibold text-white">{leagueName}</h2>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={scrollLeft}
              className="p-1 md:p-2 rounded-md border border-[2px] border-[#2E2E30] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "transparent" }}
            >
              <CaretLeft
                className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
                weight="bold"
              />
            </button>
            <button
              onClick={scrollRight}
              className="p-1 md:p-2 rounded-md border border-[2px] border-[#2E2E30] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "transparent" }}
            >
              <CaretRight
                className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
                weight="bold"
              />
            </button>
          </div>
          {showSeeAll && onSeeAll && (
            <button
              onClick={onSeeAll}
              className="btn btn-primary text-[10px] md:text-sm px-2 py-1 md:px-4 md:py-2"
            >
              See All
            </button>
          )}
        </div>
      </div>
    </>
  );
}
