"use client"
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Cross, Menu } from 'lucide-react';
import { IMAGES } from '@/lib/constants/assets';
import Image from 'next/image';

function LayoutDashboard({ children, sidebarLinks }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='fixed inset-0 flex flex-col sm:flex-row overflow-hidden bg-white font-sans'>
            {/* Mobile Header */}
            <div className="sm:hidden flex flex-none items-center justify-between p-4 bg-gray-900 text-white shadow-md z-[60]">
                <Image
                    height={32}
                    width={120}
                    src={IMAGES.LOGO}
                    alt="logo"
                    className="h-8 w-auto invert brightness-0"
                />
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {sidebarOpen ? <Cross className="w-6 h-6 rotate-90 transition-transform" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} sidebarLinks={sidebarLinks} />

            {/* Main Content Area */}
            <div 
                className='flex-1 relative overflow-y-auto overflow-x-hidden bg-gray-50'
                onClick={() => setSidebarOpen(false)}
            >
                <div className="min-h-full flex flex-col p-4 md:p-6 lg:p-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutDashboard