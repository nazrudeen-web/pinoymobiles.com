import Link from "next/link";
import Image from "next/image";
import { Clock, Bookmark } from "lucide-react";

export function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-violet-200 transition-all duration-300">
      <Link href={`/blogs/${blog.slug}`} className="group">
        <div className="relative aspect-16/9 md:aspect-4/3 bg-slate-100 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-5 md:p-6">
          <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full mb-3">
            {blog.category}
          </span>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2 mb-3">
            {blog.title}
          </h2>

          <p className="text-sm text-slate-600 line-clamp-2 mb-4">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {blog.author.charAt(0)}
              </div>
              <div className="text-xs text-slate-500">
                <p className="font-medium text-slate-700">{blog.author}</p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {blog.readTime}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-violet-600">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
