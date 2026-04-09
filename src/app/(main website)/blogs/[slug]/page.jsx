// app/blogs/[slug]/page.jsx

export const revalidate = 60;

import EnquiryForm from '@/components/website/EnquiryForm';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getBlogBySlug } from '@/lib/main/getBlogsData';
import React from 'react';
import BlogData from '../components/BlogData';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import LatestBlogs from '@/components/website/LatestBlogs';
import { Separator } from '@/components/ui/separator';


// =============================
// Dynamic SEO Metadata
// =============================
export async function generateMetadata({ params }) {

    const blog = await getBlogBySlug(params.slug);

    if (!blog) {
        return {
            title: "Blog Not Found | Khushkhabri",
            description: "The requested blog does not exist.",
        };
    }

    const siteUrl = "https://khushkhabri.in";

    const blogUrl = `${siteUrl}/blogs/${blog.slug}`;

    const tagKeywords = blog?.tags?.map(tag => tag.name) || [];
    const categoryKeywords = blog?.categories?.map(cat => cat.name) || [];

    return {
        title: `${blog.title} | Khushkhabri Blog`,
        description: blog.shortDescription,
        keywords: [
            blog.title,
            ...tagKeywords,
            ...categoryKeywords,
            "Khushkhabri Blog",
            "Digital Invitation Insights",
            "Wedding Planning Articles",
        ],
        alternates: {
            canonical: blogUrl,
        },
        openGraph: {
            title: blog.title,
            description: blog.shortDescription,
            url: blogUrl,
            siteName: "Khushkhabri",
            locale: "en_IN",
            type: "article",
            images: [
                {
                    url: blog.imageURL,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.shortDescription,
            images: [blog.imageURL],
        },
    };
}


// =============================
// Blog Page
// =============================
export default async function Page({ params }) {

    const blog = await getBlogBySlug(params.slug);

    if (!blog) return null;

    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://khushkhabri.in";

    const blogUrl = `${siteUrl}/blogs/${blog.slug}`;

    // ----------------------------
    // BlogPosting Schema
    // ----------------------------
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.shortDescription,
        image: blog.imageURL,
        author: {
            "@type": "Organization",
            name: "Khushkhabri",
        },
        publisher: {
            "@type": "Organization",
            name: "Khushkhabri",
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
            },
        },
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": blogUrl,
        },
    };

    // ----------------------------
    // Breadcrumb Schema
    // ----------------------------
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: `${siteUrl}/blogs`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: blogUrl,
            },
        ],
    };

    return (
        <WebsiteLayout>
            <div className='bg-[#fff8f9]'>
            <article className="max-w-7xl mx-auto space-y-5 px-2 sm:px-4 lg:px-0 pt-3 md:pt-8 ">

                {/* Blog Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(blogSchema),
                    }}
                />

                {/* Breadcrumb Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbSchema),
                    }}
                />
                    <div className="flex-1 h-full flex flex-col max-w-6xl mx-auto">

                        <Breadcrumb className="mb-1 px-2">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{blog.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <BlogData blog={blog} />
                    </div>

                <Separator className={'mt-10'} />

                <div>
                    <LatestBlogs />
                </div>

            </article>
            </div>
        </WebsiteLayout>
    );
}