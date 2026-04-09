"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useUsers } from '@/hooks/useUsers'
import OrderAccordion from '../components/OrderAccordion'
import UserProfileSkeleton from '../components/UserProfileSkeleton'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'

export default function OrdersPage() {
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
            <div className="text-red-500 p-4 text-center">Error loading orders</div>
        </InnerDashboardLayout>
    );

    const ordersData = userData?.orders ? [...userData.orders].reverse() : [];

    return (
        <InnerDashboardLayout>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Orders History</h1>
                <p className="text-gray-500">Track your past purchases and theme orders.</p>
            </div>

            {ordersData.length > 0 ? (
                <div className="space-y-4">
                    {ordersData.map(order => (
                        <OrderAccordion key={order._id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="bg-gray-50 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">No orders found</p>
                    <p className="text-gray-400 text-sm mt-1">Your purchased themes will appear here.</p>
                </div>
            )}
        </InnerDashboardLayout>
    )
}
