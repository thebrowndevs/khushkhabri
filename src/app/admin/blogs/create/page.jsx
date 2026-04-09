"use client"
import React from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import BlogForm from '../components/blog form/BlogForm';

function page() {

    return (
        <InnerDashboardLayout>
            <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-4">Create New Blog</h1>
            <BlogForm />
        </InnerDashboardLayout>
    )
}

export default page