import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import { blogs } from "@/lib/data/blogs";
import {
  Clock,
  ArrowLeft,
  Bookmark,
  Calendar,
  ChevronRight,
  Facebook,
  Twitter,
  Link2,
} from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | PinoyMobiles`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs (same category, excluding current)
  const relatedBlogs = blogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);

  // Get recent blogs for sidebar
  const recentBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 5);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link
                href="/"
                className="hover:text-violet-600 transition-colors"
              >
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
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
                {blog.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                {blog.excerpt}
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-6 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-200">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {blog.author}
                    </p>
                    <p className="text-sm text-slate-500">Mobile Expert</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-slate-500 mr-2 hidden sm:block">
                    Share:
                  </span>
                  <button className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors">
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex gap-8">
            {/* Article Content */}
            <article className="flex-1 min-w-0">
              {/* Featured Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 mb-8 shadow-xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Body */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10">
                <div
                  className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-bold prose-headings:text-slate-900
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 prose-strong:font-semibold
                    prose-ul:text-slate-600 prose-li:marker:text-violet-600"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                <div className="mt-10 pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">
                      Tags:
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                      {blog.category}
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                      Mobile Phones
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                      Philippines
                    </span>
                  </div>
                </div>

                {/* Author Box */}
                <div className="mt-8 p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-200 shrink-0">
                      <span className="text-white font-bold text-2xl">P</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {blog.author}
                      </h3>
                      <p className="text-sm text-violet-600 font-medium mb-2">
                        Mobile Technology Expert
                      </p>
                      <p className="text-sm text-slate-600">
                        Our team of experts reviews and compares the latest
                        smartphones to help you make informed buying decisions
                        in the Philippines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.slug}
                        href={`/blogs/${relatedBlog.slug}`}
                        className="group"
                      >
                        <article className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-violet-200 transition-all duration-300">
                          <div className="relative aspect-[16/10] bg-slate-100">
                            <Image
                              src={relatedBlog.image}
                              alt={relatedBlog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs font-medium text-violet-600 mb-2 block">
                              {relatedBlog.category}
                            </span>
                            <h3 className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                              {relatedBlog.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                              <Clock className="w-3.5 h-3.5" />
                              {relatedBlog.readTime}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Recent Posts */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recentBlogs.map((recentBlog) => (
                      <Link
                        key={recentBlog.slug}
                        href={`/blogs/${recentBlog.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <Image
                            src={recentBlog.image}
                            alt={recentBlog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                            {recentBlog.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {recentBlog.readTime}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Comparison",
                      "Buying Guide",
                      "Tips & Tricks",
                      "News",
                      "Analysis",
                    ].map((cat) => (
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

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                  <p className="text-sm text-violet-100 mb-4">
                    Get the latest phone reviews and deals delivered to your
                    inbox.
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
          </div>
        </div>

        {/* Back to Blogs */}
        <div className="bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to all articles
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
