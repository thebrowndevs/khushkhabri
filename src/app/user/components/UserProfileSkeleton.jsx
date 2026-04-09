import React from 'react'

function UserProfileSkeleton() {
    return (
        <div className='max-w-6xl mx-auto my- p-2 sm:p-5 rounded-2xl min-h-[90vh]'>
            {/* Skeleton Loader */}
            <div className="space-y-6 animate-pulse">
                {/* Upper Strip Skeleton */}
                <div className="bg-gray-200 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-center mb-3 sm:mb-0">
                            {/* Avatar Skeleton */}
                            <div className="bg-gray-300 rounded-full w-16 h-16"></div>
                            <div className="ml-4">
                                <div className="h-6 bg-gray-300 rounded w-40 mb-2"></div>
                                <div className="flex items-center">
                                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-300 px-4 py-2 rounded-lg w-32 h-12"></div>
                    </div>
                </div>

                {/* Lower Section Skeleton */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Tab Headers Skeleton */}
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <div className="py-4 px-6 w-20 h-12 bg-gray-200 mr-2"></div>
                            <div className="py-4 px-6 w-24 h-12 bg-gray-200"></div>
                        </nav>
                    </div>

                    {/* Tab Content Skeleton */}
                    <div className="p-4 sm:p-6">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>

                        {/* Order Cards Skeleton */}
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between mb-3">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-36"></div>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileSkeleton