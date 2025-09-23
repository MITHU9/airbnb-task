import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, Users, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const SearchBar = () => {
  const [activeField, setActiveField] = useState(null);
  const [searchData, setSearchData] = useState();
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
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

    // Auto-focus next field
    if (field === "checkIn" && date) {
      setTimeout(() => setActiveField("checkOut"), 100);
    } else if (field === "checkOut" && date) {
      setTimeout(() => setActiveField(null), 100);
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
          } rounded-full shadow-lg border border-gray-200 flex flex-col md:flex-row relative`}
        >
          {/* Where */}
          <div
            className={`flex-1 px-6 py-2 cursor-pointer rounded-full transition-colors ${
              activeField === "where"
                ? "bg-white shadow-lg"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveField("where")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">
              Where
            </div>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
              value={searchData?.where}
              onChange={(e) =>
                setSearchData({ ...searchData, where: e.target.value })
              }
            />
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2"></div>

          {/* Check in */}
          <div
            className={`flex-1 px-6 py-2 cursor-pointer hover:bg-gray-50 rounded-full transition-colors relative ${
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
              <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50">
                <DatePicker
                  selected={searchData?.checkIn}
                  onChange={(date) => handleDateChange(date, "checkIn")}
                  selectsStart
                  startDate={searchData?.checkIn}
                  endDate={searchData?.checkOut}
                  minDate={new Date()}
                  monthsShown={2}
                  orientation="horizontal"
                  inline
                  calendarClassName="custom-calendar"
                />
              </div>
            )}
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2"></div>

          {/* Check out */}
          <div
            className={`flex-1 px-6 py-2 cursor-pointer hover:bg-gray-50 rounded-full transition-colors relative ${
              activeField === "checkOut"
                ? "bg-white shadow-lg"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveField("checkOut")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">
              Check out
            </div>
            <div className="text-sm text-gray-600">
              {formatDateDisplay(searchData?.checkOut)}
            </div>

            {activeField === "checkOut" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50">
                <DatePicker
                  selected={searchData?.checkOut}
                  onChange={(date) => handleDateChange(date, "checkOut")}
                  selectsEnd
                  startDate={searchData?.checkIn}
                  endDate={searchData?.checkOut}
                  minDate={searchData?.checkIn || new Date()}
                  monthsShown={2}
                  orientation="horizontal"
                  inline
                  calendarClassName="custom-calendar"
                />
              </div>
            )}
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2"></div>

          {/* Who */}
          <div
            className={`flex-1 px-6 py-2 cursor-pointer hover:bg-gray-50 ${
              activeField === "who" ? "bg-white shadow-lg" : "hover:bg-gray-200"
            } rounded-full transition-colors flex items-center justify-between relative`}
            onClick={() => {
              setShowGuestDropdown(!showGuestDropdown);
              setActiveField("who");
            }}
          >
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-900 mb-1">
                Who
              </div>
              <div className="text-sm text-gray-600">{getTotalGuests()}</div>
            </div>

            {showGuestDropdown && (
              <div
                ref={guestDropdownRef}
                className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-96 z-50"
              >
                <div className="space-y-6">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Adults</div>
                      <div className="text-sm text-gray-500">
                        Ages 13 or above
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuestCount("adults", false)}
                        disabled={guestCounts.adults <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">
                        {guestCounts.adults}
                      </span>
                      <button
                        onClick={() => updateGuestCount("adults", true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        Children
                      </div>
                      <div className="text-sm text-gray-500">Ages 2-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuestCount("children", false)}
                        disabled={guestCounts.children <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">
                        {guestCounts.children}
                      </span>
                      <button
                        onClick={() => updateGuestCount("children", true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Infants</div>
                      <div className="text-sm text-gray-500">Under 2</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuestCount("infants", false)}
                        disabled={guestCounts.infants <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">
                        {guestCounts.infants}
                      </span>
                      <button
                        onClick={() => updateGuestCount("infants", true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Pets */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Pets</div>
                      <div className="text-sm text-gray-500">
                        Bringing a service animal?
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuestCount("pets", false)}
                        disabled={guestCounts.pets <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">
                        {guestCounts.pets}
                      </span>
                      <button
                        onClick={() => updateGuestCount("pets", true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button className="bg-[#FF5A5F] text-white p-3 rounded-full hover:bg-[#E04F54] transition-colors ml-4">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
