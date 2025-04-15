interface InfoBoxProps {
  title: string;
  items: { name: string; src: string }[];
  onItemClick?: (value: string) => void;
  selectedItem?: string | null;
  onClear?: () => void;
}

export default function InfoBox({ title, items, onItemClick, selectedItem, onClear }: InfoBoxProps) {
  return (
    <div className="bg-[#2E2E30] p-3 rounded-lg max-w-xs w-full">
      <div className="flex items-center justify-between mb-2 border-b border-[rgba(255,255,255,0.1)] pb-2">
        <h2 className="text-white text-sm font-bold">{title}</h2>
        {onClear && (
          <button onClick={onClear} className="text-xs text-gray-400 hover:text-white transition">
            Clear
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {items.slice(0, 4).map((item, index) => {
          const isSelected = selectedItem === item.name;
          return (
            <li
              key={index}
              className={`
                flex items-center text-xs cursor-pointer 
                ${isSelected ? "text-white bg-[#03BEC2] rounded-md px-2 py-2" : "text-gray-300 hover:text-white"}
                ${index < items.length - 1 ? 'border-b border-[rgba(255,255,255,0.1)] pb-2' : ''}
              `}
              onClick={() => onItemClick?.(item.name)}
            >
              <img
                src={item.src}
                alt="icon"
                className="w-[24px] h-[24px] rounded-full mr-3 bg-white object-cover"
              />
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
