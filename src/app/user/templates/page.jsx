"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUsers } from '@/hooks/useUsers'
import { THEMES, getThemeByThemeName } from '@/lib/constants/themes'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import UserProfileSkeleton from '../components/UserProfileSkeleton'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { LayoutGrid, ExternalLink, Calendar, Hash } from 'lucide-react'

export default function TemplatesPage() {
    const { data: session, status: sessionStatus } = useSession()
    const { getUserQuery } = useUsers({ role: 'user', page: 1, pageSize: 10 })
    const userId = session?.user?.id

    const {
        isLoading: loading,
        error: error,
        data: userData
    } = getUserQuery(userId)

    useEffect(() => {
        // Only refresh if we've waited and session is still not found
        // This helps in some cases where the session cookie takes a moment to be readable
        const hasRefreshed = sessionStorage.getItem('templates_initial_refresh');
        if (!hasRefreshed && sessionStatus === 'unauthenticated') {
            sessionStorage.setItem('templates_initial_refresh', 'true');
            window.location.reload();
        }
    }, [sessionStatus]);

    if (sessionStatus === 'loading' || (sessionStatus === 'authenticated' && loading)) return (
        <InnerDashboardLayout>
            <UserProfileSkeleton />
        </InnerDashboardLayout>
    );

    if (error) return (
        <InnerDashboardLayout>
            <div className="text-red-500 p-4 text-center bg-red-50 rounded-xl border border-red-100">
                Error loading your templates. Please try again later.
            </div>
        </InnerDashboardLayout>
    );

    // Filter for paid theme orders and sort by latest first
    const paidOrders = userData?.orders
        ? [...userData.orders]
            .filter(order => order.status === 'paid')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    return (
        <InnerDashboardLayout>
            <div className="w-full mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        <LayoutGrid size={20} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Templates</h1>
                </div>
                <p className="text-gray-500 text-sm">Manage and edit your purchased invitation themes.</p>
            </div>

            {paidOrders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {paidOrders.map((order) => {
                        const themeInfo = getThemeByThemeName(order.themeName) || {
                            title: order.themeName,
                            image: "/templates/sikh/preview.png", // fallback
                            category: "Theme"
                        };

                        return (
                            <div key={order._id} className="group bg-white rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-row items-stretch h-36">
                                {/* Image Container */}
                                <div className="relative w-28 sm:w-32 h-full bg-gray-50 flex-shrink-0 border-r border-gray-100">
                                    <Image
                                        src={themeInfo.image}
                                        alt={themeInfo.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded pl-1 text-[8px] font-bold text-[#8b2c3c] shadow-sm uppercase tracking-widest break-all">
                                            {themeInfo.category.split(' ')[0]}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0 justify-between">
                                    <div>
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 truncate">{themeInfo.title}</h3>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 truncate">
                                                <Hash size={12} className="text-gray-400 shrink-0" />
                                                <span className="font-mono truncate">ID: {order.orderId.slice(-8)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                                <Calendar size={12} className="text-gray-400 shrink-0" />
                                                <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/user/templates/${order._id}`}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 mt-2 bg-gray-900 text-white rounded-sm text-xs font-semibold hover:bg-[#8b2c3c] transition-colors duration-300 group/btn"
                                    >
                                        <span>Open Editor</span>
                                        <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200 p-16 text-center max-w-2xl mx-auto my-12">
                    <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                        <LayoutGrid size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">You have not purchased any templates yet</h3>
                    <p className="text-gray-500 text-lg mb-8 px-4 leading-relaxed">
                        Once you buy a beautyfully crafted theme from our collection, it will appear here for you to customize and share.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b2c3c] text-white rounded-full font-bold hover:bg-[#5a1e2b] transition-all shadow-lg hover:shadow-[#8b2c3c]/30"
                    >
                        Browse Templates
                    </Link>
                </div>
            )}
        </InnerDashboardLayout>
    )
}
