import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight } from "lucide-react";

export function BlogSidebar({ recentBlogs }) {
  const categories = [
    "Comparison",
    "Buying Guide",
    "Tips & Tricks",
    "News",
    "Analysis",
  ];

  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-28 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Recent Posts
          </h3>
          <div className="space-y-4">
            {recentBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group flex gap-3"
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{blog.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href="/blogs"
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-violet-50 text-slate-600 hover:text-violet-600 transition-colors"
              >
                <span className="text-sm">{cat}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
          <p className="text-sm text-violet-100 mb-4">
            Get the latest phone reviews and deals delivered to your inbox.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-violet-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 mb-3"
          />
          <button className="w-full py-2.5 bg-white text-violet-600 font-semibold rounded-lg hover:bg-violet-50 transition-colors text-sm">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
}
