export const revalidate = 60;
// app/blogs/page.jsx
import React from 'react';
import BlogsClient from './components/BlogsClient';
import { getBlogsData } from '@/lib/main/getBlogsData';

export default async function page() {
    const blogs = await getBlogsData();
    // console.log(blogs)

    return (
        <BlogsClient
            allBlogs={blogs}
        />
    );
}
