import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Bookmark } from "lucide-react";

export function FeaturedBlogCard({ blog }) {
  if (!blog) return null;

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-violet-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900">News & Reviews</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full mb-4">
              FEATURED
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {blog.author}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </span>
            </div>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              {blog.excerpt}
            </p>
            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
            >
              Read Article
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-2xl shadow-slate-900/10">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
