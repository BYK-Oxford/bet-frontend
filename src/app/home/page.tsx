import HomeCenter from "./components/HomeCenter";
import HomeSidebar from "./components/HomeSidebar";
import ValueForMoney from "./components/ValueForMoney";

export default function HomePage() {
  return (
    <div className="flex gap-4 p-4">
      {/* Sidebar (Left Side) */}
      <div className="w-50">
        <HomeSidebar />
      </div>

      {/* Main Content (Right Side) */}
      <div className="flex-1">
        <HomeCenter />
      </div>

      <div className="w-60">
        <ValueForMoney />
      </div>
    </div>
  );
}
