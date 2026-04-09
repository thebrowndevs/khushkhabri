"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import React from 'react'
import OrdersAreaChart from './(dashboard)/OrdersAreaChart'
import RevenueSummary from './(dashboard)/RevenueSummary'
import UserBarChart from './(dashboard)/UserBarChart'
import TotalsCards from './(dashboard)/TotalsCards'
import EnquiriesPieChart from './(dashboard)/EnquiriesPieChart'
import OrdersStatusPieCharts from './(dashboard)/OrdersStatusPieCharts'
import { usePermissions } from '@/hooks/usePermissions'
import { useQueryClient } from '@tanstack/react-query'
import { Resources } from '@/lib/permissions'
import NotAuthorizedPage from '@/components/notAuthorized'

function page() {
    const queryClient = useQueryClient()
    const { checkView, } = usePermissions()

    // Permissions
    const canView = checkView(Resources.DASHBOARD)

    if (!canView) return <NotAuthorizedPage />

    return (
        <InnerDashboardLayout >
            <div className='w-full mb-3'>
                <h1 className='text-primary font-bold sm:text-2xl lg:text-4xl'>Dashboard</h1>
            </div>
            <div className='space-y-4 w-full'>
                <TotalsCards />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {/* <OrdersStatusPieCharts /> */}
                    {/* <div className='sm:col-span-2'> */}
                        <OrdersAreaChart />
                        <UserBarChart />
                    {/* </div> */}
                </div>

                {/* <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='sm:col-span-2'>
                    </div>
                    <EnquiriesPieChart />
                </div> */}

                <RevenueSummary />

            </div>
        </InnerDashboardLayout>
    )
}

export default page
