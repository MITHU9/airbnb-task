import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  joinedYear: { type: Number },
  isVerified: { type: Boolean, default: false },
  responseRate: { type: Number },
  responseTime: { type: String },
});

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  avatar: { type: String },
  date: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  comment: { type: String },
});

const reservationSchema = new mongoose.Schema({
  reservationId: { type: String, required: true },
  guestName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, enum: ["completed", "upcoming", "cancelled"] },
});

const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const propertySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    images: [{ type: String }],
    title: { type: String, required: true },
    subtitle: { type: String },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number },
    isGuestFavorite: { type: Boolean, default: false },
    nights: { type: Number },
    host: hostSchema,
    amenities: [{ type: String }],
    description: { type: String },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    guests: { type: Number },
    type: { type: String },
    highlights: [{ type: String }],
    houseRules: [{ type: String }],
    reviews: [reviewSchema],
    coordinates: coordinatesSchema,
    reservations: [reservationSchema],
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
