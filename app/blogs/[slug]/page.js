import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/header/Header";
import { blogs } from "@/lib/data/blogs";
import { BlogHeader } from "@/components/blogs/BlogHeader";
import { BlogContent } from "@/components/blogs/BlogContent";
import { RelatedArticles } from "@/components/blogs/RelatedArticles";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";

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

  const relatedBlogs = blogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);
  const recentBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 5);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <BlogHeader blog={blog} />

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex gap-10">
            <article className="flex-1 min-w-0">
              <BlogContent blog={blog} />
              <RelatedArticles relatedBlogs={relatedBlogs} />
            </article>
            <BlogSidebar recentBlogs={recentBlogs} />
          </div>
        </div>

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
