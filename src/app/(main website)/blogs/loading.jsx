import React from "react";

export default function Loading() {
    return (
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
                {/* Navbar Placeholder (White Bar) */}
                <div className="w-full h-[70px] bg-white border-b border-gray-100" />

                {/* Skeleton BlogsHero Section */}
                <div className="py-20 md:py-24 px-4 text-center max-w-4xl mx-auto w-full animate-pulse">
                    <div className="h-12 md:h-16 bg-gray-200/50 rounded-2xl w-3/4 mx-auto mb-6" />
                    <div className="h-6 bg-gray-200/50 rounded-xl w-1/2 mx-auto" />
                </div>

                {/* UNIFIED BACKGROUND WRAPPER SKELETON */}
                <div
                    className="relative w-full z-20 pb-20 mt-10"
                    style={{
                        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,248,249,0.95) 150px, rgba(255,248,249,0.95) 100%)"
                    }}
                >
                    <div className='max-w-7xl mx-auto px-4'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-[#efd4d8] h-[340px]">
                                    <div className="h-40 bg-gray-200/50 rounded-xl mb-4 w-full" />
                                    <div className="h-6 bg-gray-200/50 rounded-lg mb-3 w-5/6" />
                                    <div className="h-4 bg-gray-200/50 rounded-lg mb-2 w-full" />
                                    <div className="h-4 bg-gray-200/50 rounded-lg w-4/6" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
