"use client"

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

const COLORS_MAP = {
    new: '#3b82f6',
    inProcess: '#facc15',
    delivered: '#10b981',
    cancelled: '#ef4444',
}

async function fetchOrdersStatusSummary() {

    const res = await fetch('/api/dashboard/orders-status-summary')
    if (!res.ok) throw new Error('Failed to fetch orders status summary')
    return res.json()
}

export default function OrdersStatusPieCharts() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['ordersStatusSummary'],
        queryFn: fetchOrdersStatusSummary,
    })

    if (isLoading) return <div className="p-4">
        <Card>
            Loading...
        </Card>
    </div>
    if (isError) return <div className="p-4 text-red-500">Error loading data</div>

    const types = ['website']

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {types.map((type) => {
                const chartData = Object.entries(data[type]).map(([status, value]) => ({ name: status, value }))
                return (
                    <Card key={type}>
                        <CardHeader>
                            <CardTitle className="capitalize">Orders</CardTitle>
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
                                        outerRadius={80}
                                        label={({ name }) => name.charAt(0).toUpperCase() + name.slice(1)}
                                    >
                                        {chartData.map((entry, idx) => (
                                            <Cell key={`cell-${idx}`} fill={COLORS_MAP[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => value} />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        iconSize={12}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-sm capitalize text-gray-600">{value}</span>}
                                        wrapperStyle={{ paddingTop: '20px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
