import { useState } from "react";
import { Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchProperties } from "../api/filterProperties";

const MobileSearchBar = ({ setData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("where");
  const [location, setLocation] = useState(null);
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [dates, setDates] = useState({ checkIn: null, checkOut: null });

  const updateGuestCount = (type, increment) => {
    setGuestCounts((prev) => {
      const newCount = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: newCount };
    });
  };

  const totalGuests =
    guestCounts.adults +
    guestCounts.children +
    guestCounts.infants +
    guestCounts.pets;

  const filters = {
    where: location,
    checkIn: dates.checkIn,
    checkOut: dates.checkOut,
    guests: totalGuests,
  };

  //console.log(filters);

  const handleSearch = () => {
    fetchProperties(filters).then((data) => {
      setData(data);
      setIsExpanded(false);
    });
  };

  const isReadyToSearch = dates.checkIn && totalGuests > 0;
  const isFiltersEmpty = Object.values(filters).every(
    (value) =>
      value === null ||
      value === undefined ||
      value === "" ||
      (typeof value === "number" && value === 0)
  );

  //console.log(isFiltersEmpty);

  return (
    <div className="md:hidden w-full p-4">
      {!isExpanded ? (
        // Collapsed
        <div
          className="flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-3 shadow-md cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          {!isFiltersEmpty ? (
            <div className="flex flex-col items-center flex-1">
              <h2 className="font-bold">{filters.where}</h2>
              <p className="text-sm text-gray-500 font-semibold">
                {filters.checkIn?.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {filters.checkOut?.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                | {filters.guests} guests
              </p>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">Start your search</span>
          )}
          {isFiltersEmpty && (
            <Search size={18} className="text-[#e61171]" strokeWidth={3} />
          )}
        </div>
      ) : (
        // Expanded
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex space-x-6 font-medium text-sm">
              <span className="text-black font-semibold">Homes</span>
              <span className="text-gray-500">Experiences</span>
              <span className="text-gray-500">Services</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* WHERE */}
            <div
              className={`p-4 rounded-xl shadow-md cursor-pointer ${
                activeSection === "where" ? "ring-1 ring-black" : ""
              }`}
              onClick={() => setActiveSection("where")}
            >
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Where
              </label>
              <span className="text-sm text-gray-600">
                {location || "I’m flexible"}
              </span>

              {activeSection === "where" && (
                <div className="mt-4 space-y-2">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(item.city);
                        setActiveSection("when");
                      }}
                      className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="font-medium text-gray-900">
                        {item.city}
                      </div>
                      <div className="text-xs text-gray-500">{item.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* WHEN */}
            <div
              className={`p-4 rounded-xl shadow-md cursor-pointer ${
                activeSection === "when" ? "ring-1 ring-black" : ""
              }`}
              onClick={() => setActiveSection("when")}
            >
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                When
              </label>
              <span className="text-sm text-gray-600">
                {dates.checkIn ? dates.checkIn.toDateString() : "Add dates"}
              </span>

              {activeSection === "when" && (
                <div className="mt-4">
                  <div className="flex bg-gray-100 rounded-full p-1 mb-4">
                    <button className="flex-1 py-2 text-sm font-semibold bg-white rounded-full">
                      Dates
                    </button>
                    <button className="flex-1 py-2 text-sm text-gray-600">
                      Months
                    </button>
                    <button className="flex-1 py-2 text-sm text-gray-600">
                      Flexible
                    </button>
                  </div>
                  <DatePicker
                    selectsRange
                    startDate={dates.checkIn}
                    endDate={dates.checkOut}
                    onChange={([start, end]) =>
                      setDates({ checkIn: start, checkOut: end })
                    }
                    inline
                  />
                  <div className="flex justify-around mt-2 text-xs">
                    <button className="px-3 py-1 border rounded-full bg-black text-white">
                      Exact dates
                    </button>
                    <button className="px-3 py-1 border rounded-full text-gray-600">
                      ± 1 day
                    </button>
                    <button className="px-3 py-1 border rounded-full text-gray-600">
                      ± 2 days
                    </button>
                    <button className="px-3 py-1 border rounded-full text-gray-600">
                      ± 3 days
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* WHO */}
            <div
              className={`p-4 rounded-xl shadow-md cursor-pointer ${
                activeSection === "who" ? "ring-1 ring-black" : ""
              }`}
              onClick={() => setActiveSection("who")}
            >
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Who
              </label>
              <span className="text-sm text-gray-600">
                {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
              </span>

              {activeSection === "who" && (
                <div className="mt-4 space-y-4">
                  {[
                    {
                      type: "adults",
                      label: "Adults",
                      desc: "Ages 13 or above",
                    },
                    { type: "children", label: "Children", desc: "Ages 2–12" },
                    { type: "infants", label: "Infants", desc: "Under 2" },
                    {
                      type: "pets",
                      label: "Pets",
                      desc: "Bringing a service animal?",
                    },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">
                          {item.label}
                        </div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateGuestCount(item.type, false);
                          }}
                          disabled={guestCounts[item.type] <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30"
                        >
                          –
                        </button>
                        <span className="w-6 text-center">
                          {guestCounts[item.type]}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateGuestCount(item.type, true);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 flex justify-between items-center border-t">
            <button
              onClick={() => {
                setLocation(null);
                setDates({ checkIn: null, checkOut: null });
                setGuestCounts({ adults: 0, children: 0, infants: 0, pets: 0 });
              }}
              className="text-sm text-gray-600 underline"
            >
              Clear all
            </button>

            {isReadyToSearch ? (
              <button
                onClick={handleSearch}
                className="bg-[#e61171] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2"
              >
                <Search size={18} strokeWidth={3} />
                Search
              </button>
            ) : (
              <button
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
                onClick={() => {
                  if (activeSection === "when" && dates.checkIn) {
                    setActiveSection("who");
                  } else if (activeSection === "where") {
                    setActiveSection("when");
                  }
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSearchBar;
