import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, User, Globe } from "lucide-react";
import SearchBar from "./SearchBar";
import MobileSearchBar from "./MobileSearch";

const Header = ({ setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isPropertyDetailsPage = location.pathname.startsWith("/property/");

  // ✅ Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      tabIndex={-1}
      onBlur={() => setIsOpen(false)}
      className={`border-b border-gray-200 ${
        !isPropertyDetailsPage ? "sticky top-0 z-50 bg-[#fcfcfcf9]  " : ""
      }`}
    >
      {!isPropertyDetailsPage && <MobileSearchBar />}
      <div
        className={`hidden md:block py-1 ${
          isPropertyDetailsPage ? "max-w-6xl mx-auto" : ""
        }`}
      >
        <div className=" px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-2xl font-bold text-[#FF5A5F]">
                airbnb
              </span>
            </Link>

            {/* Search Bar */}
            {!isOpen && (isPropertyDetailsPage || isScrolled) && (
              <div className="flex items-center justify-between w-full max-w-sm mx-auto bg-white rounded-full shadow-md border border-gray-200 px-4 py-2">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center flex-1 justify-between text-sm font-medium text-gray-700"
                >
                  <span
                    onClick={() => setActiveField("where")}
                    className="px-2 cursor-pointer hover:text-black"
                  >
                    Anywhere
                  </span>
                  <span className="text-gray-300">|</span>
                  <span
                    onClick={() => setActiveField("checkIn")}
                    className="px-2 cursor-pointer hover:text-black"
                  >
                    Any week
                  </span>
                  <span className="text-gray-300">|</span>
                  <span
                    onClick={() => {
                      setShowGuestDropdown(!showGuestDropdown);
                      setActiveField("who");
                    }}
                    className="px-2 text-gray-500 cursor-pointer hover:text-black"
                  >
                    Add guests
                  </span>
                </div>

                <button className="ml-2 p-2 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] transition-colors">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="hidden lg:block text-gray-700 hover:text-gray-900 font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-full transition">
                Become a host
              </button>
              <button className=" text-gray-700 hover:text-gray-900 space-x-2 p-3  border border-gray-300 bg-gray-200 rounded-full cursor-pointer">
                <Globe size={16} />
              </button>
              <button className="flex items-center space-x-2 p-3  border border-gray-300 bg-gray-200 rounded-full hover:shadow-md transition-shadow cursor-pointer">
                <Menu size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Hide SearchBar when scrolled down on home page */}
        <div
          className={`${
            (!isPropertyDetailsPage && !isScrolled) || isOpen
              ? "block"
              : "hidden"
          }`}
        >
          <SearchBar
            activeField={activeField}
            setActiveField={setActiveField}
            showGuestDropdown={showGuestDropdown}
            setShowGuestDropdown={setShowGuestDropdown}
            onSearch={(data) => setFilters(data)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
