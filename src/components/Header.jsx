import { CloudIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-zinc-800 h-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between h-full">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 text-white">
          <CloudIcon className="h-8 w-8 text-[#55F]" aria-hidden="true" />
          <span className="text-2xl font-semibold">Breezy</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#55F]" : "hover:text-[#55F]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/recent-searches"
            className={({ isActive }) =>
              isActive ? "text-[#55F]" : "hover:text-[#55F]"
            }
          >
            Recent Searches
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
