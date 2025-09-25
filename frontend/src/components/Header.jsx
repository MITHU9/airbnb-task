import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User, Globe } from "lucide-react";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fcfcfcf9] border-b border-gray-200">
      <div className=" px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-[#FF5A5F]">
              airbnb
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-700 hover:text-gray-900 font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-full transition">
              Become a host
            </button>
            <button className=" text-gray-700 hover:text-gray-900 space-x-2 p-3  border border-gray-300 bg-gray-200 rounded-full cursor-pointer">
              <Globe size={16} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-3  border border-gray-300 bg-gray-200 rounded-full hover:shadow-md transition-shadow cursor-pointer"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
