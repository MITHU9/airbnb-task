import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

const HomePage = () => {
  const [startIndex1, setStartIndex1] = useState(0);

  const [startIndex2, setStartIndex2] = useState(0);

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCount(7); // xl
      else if (width >= 1024) setVisibleCount(5); // lg
      else if (width >= 640) setVisibleCount(4); // sm
      else setVisibleCount(1); // mobile
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // --- Handlers for first section ---
  const handlePrev1 = () => setStartIndex1((prev) => Math.max(prev - 1, 0));
  const handleNext1 = () =>
    setStartIndex1((prev) =>
      Math.min(prev + 1, properties.length - visibleCount)
    );

  // --- Handlers for second section ---
  const handlePrev2 = () => setStartIndex2((prev) => Math.max(prev - 1, 0));
  const handleNext2 = () =>
    setStartIndex2((prev) =>
      Math.min(prev + 1, properties.length - visibleCount)
    );

  return (
    <div>
      <main className="px-4 sm:px-6 lg:px-8 py-10">
        {/* --- First Section --- */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 md:mb-2">
            Stay near Kamakhya Temple
          </h2>
          {/* Arrows only for md+ */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrev1}
              disabled={startIndex1 === 0}
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                startIndex1 === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext1}
              disabled={startIndex1 + visibleCount >= properties.length}
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                startIndex1 + visibleCount >= properties.length
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mobile horizontal scroll, grid for larger */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mb-12">
          {properties.map((property) => (
            <div key={property.id} className="flex-shrink-0 w-[40%] sm:w-auto">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* --- Second Section --- */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Available for similar dates
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrev2}
              disabled={startIndex2 === 0}
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                startIndex2 === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext2}
              disabled={startIndex2 + visibleCount >= properties.length}
              className={`w-8 h-8  flex items-center justify-center rounded-full border ${
                startIndex2 + visibleCount >= properties.length
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mobile horizontal scroll, grid for larger */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mb-12">
          {properties.map((property) => (
            <div key={property.id} className="flex-shrink-0 w-[40%] sm:w-auto">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* --- Categories Section --- */}
        <div className="mt-16 py-12 border-t border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Explore nearby destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Shillong", distance: "104 km away" },
              { name: "Dibrugarh", distance: "435 km away" },
              { name: "Jorhat", distance: "314 km away" },
              { name: "Tezpur", distance: "181 km away" },
              { name: "Kaziranga", distance: "217 km away" },
              { name: "Majuli", distance: "347 km away" },
              { name: "Manas", distance: "176 km away" },
              { name: "Sivasagar", distance: "368 km away" },
            ].map((destination) => (
              <div
                key={destination.name}
                className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold text-gray-900">
                  {destination.name}
                </h3>
                <p className="text-gray-600 text-sm">{destination.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
