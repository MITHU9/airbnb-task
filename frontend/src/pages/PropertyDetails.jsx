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
  ChevronDown,
  ChevronUp,
  SprayCan,
  Key,
  MessageSquare,
  Tag,
  Map,
  Music,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import DatePicker from "react-datepicker";
import ToKnow from "../components/ToKnow";
import "leaflet/dist/leaflet.css";
import useMediaQuery from "../hooks/useMediaQuery";
import MobileReview from "../components/MobileReview";
import CalendarModal from "../components/CalendarModal";
import { getDisabledDates } from "../utils/reserved";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleProperty } from "../api/properties";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PropertyDetails = () => {
  const { id } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [open, setOpen] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const guestDropdownRef = useRef(null);
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchSingleProperty(id),
    enabled: !!id,
  });

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

  const reservedDates = getDisabledDates(property?.reservations);

  const totalGuests = () => {
    const total = guestCounts.adults + guestCounts.children;
    if (total === 0) return "Add guests";
    if (total === 1) return "1 guest";
    return `${total} guests`;
  };

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

  const totalPrice = calculateNights() * property?.price;
  const serviceFee = Math.round(totalPrice * 0.14);
  const cleaningFee = 25;
  const finalTotal = totalPrice + serviceFee + cleaningFee;

  //console.log(open);

  if (isLoading)
    return (
      <div className="p-6 space-y-6 animate-pulse max-w-6xl mx-auto">
        {/* Title */}
        <div className="h-6 w-2/3 hidden md:block bg-gray-300 rounded"></div>
        <div className="h-4 w-1/3 hidden md:block bg-gray-200 rounded"></div>

        {/* Main image and side images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Big left image */}
          <div className="col-span-2 row-span-2 h-72 bg-gray-200 rounded-xl"></div>
          {/* Small right images */}
          <div className="h-36 bg-gray-200 rounded-xl"></div>
          <div className="h-36 bg-gray-200 rounded-xl"></div>
          <div className="h-36 bg-gray-200 rounded-xl"></div>
          <div className="h-36 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Info section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          </div>

          {/* Booking card skeleton */}
          <div className="w-full md:w-72 h-64 border rounded-xl p-4 space-y-4">
            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );

  if (isError) return <p>Error: {error.message}</p>;

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

  return (
    <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 md:py-8">
      <div className="fixed bottom-0 right-0 left-0 bg-white flex md:hidden justify-between items-center p-4 border border-gray-300 z-40">
        <div>
          {totalPrice > 0 && <p className="text-xl font-bold">${totalPrice}</p>}
          <h3 className="font-semibold">Add dates for prices</h3>
          <p className="flex items-center space-x-1">
            <Star size={10} className="fill-current inline " />
            {property.rating}
          </p>
        </div>
        <div
          onClick={() => setCalendarOpen(true)}
          className="mt-4 px-6 py-5 bg-gradient-to-r from-[#E61E4D] to-[#BD1E59] text-white rounded-full text-center font-semibold cursor-pointer hover:from-[#D70466] hover:to-[#BD1E59] transition-all"
        >
          Check availability
        </div>
      </div>
      {/* Header */}
      <div className="hidden md:block mb-6">
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
      <div className="mb-8 relative z-0 ">
        <div className="block md:hidden relative">
          <div className="overflow-x-auto flex md:space-x-2 snap-x snap-mandatory scrollbar-hide">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 1}`}
                className="w-full h-80 object-cover flex-shrink-0 snap-center"
              />
            ))}
          </div>

          {/* Top Action Buttons */}
          <div className="absolute top-4 left-4 flex space-x-3 z-10">
            <Link
              to="/"
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ArrowLeft size={20} className="text-gray-800" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 flex space-x-3 z-10">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <Share size={20} className="text-gray-800" />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <Heart
                size={20}
                className={
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-800"
                }
              />
            </button>
          </div>
        </div>

        {/* Desktop (grid layout) */}
        <div className="hidden md:grid grid-cols-4 gap-2 rounded-xl overflow-hidden h-[430px] lg:h-[500px] relative">
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
      </div>

      <div className="px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-12 shadow-md md:shadow-none rounded-3xl relative z-20 -mt-20 md:mt-0 bg-white">
        {/* Left Column - Details */}
        <div className="md:col-span-2">
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
                src={property.images[0]}
                alt="Bedroom"
                className="w-full h-52 object-cover rounded-lg mb-4"
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
          <div className=" border-gray-200 pb-8 mb-8 relative md:w-[400px] lg:w-full">
            <h3 className="text-xl font-semibold mb-2">Select check-in date</h3>
            <p className="text-gray-600 mb-2">
              Add your travel dates for exact pricing
            </p>
            <DatePicker
              selected={checkIn}
              onChange={(dates) => {
                const [start, end] = dates;
                setCheckIn(start);
                setCheckOut(end);
              }}
              startDate={checkIn}
              endDate={checkOut}
              selectsRange
              inline
              monthsShown={isLarge ? 2 : 1}
              calendarClassName="custom-calendar"
              excludeDates={reservedDates}
              dayClassName={(date) =>
                reservedDates?.some(
                  (d) => d.toDateString() === date.toDateString()
                )
                  ? "line-through text-gray-400 cursor-not-allowed"
                  : undefined
              }
            />

            <button
              className="text-sm absolute right-10 underline text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-1 rounded-lg cursor-pointer"
              onClick={() => {
                setCheckIn(null);
                setCheckOut(null);
              }}
            >
              Clear dates
            </button>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="hidden md:block lg:col-span-1">
          <div className="sticky top-40">
            <div className="border border-gray-200 rounded-xl p-2 lg:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  {calculateNights() > 0 ? (
                    <>
                      <span className="text-xl font-bold">
                        ${property.price}{" "}
                      </span>
                      <span className="text-gray-600  text-lg">
                        for {calculateNights()} nights
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold">
                      Add dates for prices
                    </span>
                  )}
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-0 mb-6 border border-gray-300 rounded-lg">
                <div className="relative">
                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-0 border rounded-lg">
                    {/* Check-In */}
                    <div className="p-3 border-r border-gray-300">
                      <label className="block text-xs font-semibold text-gray-900 mb-1">
                        CHECK-IN
                      </label>
                      <input
                        type="text"
                        value={checkIn ? checkIn.toLocaleDateString() : ""}
                        onFocus={() => setOpen(true)}
                        readOnly
                        placeholder="Add date"
                        className="w-full text-sm border-none outline-none bg-transparent cursor-pointer"
                      />
                    </div>

                    {/* Check-Out */}
                    <div className="p-3">
                      <label className="block text-xs font-semibold text-gray-900 mb-1">
                        CHECKOUT
                      </label>
                      <input
                        type="text"
                        value={checkOut ? checkOut.toLocaleDateString() : ""}
                        onFocus={() => setOpen(true)}
                        readOnly
                        placeholder="Add date"
                        className="w-full text-sm border-none outline-none bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>

                  {open && (
                    <div className="absolute top-0 right-0  lg:-left-50 lg:right-auto bg-white shadow-lg rounded-xl p-4 z-50">
                      <div className="flex justify-evenly">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Select dates
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Add your travel dates for exact pricing
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-0 border rounded-lg">
                          {/* Check-In */}
                          <div
                            className={`p-3  border-gray-400 ${
                              open && !checkIn
                                ? "border border-gray-800"
                                : "border-r"
                            }`}
                          >
                            <label className="block text-xs font-semibold text-gray-900 mb-1">
                              CHECK-IN
                            </label>
                            <input
                              type="text"
                              value={
                                checkIn ? checkIn.toLocaleDateString() : ""
                              }
                              onFocus={() => setOpen(true)}
                              readOnly
                              placeholder="Add date"
                              className="w-full text-sm border-none outline-none bg-transparent cursor-pointer"
                            />
                          </div>

                          {/* Check-Out */}
                          <div
                            className={`p-3 ${
                              !checkIn && open
                                ? "bg-gray-200 cursor-not-allowed"
                                : "border border-gray-800"
                            }`}
                          >
                            <label className="block text-xs font-semibold text-gray-900 mb-1">
                              CHECKOUT
                            </label>
                            <input
                              type="text"
                              value={
                                checkOut ? checkOut.toLocaleDateString() : ""
                              }
                              onFocus={() => setOpen(true)}
                              readOnly
                              placeholder="Add date"
                              className="w-full text-sm border-none outline-none bg-transparent cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <DatePicker
                        selected={checkIn}
                        onChange={(dates) => {
                          const [start, end] = dates;
                          setCheckIn(start);
                          setCheckOut(end);
                        }}
                        startDate={checkIn}
                        endDate={checkOut}
                        selectsRange
                        inline
                        monthsShown={2}
                        calendarClassName="custom-calendar2"
                        excludeDates={reservedDates}
                        dayClassName={(date) =>
                          reservedDates?.some(
                            (d) => d.toDateString() === date.toDateString()
                          )
                            ? "line-through text-gray-400 cursor-not-allowed"
                            : undefined
                        }
                      />

                      {/* Footer */}
                      <div className="flex justify-between mt-4">
                        <button
                          className="text-sm text-gray-600 hover:underline cursor-pointer"
                          onClick={() => {
                            setCheckIn(null);
                            setCheckOut(null);
                          }}
                        >
                          Clear dates
                        </button>
                        <button
                          className="bg-black text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative w-full">
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
                    <div>
                      {isOpen ? (
                        <ChevronUp className="size-8 text-gray-600 absolute right-2 top-1/2 transform -translate-y-1/2" />
                      ) : (
                        <ChevronDown className="size-8 text-gray-600 absolute right-2 top-1/2 transform -translate-y-1/2" />
                      )}
                    </div>
                  </div>

                  {/* Dropdown Panel */}
                  {isOpen && (
                    <div
                      ref={guestDropdownRef}
                      className="absolute top-full -right-1 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-82 z-50"
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
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <div className="flex items-center mb-8 justify-center">
          <Star size={24} className="fill-current text-black mr-2" />
          <span className="text-2xl font-bold">{property.rating}</span>
          <span className="text-gray-600 ml-2">
            · {property.reviewCount} reviews
          </span>
        </div>

        {/* Review Categories */}
        <div className="border-b hidden md:block border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 mb-8">
            {/* Overall Rating Breakdown */}
            <div className="border-r border-gray-200 p-1">
              <h4 className="text-sm font-medium mb-2">Overall rating</h4>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-2">
                  <span className="text-sm">{star}</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-black rounded-full"
                      style={{
                        width: star === 5 ? "95%" : star === 4 ? "4%" : "1%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className=" flex justify-between col-span-6 text-center divide-x divide-gray-200">
              {[
                {
                  label: "Cleanliness",
                  rating: 4.9,
                  icon: <SprayCan className="w-8 h-8" />,
                },
                {
                  label: "Accuracy",
                  rating: 4.9,
                  icon: <CheckCircle className="w-8 h-8" />,
                },
                {
                  label: "Check-in",
                  rating: 4.9,
                  icon: <Key className="w-8 h-8" />,
                },
                {
                  label: "Communication",
                  rating: 5.0,
                  icon: <MessageSquare className="w-8 h-8" />,
                },
                {
                  label: "Location",
                  rating: 4.9,
                  icon: <Map className="w-8 h-8" />,
                },
                {
                  label: "Value",
                  rating: 4.9,
                  icon: <Tag className="w-8 h-8" />,
                },
              ].map((category) => (
                <div
                  key={category.label}
                  className="flex flex-col items-center space-y-1 gap-4 px-4"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700">
                      {category.label}
                    </span>
                    <span className="text-lg font-semibold">
                      {category.rating}
                    </span>
                  </div>
                  <div>{category.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-4">
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

              {/* ⭐ Rating Stars */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "fill-gray-800 text-gray-900"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <MobileReview property={property} />
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

      {/* Map Section */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-semibold mb-6">Where you'll be</h3>

        {/* Map Wrapper */}
        <div className="md:w-full h-96 mb-6 overflow-hidden rounded-lg px-2">
          <MapContainer
            center={property.coordinates || [26.1445, 91.7362]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={property.coordinates || [26.1445, 91.7362]}>
              <Popup>{property.title}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <p className="text-gray-700">{property.location}</p>
      </div>

      {/* Host */}
      <div className="p-2 mt-12 border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-semibold mb-8">Meet your host</h3>
        <div className="shadow-2xl flex justify-around border-gray-200 rounded-2xl px-2 py-4 max-w-md">
          <div className="flex items-center flex-col ">
            <img
              src={property.host.avatar}
              alt={property.host.name}
              className="size-40 rounded-full object-cover p-4"
            />
            <div>
              <h4 className="text-3xl font-bold">{property.host.name}</h4>
              <p className="text-gray-600">Host</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="border-b border-gray-400 pb-2">
              <div className="text-2xl font-bold">{property.reviewCount}</div>
              <div className="text-xs text-gray-600">Reviews</div>
            </div>
            <div className="border-b border-gray-400 pb-2">
              <div className="text-2xl font-bold">{property.rating}</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {new Date().getFullYear() - property.host.joinedYear}
              </div>
              <div className="text-xs text-gray-600">Years hosting</div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-gray-700 mt-6 max-w-2xl flex items-center gap-2">
            <Calendar className="inline" />
            <span>My Work : Property management</span>
          </p>
          <p className="text-gray-700 mt-2 max-w-2xl flex items-center gap-2">
            <Music />
            <span>
              Favorite song in high school: Jaychou, blackpink, eason chen
            </span>
          </p>
        </div>
      </div>

      {/* Things to know */}
      <div className="p-2 mt-12 border-t border-gray-200 pt-12">
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
          <ToKnow />
        </div>
      </div>
      {/* Calendar Modal for Mobile */}
      <div className="md:hidden">
        <CalendarModal
          isOpen={calendarOpen}
          onClose={() => setCalendarOpen(false)}
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
