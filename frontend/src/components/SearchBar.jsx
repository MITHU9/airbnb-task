import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const SearchBar = ({
  onSearch,
  activeField,
  setActiveField,
  showGuestDropdown,
  setShowGuestDropdown,
}) => {
  const [searchData, setSearchData] = useState();

  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const searchBarRef = useRef(null);
  const guestDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setActiveField(null);
      }
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target)
      ) {
        setShowGuestDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (date, field) => {
    setSearchData((prev) => ({ ...prev, [field]: date }));

    if (field === "checkIn" && date) {
      setTimeout(() => setActiveField("checkOut"), 100);
    }
  };

  const updateGuestCount = (type, increment) => {
    setGuestCounts((prev) => {
      const newCount = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      if (type === "adults" && newCount < 1) return prev;

      const updated = { ...prev, [type]: newCount };
      const totalGuests = updated.adults + updated.children;
      setSearchData((prevSearch) => ({ ...prevSearch, guests: totalGuests }));

      return updated;
    });
  };

  const formatDateDisplay = (date) => {
    if (!date) return "Add dates";
    return format(date, "MMM d");
  };

  const getTotalGuests = () => {
    const total = guestCounts.adults + guestCounts.children;
    if (total === 0) return "Add guests";
    if (total === 1) return "1 guest";
    return `${total} guests`;
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div
          ref={searchBarRef}
          className={`${
            activeField === null ? "bg-white" : "bg-gray-100"
          } rounded-full shadow-lg border border-gray-200 flex flex-col md:flex-row relative searchbar-container`}
        >
          {/* Where */}
          <div
            className={`flex-1 px-6 py-2 cursor-pointer rounded-full transition-colors ${
              activeField === "where"
                ? "bg-white shadow-lg"
                : "hover:bg-gray-200"
            } relative`}
            onClick={() => setActiveField("where")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">
              Where
            </div>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
              value={searchData?.where || ""}
              onChange={(e) =>
                setSearchData({ ...searchData, where: e.target.value })
              }
            />

            {/* Dropdown for Where */}
            {activeField === "where" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 w-[350px] p-4 z-50">
                {/* Suggested destinations */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Suggested destinations
                  </h4>
                  {[
                    {
                      city: "London, UK",
                      note: "The city of lights",
                      icon: "🏙️",
                    },
                    {
                      city: "East Khasi Hills, India",
                      note: "For its scenic beauty",
                      icon: "⛰️",
                    },
                    {
                      city: "Chandmari, Guwahati, India",
                      note: "A popular locality",
                      icon: "🕌",
                    },
                    {
                      city: "Hatigaon, Guwahati, India",
                      note: "A serene neighborhood",
                      icon: "🏖️",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center gap-3"
                      onClick={() => {
                        setSearchData({ ...searchData, where: item.city });
                        setActiveField(null);
                      }}
                    >
                      <span className="text-blue-500">{item.icon}</span>
                      <div>
                        <div className="text-gray-900 font-medium">
                          {item.city}
                        </div>
                        <div className="text-xs text-gray-500">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          {activeField !== "where" && activeField !== "checkIn" && (
            <div className="hidden md:block w-px bg-gray-200 my-2"></div>
          )}

          {/* Check in */}
          <div
            className={`flex-[0.6] px-6 py-2 cursor-pointer rounded-full transition-colors relative ${
              activeField === "checkIn"
                ? "bg-white shadow-lg"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveField("checkIn")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">
              Check in
            </div>
            <div className="text-sm text-gray-600">
              {formatDateDisplay(searchData?.checkIn)}
            </div>

            {activeField === "checkIn" && (
              <div className="absolute top-full -right-11/12 -translate-x-1/2 mt-2 flex justify-center w-full z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                  <DatePicker
                    selected={searchData?.checkIn}
                    onChange={(date) => handleDateChange(date, "checkIn")}
                    selectsStart
                    startDate={searchData?.checkIn}
                    endDate={searchData?.checkOut}
                    minDate={new Date()}
                    monthsShown={2}
                    inline
                    calendarClassName="custom-calendar"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          {activeField !== "checkIn" && activeField !== "checkOut" && (
            <div className="hidden md:block w-px bg-gray-200 my-2"></div>
          )}

          {/* Check out */}
          <div
            className={`flex-[0.6] px-6 py-2 cursor-pointer rounded-full transition-colors relative ${
              activeField === "checkOut"
                ? "bg-white shadow-lg"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveField("checkOut")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">
              Check out
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              {searchData?.checkOut || searchData?.checkIn ? (
                <>
                  <span>
                    {searchData?.checkOut
                      ? formatDateDisplay(searchData?.checkOut)
                      : "Add dates"}
                  </span>
                  {searchData?.checkIn && searchData?.checkOut && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchData({ checkIn: null, checkOut: null });
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </>
              ) : (
                "Add dates"
              )}
            </div>

            {activeField === "checkOut" && (
              <div className="absolute top-full left-4 -translate-x-1/2 mt-2 flex justify-center w-full z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                  <DatePicker
                    selected={searchData?.checkOut}
                    onChange={(date) => handleDateChange(date, "checkOut")}
                    selectsEnd
                    startDate={searchData?.checkIn}
                    endDate={searchData?.checkOut}
                    minDate={searchData?.checkIn || new Date()}
                    monthsShown={2}
                    inline
                    calendarClassName="custom-calendar"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          {activeField !== "checkOut" && activeField !== "who" && (
            <div className="hidden md:block w-px bg-gray-200 my-2"></div>
          )}

          {/* Who */}

          <div
            className={`flex-1 pl-8 pr-2 py-2 cursor-pointer rounded-full transition-colors flex items-center justify-between relative ${
              activeField === "who" ? "bg-white shadow-lg" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowGuestDropdown(!showGuestDropdown);
              setActiveField("who");
            }}
          >
            <div className="flex-1 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Who
                </div>
                <div
                  className="text-sm text-gray-600 truncate max-w-[120px]"
                  title={`${getTotalGuests()}${
                    guestCounts.infants > 0
                      ? `, ${guestCounts.infants} infant${
                          guestCounts.infants > 1 ? "s" : ""
                        }`
                      : ""
                  }${
                    guestCounts.pets > 0
                      ? `, ${guestCounts.pets} pet${
                          guestCounts.pets > 1 ? "s" : ""
                        }`
                      : ""
                  }`} // 👈 full summary in tooltip
                >
                  {getTotalGuests()}
                  {guestCounts.infants > 0 &&
                    `, ${guestCounts.infants} infant${
                      guestCounts.infants > 1 ? "s" : ""
                    }`}
                  {guestCounts.pets > 0 &&
                    `, ${guestCounts.pets} pet${
                      guestCounts.pets > 1 ? "s" : ""
                    }`}
                </div>
              </div>

              {(guestCounts.adults > 0 ||
                guestCounts.children > 0 ||
                guestCounts.infants > 0 ||
                guestCounts.pets > 0) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGuestCounts({
                      adults: 0,
                      children: 0,
                      infants: 0,
                      pets: 0,
                    });
                    setSearchData((prev) => ({ ...prev, guests: 0 }));
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {showGuestDropdown && (
              <div
                ref={guestDropdownRef}
                className="absolute guest-dropdown top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-96 z-50"
              >
                <div className="space-y-6">
                  {["adults", "children", "infants", "pets"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 capitalize">
                          {type}
                        </div>
                        <div className="text-sm text-gray-500">
                          {type === "adults"
                            ? "Ages 13 or above"
                            : type === "children"
                            ? "Ages 2–12"
                            : type === "infants"
                            ? "Under 2"
                            : "Bringing a service animal?"}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateGuestCount(type, false);
                          }}
                          disabled={
                            type === "adults"
                              ? guestCounts.adults <= 1
                              : guestCounts[type] <= 0
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">
                          {guestCounts[type]}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateGuestCount(type, true);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            <button
              onClick={() => onSearch(searchData)}
              className="bg-[#e61171] text-white px-4 py-3 rounded-full hover:bg-[#E04F54] transition-colors font-bold ml-4 flex items-center gap-2"
            >
              <Search size={18} strokeWidth={3} />
              {activeField && <span>Search</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
