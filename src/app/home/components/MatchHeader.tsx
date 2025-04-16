"use client";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type MatchHeaderProps = {
  leagueName: string;
  leagueLogo: string;
  onSeeAll: () => void;
};

export default function MatchHeader({
  leagueName,
  leagueLogo,
  onSeeAll,
}: MatchHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg">
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

      <div className="flex items-center gap-5">
        
            <div className="flex items-center gap-2">
              <button
                // onClick={()}
                className={`p-1 rounded-md border border-[2px] border-[#2E2E30] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ backgroundColor: "transparent" }}
              >
                <CaretLeft size={15} weight="bold" />
              </button>
              <button
                // onClick={onNext}
                className={`p-1 rounded-md border border-[2px] border-[#2E2E30] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ backgroundColor: "transparent" }}
              >
                <CaretRight size={15} weight="bold" />
              </button>
            </div>

        <button onClick={onSeeAll} className="btn btn-primary">
          See All
        </button>
      </div>
    </div>
  );
}
