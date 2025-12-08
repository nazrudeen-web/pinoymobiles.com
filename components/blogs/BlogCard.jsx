import Link from "next/link";
import Image from "next/image";
import { Clock, Bookmark } from "lucide-react";

export function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-xl md:rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-violet-300/50 hover:shadow-violet-600/10 transition-all duration-300">
      <Link href={`/blogs/${blog.slug}`} className="group">
        <div className="relative aspect-16/9 md:aspect-4/3 bg-slate-100 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 md:p-6">
          <span className="inline-block px-3 py-1.5 bg-linear-to-r from-violet-100 to-purple-100 text-violet-700 text-xs font-semibold rounded-full mb-3 border border-violet-200/50">
            {blog.category}
          </span>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2 mb-3 leading-snug">
            {blog.title}
          </h2>

          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-linear-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                {blog.author.charAt(0)}
              </div>
              <div className="text-xs text-slate-500">
                <p className="font-semibold text-slate-700">{blog.author}</p>
                <p className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {blog.readTime}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-violet-600 hover:scale-110">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
