import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

export function RelatedArticles({ relatedBlogs }) {
  if (relatedBlogs.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedBlogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
            <article className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-violet-200 transition-all duration-300">
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-violet-600 mb-2 block">
                  {blog.category}
                </span>
                <h3 className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
