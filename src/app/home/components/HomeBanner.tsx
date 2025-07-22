"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import FootballStatBandedChart from "../../../app/components/ui/StatChart";

const bannerImages = ["/banner1.jpg", "/banner2.jpg"];

type StatPoint = {
  time: number;
  stdRange: [number, number];
  actual: number | null;
  liveActual?: number | null;
};

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sampleData: StatPoint[] = [
    { time: 0, stdRange: [2, 4], actual: 3, liveActual: 2 },
    { time: 15, stdRange: [3, 6], actual: 4, liveActual: 3 },
    { time: 30, stdRange: [5, 9], actual: 7, liveActual: 6 },
    { time: 45, stdRange: [6, 10], actual: 8, liveActual: 7 },
    { time: 60, stdRange: [7, 11], actual: 9, liveActual: 10 },
    { time: 75, stdRange: [8, 12], actual: 11, liveActual: 13 },
    { time: 90, stdRange: [9, 13], actual: 12, liveActual: 14 },
  ];

  const sampleData2: StatPoint[] = [
    { time: 0, stdRange: [0, 1], actual: 0 },
    { time: 15, stdRange: [4, 10], actual: 5 },
    { time: 30, stdRange: [10, 14], actual: 10 },
    { time: 45, stdRange: [8.2, 20], actual: 12 },
    { time: 60, stdRange: [18, 25], actual: 20 },
    { time: 75, stdRange: [20, 30], actual: 25 },
    { time: 90, stdRange: [22, 35], actual: 29 },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="relative w-full rounded-lg overflow-hidden"
        style={{ paddingTop: "50%" }}
      >
        {/* Slider track */}
        <div
          className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${bannerImages.length * 50}%`,
          }}
        >
          {bannerImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full flex-shrink-0"
              style={{ width: "100%" }}
            >
              <Image
                src={img}
                alt={`Banner ${idx + 1}`}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <CaretLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <CaretRight size={24} />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <FootballStatBandedChart
          data={sampleData}
          title="Shot Attempts"
          statLabel="Shots"
        />
        <FootballStatBandedChart
          data={sampleData2}
          title="Shot Attempts"
          statLabel="Shots"
        />
      </div>
    </>
  );
}
