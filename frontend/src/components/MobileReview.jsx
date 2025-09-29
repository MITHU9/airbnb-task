import { Star } from "lucide-react";
import { useState } from "react";

const MobileReview = ({ property }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div>
      {/* Reviews - Horizontal Scroll */}
      <div className="flex overflow-x-auto space-x-4 mb-6 mt-4 scrollbar-hide">
        {(showAllReviews ? property.reviews : property.reviews.slice(0, 6)).map(
          (review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[85%] sm:w-[300px] border-r border-gray-200  p-4 bg-white "
            >
              {/* Stars + Date */}
              <div className="flex items-center justify-between text-sm mb-2">
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
                <p className="text-gray-500 text-xs">{review.date}</p>
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {review.comment}
              </p>
              <button className="text-sm font-medium text-gray-700 hover:underline mt-1">
                Show more
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3 mt-4">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">{review.user}</h4>
                  <p className="text-xs text-gray-500">1 year on Airbnb</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Show All Button */}
      {property.reviews.length > 6 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="w-full px-6 py-3 border border-gray-300 rounded-xl font-medium bg-gray-50 hover:bg-gray-100"
        >
          {showAllReviews
            ? "Show less"
            : `Show all ${property.reviews.length} reviews`}
        </button>
      )}
    </div>
  );
};

export default MobileReview;
