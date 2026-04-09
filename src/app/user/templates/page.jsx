"use client"
import React from 'react'
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
    const { data: session } = useSession()
    const { getUserQuery } = useUsers({ role: 'user', page: 1, pageSize: 10 })
    const userId = session?.user?.id

    const {
        isLoading: loading,
        error: error,
        data: userData
    } = getUserQuery(userId)

    if (loading) return (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paidOrders.map((order) => {
                        const themeInfo = getThemeByThemeName(order.themeName) || {
                            title: order.themeName,
                            image: "/templates/sikh/preview.png", // fallback
                            category: "Theme"
                        };

                        return (
                            <div key={order._id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                                    <Image
                                        src={themeInfo.image}
                                        alt={themeInfo.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-[#8b2c3c] shadow-sm uppercase tracking-wider">
                                            {themeInfo.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">{themeInfo.title}</h3>

                                    <div className="space-y-1.5 mb-4 flex-1">
                                        <div className="flex items-center gap-2 text-[12px] text-gray-500">
                                            <Hash size={12} className="text-gray-400" />
                                            <span className="font-mono">ID: {order.orderId.slice(-8)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] text-gray-500">
                                            <Calendar size={12} className="text-gray-400" />
                                            <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/user/templates/${order._id}`}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-[#8b2c3c] transition-all duration-300 group/btn"
                                    >
                                        <span>Open Template</span>
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
