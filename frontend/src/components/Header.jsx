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

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
            >
              <span className="mr-2">🏠</span>
              Homes
            </Link>
            <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
              <span className="mr-2 bg-red-500 text-white text-xs px-1 rounded">
                NEW
              </span>
              <span className="mr-2">✨</span>
              Experiences
            </button>
            <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
              <span className="mr-2 bg-blue-500 text-white text-xs px-1 rounded">
                NEW
              </span>
              <span className="mr-2">⚙️</span>
              Services
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-700 hover:text-gray-900 font-medium">
              Become a host
            </button>
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <Globe size={16} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow"
            >
              <Menu size={16} />
              <User size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
