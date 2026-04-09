import React from "react";
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
    return (
        <WebsiteLayout>
            <article className="max-w-7xl mx-auto space-y-5 px-0 pt-14 sm:pt-20">

                <section className="flex gap-4 lg:gap-10 flex-col mx-auto lg:flex-row pt-5">

                    {/* Main Content Skeleton (Left) */}
                    <div className="flex-1 h-full flex flex-col">

                        {/* Breadcrumbs Skeleton */}
                        <div className="flex gap-2 mb-4 px-2 items-center">
                            <div className="h-4 w-12 bg-gray-200 rounded" />
                            <div className="h-3 w-3 bg-gray-200 rounded-full" />
                            <div className="h-4 w-12 bg-gray-200 rounded" />
                            <div className="h-3 w-3 bg-gray-200 rounded-full" />
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                        </div>

                        {/* Blog Header / Image Skeleton */}
                        <div className="w-full aspect-video bg-gray-200 rounded-2xl mb-6" />

                        {/* Title Skeleton */}
                        <div className="space-y-3 mb-6">
                            <div className="h-10 bg-gray-200 w-full rounded" />
                            <div className="h-10 bg-gray-200 w-3/4 rounded" />
                        </div>

                        {/* Meta lines skeleton */}
                        <div className="flex gap-4 mb-8">
                            <div className="h-5 bg-gray-200 w-24 rounded-full" />
                            <div className="h-5 bg-gray-200 w-32 rounded-full" />
                        </div>

                        {/* Content text lines skeleton */}
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 w-full rounded" />
                            <div className="h-4 bg-gray-200 w-full rounded" />
                            <div className="h-4 bg-gray-200 w-11/12 rounded" />
                            <div className="h-4 bg-gray-200 w-full rounded" />
                            <div className="h-4 bg-gray-200 w-4/5 rounded" />
                            <br />
                            <div className="h-6 bg-gray-200 w-1/3 rounded mb-2" />
                            <div className="h-4 bg-gray-200 w-full rounded" />
                            <div className="h-4 bg-gray-200 w-10/12 rounded" />
                            <div className="h-4 bg-gray-200 w-full rounded" />
                        </div>

                    </div>

                    {/* Sidebar Skeleton (Right) */}
                    <div className="lg:w-82 flex flex-col gap-5 lg:sticky lg:top-28 lg:h-fit">
                        {/* Enquiry Form Placeholder */}
                        <div className="bg-gray-100 rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
                            <div className="h-6 bg-gray-200 w-1/2 rounded mb-2" />
                            <div className="h-10 bg-gray-200 w-full rounded" />
                            <div className="h-10 bg-gray-200 w-full rounded" />
                            <div className="h-24 bg-gray-200 w-full rounded" />
                            <div className="h-10 bg-gray-300 w-full rounded mt-2" />
                        </div>
                    </div>

                </section>

                <Separator className="mt-10 mb-10" />

                {/* LatestBlogs section skeleton */}
                <div className="px-2">
                    <div className="h-8 bg-gray-200 w-48 rounded mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((idx) => (
                            <div key={idx} className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-3 border border-gray-200">
                                <div className="h-40 bg-gray-200 rounded-xl w-full" />
                                <div className="h-5 bg-gray-200 rounded w-full mt-2" />
                                <div className="h-5 bg-gray-200 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </div>

            </article>
        </WebsiteLayout>
    );
}
