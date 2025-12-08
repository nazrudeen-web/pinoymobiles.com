import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Calendar,
  Bookmark,
  Facebook,
  Twitter,
  Link2,
} from "lucide-react";

export function BlogHeader({ blog }) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-violet-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/blogs"
            className="hover:text-violet-600 transition-colors"
          >
            News & Reviews
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 truncate max-w-[300px]">
            {blog.title}
          </span>
        </nav>

        <div className="max-w-4xl">
          <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
            {blog.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {blog.author}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-violet-600 transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-all">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-sky-100 text-slate-600 hover:text-sky-600 transition-all">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-violet-600 transition-all">
                  <Link2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
