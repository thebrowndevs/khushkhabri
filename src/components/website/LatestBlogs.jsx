import BlogCard from "@/app/(main website)/blogs/components/BlogCard";
import { getLatestBlogs } from "@/lib/main/getBlogsData";
import Link from "next/link";

async function LatestBlogs() {
  const blogs = await getLatestBlogs();

  return (
    <section className="w-[95%] mx-auto px-4 sm:px-0 py-5 md:py-7 ">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">

          <h3 className="text-3xl md:text-5xl font-semibold text-[#4b0f1a] mb-3">
            Inspiration & Wedding Ideas
          </h3>

          <p className="text-gray-600 max-w-xl mx-auto">
            Explore tips, ideas and trends to make your invitation and celebrations even more special
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {blogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}

        </div>

        {/* CTA */}
        <div className="mt-8 mb-5 flex justify-center">

          <Link
            href="/blogs"
            className="px-7 py-3 rounded-md text-white bg-[#7a2535] hover:bg-[#5c1a27] transition duration-300"
          >
            Explore All Articles
          </Link>

        </div>

      </div>
    </section>
  );
}

export default LatestBlogs;