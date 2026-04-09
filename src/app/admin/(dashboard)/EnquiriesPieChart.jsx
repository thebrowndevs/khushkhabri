'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const fetchEnquiriesSummary = async () => {
    const res = await fetch('/api/dashboard/enquiries-summary')
    if (!res.ok) throw new Error('Failed to fetch enquiries summary')
    return res.json()
}

export default function EnquiriesPieChart() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['enquiriesSummary'],
        queryFn: fetchEnquiriesSummary,
    })

    if (isLoading) return <div className="p-4">Loading...</div>
    if (isError) return <div className="p-4 text-red-500">Error loading data</div>

    const chartData = [
        { name: 'Pending', value: data.pending },
        { name: 'Resolved', value: data.resolved },
    ]
    const COLORS = ['#f59e0b', '#10b981']  // amber for pending, green for resolved

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enquiries Status</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={4}
                            label
                        >
                            {chartData.map((_, idx) => (
                                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}`} />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
