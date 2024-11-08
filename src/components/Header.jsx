import { CloudIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-zinc-800 h-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-white">
          <CloudIcon className="h-8 w-8 text-yellow-300" aria-hidden="true" />
          <span className="text-2xl font-semibold">Breezy</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
