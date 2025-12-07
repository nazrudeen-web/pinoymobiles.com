import { Star, ThumbsUp } from "lucide-react";

export default function ReviewBlock({ phone }) {
  const ratingCounts = {
    5: 450,
    4: 320,
    3: 180,
    2: 60,
    1: 47,
  };

  const total = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

  const reviews = [
    {
      author: "Maria Santos",
      rating: 5,
      title: "Excellent phone!",
      comment:
        "Battery life is amazing and camera quality is top-notch. Highly recommended!",
      verified: true,
      helpful: 234,
    },
    {
      author: "John Reyes",
      rating: 4,
      title: "Good value for money",
      comment: "Great performance but could use better cooling for gaming.",
      verified: true,
      helpful: 156,
    },
    {
      author: "Angela Cruz",
      rating: 5,
      title: "Perfect upgrade",
      comment:
        "Coming from an older phone, this is a huge leap. Very satisfied.",
      verified: true,
      helpful: 89,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Rating Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="mb-4">
          <div className="flex items-end gap-4 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900">
                {phone.rating}
              </div>
              <div className="flex justify-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(phone.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-1">{total} reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-6">{rating}★</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all"
                      style={{
                        width: `${(ratingCounts[rating] / total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-8 text-right">
                    {Math.round((ratingCounts[rating] / total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-red-600">
          Write Review
        </button>
      </div>

      {/* Pros & Cons */}
      <div className="grid gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-semibold text-green-900 text-sm mb-3">
            ✓ What we love
          </h4>
          <ul className="space-y-2">
            {["Excellent display", "Great camera", "Long battery life"].map(
              (pro, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-green-900"
                >
                  <span className="text-lg">✓</span>
                  {pro}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="font-semibold text-red-900 text-sm mb-3">
            ⚠ Could improve
          </h4>
          <ul className="space-y-2">
            {["No microSD slot", "Pricey accessories"].map((con, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-red-900"
              >
                <span className="text-lg">✕</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">
                  {review.author}
                </h4>
                {review.verified && (
                  <p className="text-xs text-green-600 font-medium">
                    ✓ Verified Purchase
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <h5 className="font-semibold text-slate-900 text-sm mb-1">
              {review.title}
            </h5>
            <p className="text-sm text-slate-600 mb-3">{review.comment}</p>
            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700">
              <ThumbsUp className="h-3 w-3" />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>

      <button className="w-full border border-slate-300 py-2.5 rounded-lg text-slate-900 font-medium text-sm hover:bg-slate-50">
        Show More Reviews
      </button>
    </div>
  );
}
