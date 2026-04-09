import React from 'react'
import BlogList from './BlogList';
import BlogsHero from '@/components/website/home/BlogsHero';
import NavBar from '@/components/website/common/Navbar';
import Footer from '@/components/website/common/Footer';

function BlogsClient({ allBlogs }) {
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
                <NavBar />

                {/* Animated BlogsHero Section */}
                <BlogsHero />

                {/* UNIFIED BACKGROUND WRAPPER FOR SMOOTH BLENDING */}
                <div
                    className="relative w-full z-20 pb-20 min-h-[400px]"
                    style={{
                        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,248,249,0.95) 150px, rgba(255,248,249,0.95) 100%)"
                    }}
                >
                    <div className='max-w-7xl mx-auto px-4'>
                        {allBlogs.length === 0 ? (
                            <div className="bg-white/40 backdrop-blur-lg border border-white/60 p-12 rounded-3xl shadow-xl text-center max-w-2xl mx-auto mt-10">
                                <h3 className="text-2xl font-bold text-[#5a1e2b] mb-4">No Blogs Found</h3>
                                <p className="text-gray-700 text-lg">
                                    Currently, there are no blogs to show. Please check back later for more wedding inspiration and tips!
                                </p>
                            </div>
                        ) : (
                            <BlogList
                                blogs={allBlogs}
                            />
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default BlogsClient;