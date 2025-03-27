import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* Content aligned within the available space */}
      <h1 className="text-3xl font-bold">Welcome to the Sports Betting App!</h1>
      <p>This is the homepage. All pages will have a similar layout with a header, sidebar, and main content area.</p>
    </div>
  );
}
