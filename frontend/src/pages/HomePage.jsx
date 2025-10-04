import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { fetchGroupedProperties } from "../api/properties";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "../api/filterProperties";
import PropertiesListWithMap from "../components/PropertyListWithMap";

const HomePage = ({ filters }) => {
  const [startIndices, setStartIndices] = useState({});
  const [visibleCount, setVisibleCount] = useState(1);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
    keepPreviousData: true,
  });

  //console.log(data, "filter", filters);

  const {
    data: groupedData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["groupedProperties"],
    queryFn: fetchGroupedProperties,
  });

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCount(7);
      else if (width >= 1024) setVisibleCount(5);
      else if (width >= 640) setVisibleCount(4);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Carousel handlers per group
  const handlePrev = (subtitle) => {
    setStartIndices((prev) => ({
      ...prev,
      [subtitle]: Math.max((prev[subtitle] || 0) - 1, 0),
    }));
  };

  const handleNext = (subtitle, length) => {
    setStartIndices((prev) => ({
      ...prev,
      [subtitle]: Math.min((prev[subtitle] || 0) + 1, length - visibleCount),
    }));
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError)
    return <div className="p-8 text-center">Error loading properties</div>;

  return (
    <div>
      {data?.length !== 0 ? (
        <PropertiesListWithMap properties={data} isLoading={loading} />
      ) : (
        <main className="px-4 sm:px-6 lg:px-8 py-10">
          {groupedData?.map((group) => {
            const startIndex = startIndices[group.subtitle] || 0;

            return (
              <div key={group.subtitle} className="mb-12">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {group.subtitle}
                  </h2>
                  <div className="hidden md:flex items-center gap-2">
                    <button
                      onClick={() => handlePrev(group.subtitle)}
                      disabled={startIndex === 0}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                        startIndex === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleNext(group.subtitle, group.properties.length)
                      }
                      disabled={
                        startIndex + visibleCount >= group.properties.length
                      }
                      className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                        startIndex + visibleCount >= group.properties.length
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Mobile horizontal scroll */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide md:hidden mb-4">
                  {group.properties.map((property) => (
                    <div key={property.id} className="flex-shrink-0 w-[40%]">
                      <PropertyCard property={property} isLoading={loading} />
                    </div>
                  ))}
                </div>

                <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                  {group.properties
                    .slice(startIndex, startIndex + visibleCount)
                    .map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isLoading={loading}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </main>
      )}
    </div>
  );
};

export default HomePage;
