import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
  return (
    <article className="group bg-white/40 backdrop-blur-md rounded-2xl border-2 border-[#efd4d8] hover:border-[#5a1e2b] transition-all duration-300 p-4 hover:-translate-y-1 shadow-sm hover:shadow-xl">
      <Link href={`/blogs/${blog.slug}`}>

        {/* IMAGE */}
        <div className="relative h-48 rounded-sm overflow-hidden mb-4">

          <Image
            src={blog.imageURL}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        </div>

        {/* CONTENT */}
        <div className="px-1 pb-1 flex flex-col justify-between h-[160px]">

          {/* TITLE */}
          <h2 className="text-lg font-semibold leading-normal text-[#4b0f1a] mb-2 line-clamp-2">
            {blog.title}
          </h2>

          {/* DESC */}
          <p className="text-gray-600 text-sm leading-normal line-clamp-3 mb-4">
            {blog.shortDescription}
          </p>

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-auto">

            {/* DATE */}
            <p className="text-xs text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            {/* READ MORE */}
            <span className="text-sm font-medium text-[#7a2535] group-hover:underline">
              Read More →
            </span>

          </div>

        </div>

      </Link>
    </article>
  );
}