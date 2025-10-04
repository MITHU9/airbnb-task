import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Link to={`/property/${property._id}`} className="group block">
      <div className="relative md:w-full">
        {/* Image carousel */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Guest favorite badge */}
          {property.isGuestFavorite && (
            <div className="absolute top-3 left-0.5 md:left-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
              Guest favourite
            </div>
          )}

          {/* Heart button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-1 md:top-3 right-0.5 md:right-3 p-2 hover:scale-110 transition-transform"
          >
            <Heart
              size={20}
              className={`${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              } drop-shadow-sm`}
            />
          </button>
        </div>

        {/* Property details */}
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-sm text-gray-900 group-hover:underline">
              {property.title}
            </h3>
          </div>

          <p className="text-gray-600 hidden md:block  text-sm">
            {property.location}
          </p>

          <div className="pt-1 text-[4px] flex items-center">
            <div>
              <span className="md:font-semibold ">${property.price}</span>
              <span className="text-gray-600 "> for</span>
              {property.nights && (
                <span className="text-gray-600"> {property.nights} nts</span>
              )}
            </div>
            <div className="flex items-center space-x-1 ml-2">
              <Star size={10} className="fill-current" />
              <span className="text-[2px] md:text-sm">{property.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
