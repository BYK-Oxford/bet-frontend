interface InfoBoxProps {
    title: string;
    items: string[];
  }
  
  export default function InfoBox({ title, items }: InfoBoxProps) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-white text-lg font-bold mb-3">{title}</h2>
        <ul className="space-y-2">
          {items.slice(0, 4).map((item, index) => (
            <li key={index} className="text-gray-300 hover:text-white cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  