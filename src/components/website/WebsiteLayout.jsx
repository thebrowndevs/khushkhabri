"use client"
import React from 'react'
import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'
import SmoothScroll from '@/components/website/common/SmoothScroll'

export default function WebsiteLayout({ children }) {

    return (
        <SmoothScroll>
            <div className='pb-14 sm:pb-0 '>
                <div className=''>
                    <NavBar />
                </div>

                <div className='min-h-screen bg-[#ffffff]'>
                    {children}
                </div>

                <Footer />
            </div>
        </SmoothScroll>
    )
}
