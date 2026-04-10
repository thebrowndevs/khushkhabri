import React from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'

export default function Loading() {
    return (
        <InnerDashboardLayout>
            {/* Header Skeleton */}
            <div className="w-full mb-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded-md w-64"></div>
            </div>

            {/* List Skeleton */}
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-pulse">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                                </div>
                                <div className="h-3 bg-gray-50 rounded w-48"></div>
                            </div>
                            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                            </div>
                        </div>
                        
                        {/* Status/Price Bar Skeleton */}
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div className="h-4 bg-gray-100 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                ))}
            </div>
        </InnerDashboardLayout>
    )
}
