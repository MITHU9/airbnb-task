import React, { useEffect, useRef, useState } from "react";
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
  Users,
  Bed,
  Bath,
  Shield,
  CheckCircle,
  Calendar,
  Clock,
  MessageCircle,
  Grip,
} from "lucide-react";
import { properties } from "../data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [isLiked, setIsLiked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const guestDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateGuestCount = (type, increment) => {
    setGuestCounts((prev) => {
      const newCount = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      if (type === "adults" && newCount < 1) return prev;

      const updated = { ...prev, [type]: newCount };
      const totalGuests = updated.adults + updated.children;
      if (totalGuests > 16) return prev;

      return updated;
    });
  };

  const totalGuests = () => {
    const total = guestCounts.adults + guestCounts.children;
    if (total === 0) return "Add guests";
    if (total === 1) return "1 guest";
    return `${total} guests`;
  };

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
    "Free parking on premises": <Car size={24} />,
    TV: <Tv size={24} />,
    Kitchen: <Coffee size={24} />,
    "Air conditioning": <Wind size={24} />,
    Pool: <div className="w-6 h-6 bg-blue-500 rounded"></div>,
    Gym: <div className="w-6 h-6 bg-gray-500 rounded"></div>,
    Elevator: <div className="w-6 h-6 bg-gray-400 rounded"></div>,
    "Dedicated workspace": <div className="w-6 h-6 bg-green-500 rounded"></div>,
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
  const serviceFee = Math.round(totalPrice * 0.14);
  const cleaningFee = 25;
  const finalTotal = totalPrice + serviceFee + cleaningFee;

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

        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star size={16} className="fill-current text-black mr-1" />
                <span className="font-semibold">{property.rating}</span>
                <span className="mx-1">·</span>
                <span className="underline">
                  {property.reviewCount} reviews
                </span>
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
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8 h-96 relative">
        <div className="col-span-2 row-span-2">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
          />
        </div>
        {property.images.slice(1, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.title} ${index + 2}`}
            className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
          />
        ))}
        <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg border flex items-center border-gray-300 hover:bg-gray-50 text-sm font-medium cursor-pointer gap-2">
          <Grip size={18} /> <span>Show all photos</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="lg:col-span-2">
          {/* Property Info */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {property.type} hosted by {property.host.name}
            </h2>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>{property.guests} guests</span>
              </div>
              <div className="flex items-center">
                <Bed size={16} className="mr-1" />
                <span>{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath size={16} className="mr-1" />
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>

            {property.isGuestFavorite && (
              <div className="inline-flex items-center bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                ⭐ Guest favourite
                <span className="ml-2 text-xs">
                  One of the most loved homes on Airbnb based on ratings,
                  reviews, and reliability
                </span>
              </div>
            )}

            {/* Highlights */}
            <div className="space-y-4">
              {property.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{highlight}</h4>
                    <p className="text-gray-600 text-sm">
                      {highlight === "Great location" &&
                        "95% of recent guests gave the location a 5-star rating."}
                      {highlight === "Self check-in" &&
                        "Check yourself in with the keypad."}
                      {highlight === "Great for remote work" &&
                        "Fast wifi at 25+ Mbps, plus a dedicated workspace."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
            <button className="text-black underline font-medium mt-4">
              Show more
            </button>
          </div>

          {/* Where you'll sleep */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h3 className="text-xl font-semibold mb-6">Where you'll sleep</h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <img
                src={property.images[1]}
                alt="Bedroom"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold mb-2">Bedroom</h4>
              <p className="text-gray-600">1 queen bed</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h3 className="text-xl font-semibold mb-6">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {(showAllAmenities
                ? property.amenities
                : property.amenities.slice(0, 10)
              ).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-3 py-2">
                  {amenityIcons[amenity] || (
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  )}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            {property.amenities.length > 10 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-6 px-6 py-3 border border-gray-900 rounded-lg font-medium hover:bg-gray-50"
              >
                {showAllAmenities
                  ? "Show less"
                  : `Show all ${property.amenities.length} amenities`}
              </button>
            )}
          </div>

          {/* Calendar */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h3 className="text-xl font-semibold mb-6">Select check-in date</h3>
            <p className="text-gray-600 mb-6">
              Add your travel dates for exact pricing
            </p>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Calendar coming soon</p>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <div className="sticky top-48">
            <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold">${property.price}</span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={16} className="fill-current text-black" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-600 underline">
                    {property.reviewCount} reviews
                  </span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-0 mb-6 border border-gray-300 rounded-lg">
                <div className="grid grid-cols-2 gap-0">
                  <div className="p-3 border-r border-gray-300">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm border-none outline-none bg-transparent"
                      placeholder="Add date"
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
                      className="w-full text-sm border-none outline-none bg-transparent"
                      placeholder="Add date"
                    />
                  </div>
                </div>

                <div className="relative w-full">
                  {/* Input / Button to toggle dropdown */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="border-t border-gray-300 p-3 cursor-pointer"
                  >
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      GUESTS
                    </label>
                    <div className="w-full text-sm bg-transparent">
                      {totalGuests()}
                      {guestCounts.infants > 0 &&
                        `, ${guestCounts.infants} infant${
                          guestCounts.infants > 1 ? "s" : ""
                        }`}
                      {guestCounts.pets > 0 &&
                        `, ${guestCounts.pets} pet${
                          guestCounts.pets > 1 ? "s" : ""
                        }`}
                    </div>
                  </div>

                  {/* Dropdown Panel */}
                  {isOpen && (
                    <div
                      ref={guestDropdownRef}
                      className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-96 z-50"
                    >
                      <div className="space-y-6">
                        {["adults", "children", "infants", "pets"].map(
                          (type) => (
                            <div
                              key={type}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <div className="font-semibold text-gray-900 capitalize">
                                  {type}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {type === "adults"
                                    ? "Ages 13 or above"
                                    : type === "children"
                                    ? "Ages 2–12"
                                    : type === "infants"
                                    ? "Under 2"
                                    : "Bringing a service animal?"}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateGuestCount(type, false);
                                  }}
                                  disabled={
                                    type === "adults"
                                      ? guestCounts.adults <= 1
                                      : guestCounts <= 0
                                  }
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center">
                                  {guestCounts[type]}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateGuestCount(type, true);
                                  }}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#E61E4D] to-[#BD1E59] text-white py-3 rounded-lg font-semibold hover:from-[#D70466] hover:to-[#BD1E59] transition-all mb-4">
                Check availability
              </button>

              <p className="text-center text-sm text-gray-600 mb-6">
                You won't be charged yet
              </p>

              {/* Price breakdown */}
              {calculateNights() > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="underline">
                      ${property.price} x {calculateNights()} nights
                    </span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t border-gray-200 text-lg">
                    <span>Total</span>
                    <span>${finalTotal}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <div className="flex items-center mb-8">
          <Star size={24} className="fill-current text-black mr-2" />
          <span className="text-2xl font-bold">{property.rating}</span>
          <span className="text-gray-600 ml-2">
            · {property.reviewCount} reviews
          </span>
        </div>

        {/* Review Categories */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Cleanliness", rating: 4.9 },
            { label: "Accuracy", rating: 4.8 },
            { label: "Check-in", rating: 5.0 },
            { label: "Communication", rating: 4.9 },
            { label: "Location", rating: 4.7 },
            { label: "Value", rating: 4.8 },
          ].map((category) => (
            <div key={category.label} className="text-center">
              <div className="text-sm text-gray-600 mb-1">{category.label}</div>
              <div className="flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-1 bg-black rounded-full"
                    style={{ width: `${(category.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{category.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {(showAllReviews
            ? property.reviews
            : property.reviews.slice(0, 6)
          ).map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review.user}</h4>
                  <p className="text-gray-600 text-sm">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        {property.reviews.length > 6 && (
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-3 border border-gray-900 rounded-lg font-medium hover:bg-gray-50"
          >
            {showAllReviews
              ? "Show less"
              : `Show all ${property.reviews.length} reviews`}
          </button>
        )}
      </div>

      {/* Location */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-semibold mb-6">Where you'll be</h3>
        <div className="bg-gray-200 rounded-lg h-96 mb-6 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Interactive map coming soon</p>
            <p className="text-sm text-gray-500 mt-2">{property.location}</p>
          </div>
        </div>
        <p className="text-gray-700">
          Guwahati, the largest city in Assam, is known for its rich culture,
          temples, and scenic beauty along the Brahmaputra River.
        </p>
      </div>

      {/* Host */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-semibold mb-8">Meet your host</h3>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={property.host.avatar}
              alt={property.host.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-2xl font-bold">{property.host.name}</h4>
              <p className="text-gray-600">Host</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div>
              <div className="text-xl font-bold">{property.reviewCount}</div>
              <div className="text-xs text-gray-600">Reviews</div>
            </div>
            <div>
              <div className="text-xl font-bold">{property.rating}</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {new Date().getFullYear() - property.host.joinedYear}
              </div>
              <div className="text-xs text-gray-600">Years hosting</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span className="text-sm">Identity verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle size={16} />
              <span className="text-sm">
                Response rate: {property.host.responseRate}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span className="text-sm">
                Response time: {property.host.responseTime}
              </span>
            </div>
          </div>

          <button className="w-full bg-white border border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50">
            Contact host
          </button>
        </div>
      </div>

      {/* Things to know */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-semibold mb-8">Things to know</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-4">House rules</h4>
            <ul className="space-y-2 text-gray-700">
              {property.houseRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Safety & property</h4>
            <ul className="space-y-2 text-gray-700">
              <li>Carbon monoxide alarm</li>
              <li>Smoke alarm</li>
              <li>Security cameras on property</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Cancellation policy</h4>
            <p className="text-gray-700">
              Free cancellation before check-in. Review the full cancellation
              policy which applies even if you cancel for illness or disruptions
              caused by COVID-19.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
