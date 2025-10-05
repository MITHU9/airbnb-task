const PropertyCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-white">
      <div className="h-48 bg-gray-200 w-full rounded-2xl"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
