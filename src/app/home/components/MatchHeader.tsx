"use client";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type MatchHeaderProps = {
  leagueName: string;
  leagueLogo: string;
  onPrev: () => void;
  onNext: () => void;
  onSeeAll: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export default function MatchHeader({
  leagueName,
  leagueLogo,
  onPrev,
  onNext,
  onSeeAll,
  canPrev,
  canNext,
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
          {(canPrev || canNext) && (
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={!canPrev}
                className={`p-1 rounded-md border border-[2px] border-[#2E2E30] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ backgroundColor: "transparent" }}
              >
                <CaretLeft size={15} weight="bold" />
              </button>
              <button
                onClick={onNext}
                disabled={!canNext}
                className={`p-1 rounded-md border border-[2px] border-[#2E2E30] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ backgroundColor: "transparent" }}
              >
                <CaretRight size={15} weight="bold" />
              </button>
            </div>
          )}

        <button onClick={onSeeAll} className="btn btn-primary">
          See All
        </button>
      </div>
    </div>
  );
}
