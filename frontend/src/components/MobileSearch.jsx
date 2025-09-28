import { useState } from "react";
import { Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MobileSearchBar = () => {
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

  const isReadyToSearch = dates.checkIn && totalGuests > 0;

  return (
    <div className="md:hidden w-full p-4">
      {!isExpanded ? (
        // Collapsed
        <div
          className="flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-3 shadow-md cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <span className="text-gray-500 text-sm">Start your search</span>
          <Search size={18} className="text-[#e61171]" strokeWidth={3} />
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
                activeSection === "where" ? "ring-2 ring-black" : ""
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
                      city: "Kolkata, India",
                      note: "Guests interested in Guwahati also looked here",
                    },
                    { city: "Darjeeling, India", note: "For nature-lovers" },
                    {
                      city: "New Delhi, India",
                      note: "For sights like India Gate",
                    },
                    { city: "Puri, India", note: "Known for its beaches" },
                    {
                      city: "Jaipur, India",
                      note: "For its stunning architecture",
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
                activeSection === "when" ? "ring-2 ring-black" : ""
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
                    selected={dates.checkIn}
                    onChange={(date) => {
                      setDates({ ...dates, checkIn: date });
                    }}
                    inline
                    monthsShown={1}
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
                activeSection === "who" ? "ring-2 ring-black" : ""
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
              <button className="bg-[#e61171] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2">
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
