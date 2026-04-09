import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from './blog.module.css';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

function BlogData({ blog }) {
    return (
        <section className="w-full flex flex-col gap-5 p-2">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <div className='w-full relative h-full'>
                {blog?.imageURL && (
                    <img
                        className="h-full max-h-[300px] object-cover rounded-lg w-full"
                        src={blog.imageURL}
                        alt={blog.title || 'blog Image'}
                    />
                )}
            </div>
            <div className={`px-3 rounded-md ${styles.postStyle}`}>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                >
                    {blog.content}
                </ReactMarkdown>
            </div>
        </section>
    );
}

export default BlogData;