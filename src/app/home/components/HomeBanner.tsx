import Image from "next/image";

export default function HomeBanner() {
  return (
    <div className="relative w-full rounded-lg" style={{ paddingTop: '50%' }}>
      <Image
        src="/banner1.jpg"
        alt="Sports Betting Banner"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
}
