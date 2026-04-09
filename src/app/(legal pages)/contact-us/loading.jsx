import React from "react";
import SmoothScroll from "@/components/website/common/SmoothScroll";

export default function Loading() {
    return (
        <SmoothScroll>
            <div className="relative min-h-screen w-full">
                {/* GLOBAL FIXED BACKGROUND FOR PARALLAX */}
                <div
                    className="fixed inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/bg/pinkbg.png')`, backgroundColor: '#FFEAED' }}
                />
                {/* Shared Overlay */}
                <div className="fixed inset-0 z-0 bg-white/60 backdrop-blur-[2px]" />

                {/* FOREGROUND CONTENT */}
                <div className="relative z-10 flex flex-col">
                    {/* Navbar Placeholder */}
                    <div className="w-full h-[70px] bg-white border-b border-gray-100" />

                    {/* Skeleton ContactHero Section */}
                    <div className="py-20 md:py-24 px-4 text-center max-w-4xl mx-auto w-full animate-pulse">
                        <div className="h-12 md:h-16 bg-gray-200/50 rounded-2xl w-3/4 mx-auto mb-6" />
                        <div className="h-6 bg-gray-200/50 rounded-xl w-1/2 mx-auto" />
                    </div>

                    {/* Form Skeleton */}
                    <div className="w-[95%] lg:w-[85%] max-w-6xl mx-auto animate-pulse">
                        <div className="bg-white/40 backdrop-blur-lg border-2 border-[#efd4d8] rounded-3xl p-8 lg:p-12 shadow-xl h-[600px] flex flex-col lg:flex-row gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="h-40 bg-gray-200/50 rounded-2xl" />
                                <div className="h-64 bg-gray-200/50 rounded-2xl hidden lg:block" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="h-14 bg-gray-200/50 rounded-xl" />
                                <div className="h-14 bg-gray-200/50 rounded-xl" />
                                <div className="h-14 bg-gray-200/50 rounded-xl" />
                                <div className="h-32 bg-gray-200/50 rounded-xl" />
                                <div className="h-14 bg-gray-200/50 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SmoothScroll>
    );
}
