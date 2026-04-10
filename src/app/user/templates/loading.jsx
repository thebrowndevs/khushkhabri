import React from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { LayoutGrid } from 'lucide-react'

export default function Loading() {
    return (
        <InnerDashboardLayout>
            {/* Header Skeleton */}
            <div className="w-full mb-6 animate-pulse">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-blue-50/50 rounded-lg w-8 h-8"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
                </div>
                <div className="h-4 bg-gray-100 rounded-md w-64 mt-2"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-pulse">
                        {/* Image Skeleton */}
                        <div className="relative aspect-[4/5] w-full bg-gray-100">
                            <div className="absolute top-3 left-3 w-16 h-4 bg-gray-200/50 rounded-full"></div>
                        </div>

                        {/* Content Skeleton */}
                        <div className="p-4 flex flex-col flex-1 space-y-3">
                            <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                                    <div className="h-3 bg-gray-100 rounded-md w-1/2"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                                    <div className="h-3 bg-gray-100 rounded-md w-1/3"></div>
                                </div>
                            </div>

                            <div className="w-full h-10 bg-gray-100 rounded-xl mt-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </InnerDashboardLayout>
    )
}
