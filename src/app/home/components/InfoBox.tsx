interface InfoBoxProps {
  title: string;
  items: { name: string; imageUrl: string }[];
  onItemClick?: (country: string) => void; // Optional click handler
}

export default function InfoBox({ title, items, onItemClick }: InfoBoxProps) {
  return (
    <div className="bg-[#2E2E30] p-3 rounded-lg max-w-xs w-full">
      <h2 className="text-white text-sm font-bold mb-2 border-b border-[rgba(255,255,255,0.1)] pb-2">{title}</h2>
      <ul className="space-y-2">
        {items.slice(0, 4).map((item, index) => (
          <li
            key={index}
            className={`flex items-center text-gray-300 text-xs hover:text-white cursor-pointer ${index < items.length - 1 ? 'border-b border-[rgba(255,255,255,0.1)] pb-2' : ''}`}
            onClick={() => onItemClick?.(item.name)} // Call the click handler
          >
            <img
              src={item.imageUrl}
              alt="Leagues icon"
              className="w-[24px] h-[24px] rounded-full mr-3 bg-white object-cover"
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
