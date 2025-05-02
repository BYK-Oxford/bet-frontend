'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const bannerImages = [
  '/banner1.jpg',
  '/banner2.jpg'
];

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingTop: '50%' }}>
      {/* Slider track */}
      <div
        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${bannerImages.length * 50}%` }}
      >
        {bannerImages.map((img, idx) => (
          <div key={idx} className="relative w-full flex-shrink-0" style={{ width: '100%' }}>
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
  );
}
