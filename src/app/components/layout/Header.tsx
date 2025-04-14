'use client';

import Link from 'next/link';
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="text-white px-6 py-2 flex justify-between items-center border-b-[1px] border-[rgba(255,255,255,0.1)]">
      
      {/* Left: Search Bar */}
      <div className="flex items-center space-x-2 bg-[#2E2E30] px-3 py-2 rounded">
        <MagnifyingGlass size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search matches..."
          className="bg-transparent text-white placeholder-[#7C7C7F] placeholder:text-xs text-sm focus:outline-none"
        />
      </div>

      {/* Right: Nav links + Profile */}
      <div className="flex items-center space-x-6">
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Matches
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div> {/* Placeholder for profile picture */}
      </div>
    </header>
  );
}
