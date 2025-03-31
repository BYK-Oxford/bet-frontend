import Image from "next/image";

export default function HomeBanner() {
  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <Image
        src="/public/img1.jpg"
        alt="Sports Betting Banner"
        layout="fill"
        objectFit="cover"
        className="opacity-90"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-4xl font-bold">SPORTS BETTING</h1>
      </div>
    </div>
  );
}
