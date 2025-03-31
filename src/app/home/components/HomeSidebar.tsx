import InfoBox from "./InfoBox";

export default function HomeSidebar() {
  return (
    <div className="space-y-6">
      {/* Top Leagues Box */}
      <InfoBox
        title="Top Leagues"
        items={[
          "English Premier League",
          "Scottish Premier League",
          "English Championship",
          "Scottish Championship",
        ]}
      />

      {/* Country Box */}
      <InfoBox
        title="Country"
        items={[
          "England",
          "Scotland",
        ]}
      />
    </div>
  );
}
