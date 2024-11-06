import React from "react";
import { Link } from "react-router-dom";
import { CloudIcon, HomeIcon, ClockIcon } from "@heroicons/react/24/outline";
import CitySearch from "./CitySearch.jsx";

const Header = () => {
  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-white">
          <CloudIcon className="h-8 w-8 text-yellow-300" aria-hidden="true" />
          <span className="text-2xl font-semibold">Breezy</span>
        </div>
        <CitySearch />

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-yellow-300 transition cursor-pointer"
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center space-x-1 hover:text-yellow-300 transition cursor-pointer"
          >
            <ClockIcon className="h-5 w-5" aria-hidden="true" />
            <span>History</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button type="button" className="text-white focus:outline-none">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
