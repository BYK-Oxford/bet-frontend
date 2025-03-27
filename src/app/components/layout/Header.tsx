export default function Header() {
    return (
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
       
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
  