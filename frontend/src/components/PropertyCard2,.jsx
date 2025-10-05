import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard2 = ({ property }) => {
  return (
    <Link
      to={`/property/${property._id}`}
      className="rounded-xl overflow-hidden hover:shadow-sm transition cursor-pointer h-88 w-full"
    >
      <div className="relative ">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-56 w-full object-cover"
        />
        {property.isGuestFavorite && (
          <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-md font-medium">
            Guest favorite
          </span>
        )}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 truncate">
          {property.type} in {property.location}
        </h3>
        <p className="text-gray-600 text-sm truncate">{property.subtitle}</p>

        {/* Rating */}
        <div className="flex items-center mt-1 text-sm text-gray-800">
          ⭐ {property.rating} ({property.reviewCount})
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="font-semibold">${property.price}</span>
          <span className="text-sm text-gray-500">
            {" "}
            for {property.nights} nights
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard2;
