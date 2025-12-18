import { Star, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";

export default function ExpertReviews({ phone }) {
  const reviews = [
    {
      source: "TechRadar Middle East",
      rating: 8.5,
      ratingMax: 10,
      icon: "⭐",
      color: "bg-red-500",
      excerpt:
        "Outstanding display quality and impressive camera system. Battery life exceeds expectations.",
      pros: ["Excellent display", "Great camera", "Long battery life"],
      url: "#",
    },
    {
      source: "Gulf News Tech",
      rating: 9,
      ratingMax: 10,
      icon: "📱",
      color: "bg-blue-500",
      excerpt:
        "Best value for money in its price range. Performance is solid for gaming and multitasking.",
      pros: ["Value for money", "Gaming performance", "Fast charging"],
      url: "#",
    },
    {
      source: "Gadget UAE",
      rating: 4.5,
      ratingMax: 5,
      icon: "🎯",
      color: "bg-purple-500",
      excerpt:
        "Premium build quality with attention to detail. Software experience is smooth and intuitive.",
      pros: ["Premium design", "Smooth software", "Build quality"],
      url: "#",
    },
  ];

  const avgRating = (
    reviews.reduce((acc, r) => acc + (r.rating / r.ratingMax) * 5, 0) /
    reviews.length
  ).toFixed(1);

  return (
    <section className="mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            Expert Tests & Reviews
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            What tech experts are saying • Average score: {avgRating}/5.0
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all"
            >
              {/* Rating Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{review.icon}</div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      {review.source}
                    </div>
                  </div>
                </div>
                <div
                  className={`${review.color} text-white px-3 py-1.5 rounded-lg font-bold text-sm`}
                >
                  {review.rating}/{review.ratingMax}
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {review.excerpt}
              </p>

              {/* Pros */}
              <div className="space-y-1.5 mb-4">
                {review.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <ThumbsUp className="h-3 w-3 text-green-600" />
                    <span className="text-slate-600">{pro}</span>
                  </div>
                ))}
              </div>

              {/* Read More Link */}
              <a
                href={review.url}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                Read full review →
              </a>
            </div>
          ))}
        </div>

        {/* User Reviews Teaser */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">
                  1,247 user reviews
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm font-semibold text-slate-700">
                  4.2
                </span>
              </div>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all reviews →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
