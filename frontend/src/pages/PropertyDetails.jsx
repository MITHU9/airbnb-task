import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  Wifi,
  Car,
  Tv,
  Coffee,
  Wind,
  MapPin,
} from "lucide-react";
import { properties } from "../data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [isLiked, setIsLiked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property not found
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const amenityIcons = {
    Wifi: <Wifi size={24} />,
    Parking: <Car size={24} />,
    TV: <Tv size={24} />,
    Kitchen: <Coffee size={24} />,
    AC: <Wind size={24} />,
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const totalPrice = calculateNights() * property.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to search
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star size={16} className="fill-current text-yellow-400 mr-1" />
                <span className="font-semibold">{property.rating}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span className="underline">{property.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <Share size={16} />
              <span className="underline">Share</span>
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <Heart
                size={16}
                className={isLiked ? "fill-red-500 text-red-500" : ""}
              />
              <span className="underline">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-4 rounded-xl overflow-hidden mb-8">
        <div className="col-span-2 row-span-2">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
          />
        </div>
        {property.images.slice(1, 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.title} ${index + 2}`}
            className="w-full h-48 object-cover hover:brightness-90 transition-all cursor-pointer"
          />
        ))}
        <div className="col-span-2">
          <img
            src={property.images[2] || property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover hover:brightness-90 transition-all cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="lg:col-span-2">
          {/* Property Info */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h2 className="text-xl font-semibold mb-2">
              {property.type} hosted by {property.host}
            </h2>
            <p className="text-gray-600 mb-4">
              {property.guests} guests · {property.bedrooms} bedrooms ·{" "}
              {property.bathrooms} bathrooms
            </p>

            {property.isGuestFavorite && (
              <div className="inline-flex items-center bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Guest favourite
              </div>
            )}
          </div>

          {/* Description */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h3 className="text-xl font-semibold mb-6">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-3">
                  {amenityIcons[amenity] || (
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  )}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar placeholder */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Select dates</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Calendar coming soon</p>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold">${property.price}</span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={16} className="fill-current text-yellow-400" />
                  <span className="font-semibold">{property.rating}</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg">
                  <div className="p-3 border-r border-gray-300">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm border-none outline-none"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      CHECKOUT
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm border-none outline-none"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3">
                  <label className="block text-xs font-semibold text-gray-900 mb-1">
                    GUESTS
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm border-none outline-none"
                  >
                    {Array.from({ length: property.guests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#E61E4D] to-[#BD1E59] text-white py-3 rounded-lg font-semibold hover:from-[#D70466] hover:to-[#BD1E59] transition-all">
                Reserve
              </button>

              <p className="text-center text-sm text-gray-600 mt-3">
                You won't be charged yet
              </p>

              {/* Price breakdown */}
              {calculateNights() > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between">
                    <span>
                      ${property.price} x {calculateNights()} nights
                    </span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${Math.round(totalPrice * 0.14)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${totalPrice + Math.round(totalPrice * 0.14)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
