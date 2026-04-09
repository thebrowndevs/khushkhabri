'use client'

import React from 'react'
import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    XAxis,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from '@/components/ui/card'

const fetchRevenueData = async (days = 28) => {
    const res = await fetch(`/api/dashboard/revenue-summary?days=${days}`)
    if (!res.ok) throw new Error('Failed to fetch revenue data')
    return res.json()
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
    })
}

const RevenueSummary = ({ days = 28 }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['revenue-summary', days],
        queryFn: () => fetchRevenueData(days),
    })

    if (isLoading) return <div className="p-4">Loading chart...</div>
    if (isError) return <div className="p-4">Error loading data</div>

    const chartData = data.dates.map((date, index) => ({
        date,
        revenue: data.revenues[index] || 0,
    }))

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>Revenue (Last {days} Days)</CardTitle>
                    <CardDescription>
                        Paid orders revenue trend
                    </CardDescription>
                </div>

                {/* Total Revenue */}
                <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md text-xs font-semibold text-center">
                    ₹{data.totalRevenue?.toLocaleString()}
                    <br />
                    Total Revenue
                </div>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            formatter={(value) => `₹${value}`}
                            labelFormatter={(label) => formatDate(label)}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.25}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <p className="text-xs text-muted-foreground mt-4 text-right">
                    {formatDate(data.dates[0])} - {formatDate(data.dates.at(-1))}
                </p>
            </CardContent>
        </Card>
    )
}

export default RevenueSummary