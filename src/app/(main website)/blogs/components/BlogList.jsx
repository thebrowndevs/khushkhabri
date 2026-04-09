// import Loader from "@/components/Loader";
import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
    return (
        <div className="space-y-8">
            {blogs.length === 0 ? (
                <p className="text-center py-10">No blogs found...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {blogs.map(blog => (
                            <BlogCard key={`${blog._id}-${blogs.length}`} blog={blog} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}