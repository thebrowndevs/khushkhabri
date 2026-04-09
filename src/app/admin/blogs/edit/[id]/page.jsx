"use client"
// admin/blogs/edit/[id]/page.jsx

import React, { useEffect, useState } from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import BlogForm from '../../components/blog form/BlogForm';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';
import { useBlogs } from '@/hooks/useBlogs';
import NotAuthorizedPage from '@/components/notAuthorized';

export default function Page() {

    const {
        permissions: { canEdit }
    } = useBlogs({ status: true, featured: false, page: 1, pageSize: 10 })

    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                const { data } = await res.json();

                if (!res.ok) throw new Error('Failed to load blog');
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center py-10">{error}</div>
        );
    }


    if (!canEdit) {
        return <NotAuthorizedPage />
    }
    console.log(blog);

    return (
        <InnerDashboardLayout>
            <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-4">Update Blog</h1>

            <BlogForm defaultValues={blog} />
        </InnerDashboardLayout>
    )
}