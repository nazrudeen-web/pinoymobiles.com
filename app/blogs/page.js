"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import { blogs, blogCategories } from "@/lib/data/blogs";
import { ChevronDown, Clock, ArrowRight, Search, Bookmark } from "lucide-react";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredBlog = blogs.find((b) => b.featured);

  const filteredBlogs = useMemo(() => {
    let result = blogs.filter((b) => !b.featured);

    if (selectedCategory !== "All") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.excerpt.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section with Featured Article */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-violet-600">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900">News & Reviews</span>
            </nav>

            {featuredBlog && (
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Featured Content */}
                <div className="order-2 lg:order-1">
                  <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full mb-4">
                    FEATURED
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    {featuredBlog.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-5">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-linear-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25">
                        <span className="text-white font-bold">P</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {featuredBlog.author}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(featuredBlog.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {featuredBlog.readTime}
                    </span>
                  </div>
                  <p className="mt-5 text-slate-600 leading-relaxed text-lg">
                    {featuredBlog.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Featured Image */}
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl shadow-slate-900/10">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Latest Articles
                </h2>
                <p className="text-slate-500 mt-1">
                  Stay updated with the latest mobile news and reviews
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-200">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}

              {/* Sort */}
              <div className="ml-auto relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-10 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="group"
                >
                  <article className="h-full bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                          {blog.category}
                        </span>
                      </div>

                      {/* Bookmark Button */}
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white">
                        <Bookmark className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2 mb-3">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-linear-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              P
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {blog.author}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {blog.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 text-violet-600 font-medium hover:bg-violet-50 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredBlogs.length > 0 && (
              <div className="text-center mt-12">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
                  Load More Articles
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Never Miss an Update
              </h2>
              <p className="text-violet-100 mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter and get the latest phone news,
                reviews, and deals delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
