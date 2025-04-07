export default function Header() {
    return (
      <header className="text-white px-6 py-2 flex justify-between items-center border-b-[1px] border-[rgba(255,255,255,0.1)">
       
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Matches</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
          </ul>
        </nav>
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div> {/* Placeholder for profile picture */}
      </header>
    );
  }
  