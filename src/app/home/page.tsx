import HomeBanner from "./components/HomeBanner";
import HomeSidebar from "./components/HomeSidebar";

export default function HomePage() {
  return (
    <div className="flex gap-6 p-6">
      {/* Sidebar (Left Side) */}
      <div className="w-50">
        <HomeSidebar />
      </div>

      {/* Main Content (Right Side) */}
      <div className="flex-1">
        <HomeBanner />
      </div>
    </div>
  );
}
