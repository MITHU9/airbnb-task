import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Link to={`/property/${property.id}`} className="group block">
      <div className="relative">
        {/* Image carousel */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Guest favorite badge */}
          {property.isGuestFavorite && (
            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
              Guest favourite
            </div>
          )}

          {/* Heart button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
          >
            <Heart
              size={20}
              className={`${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              } drop-shadow-sm`}
            />
          </button>

          {/* Navigation dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property details */}
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 group-hover:underline">
              {property.title}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star size={12} className="fill-current" />
              <span className="text-sm">{property.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm">{property.location}</p>

          <div className="pt-1">
            <span className="font-semibold">${property.price}</span>
            <span className="text-gray-600"> night</span>
            {property.nights && (
              <span className="text-gray-600"> · {property.nights} nights</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
