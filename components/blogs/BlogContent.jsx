import Image from "next/image";

export function BlogContent({ blog }) {
  return (
    <>
      <div className="relative aspect-[21/9] bg-slate-100 rounded-2xl overflow-hidden mb-10">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg prose-slate max-w-none">
        <p className="lead text-xl text-slate-600 leading-relaxed">
          {blog.content}
        </p>
        <h2>Key Features to Consider</h2>
        <ul>
          <li>
            <strong>Display Quality:</strong> Look for AMOLED screens with high
            refresh rates
          </li>
          <li>
            <strong>Camera Performance:</strong> Compare megapixels and
            additional lenses
          </li>
          <li>
            <strong>Battery Life:</strong> Consider real-world usage scenarios
          </li>
          <li>
            <strong>Performance:</strong> Check processor benchmarks and RAM
          </li>
        </ul>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-200">
        <div className="bg-slate-50 rounded-xl p-6">
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
                Our team of experts reviews and compares the latest smartphones
                to help you make informed buying decisions in the Philippines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
