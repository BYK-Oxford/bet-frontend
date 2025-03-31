import InfoBox from "./InfoBox";

export default function HomeSidebar() {
  return (
    <div className="space-y-4">
      {/* Top Leagues Box */}
      <InfoBox
        title="Top Leagues"
        items={[
            { name: "English Premier League", imageUrl: "https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg" },
            { name: "Scottish Premier League", imageUrl: "https://www.sportmonks.com/wp-content/uploads/2022/11/Premiershi.png" },
            { name: "English Championship", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jsCrL9uViiHZoazGjJYXfdsQQP7xu8smYw&s" },
            { name: "Scottish Championship", imageUrl: "https://www.sportmonks.com/wp-content/uploads/2022/11/Premiershi.png" }
        ]}
      />

      {/* Country Box */}
      <InfoBox
        title="Country"
        items={[
            { name: "England", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/2560px-Flag_of_England.svg.png" },
            { name: "Scotland", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBX3UFI58I0oVV9ufOCtY6qwXf7CkEzdtEA&s" },
        ]}
      />
    </div>
  );
}
