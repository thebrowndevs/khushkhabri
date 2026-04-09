// app/blogs/components/BlogCard.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ blog }) {
    return (
        <article className="bg-white rounded-sm overflow-hidden border border-gray-300 transition-all duration-300 h-full flex flex-col">
            <Link href={`/blogs/${blog.slug}`} className="group flex flex-col h-full">
                {/* Image */}
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <Image
                        src={blog.imageURL}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Content */}
                <div className="py-3 px-4 flex flex-col flex-grow">
                    {/* Top Content */}
                    <div className="flex-1">
                        <div className="flex items-center mb-1">
                            <div className="flex items-center text-sm text-gray-500">
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 
                                        2v10a2 2 0 002 2h12a2 2 0 
                                        002-2V6a2 2 0 00-2-2h-1V3a1 
                                        1 0 10-2 0v1H7V3a1 1 0 
                                        00-1-1zm0 5a1 1 0 000 
                                        2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span>
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
                            {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-1 line-clamp-3">
                            {blog.shortDescription}
                        </p>
                    </div>

                    {/* Read more */}
                    <div className="pt-2 pb-2 border-t border-gray-100">
                        <div className="flex items-center justify-end">
                            <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                                Read more
                                <svg
                                    className="ml-1 w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
