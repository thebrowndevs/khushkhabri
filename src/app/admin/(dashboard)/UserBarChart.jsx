'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'

// Fetch daily signups for last N days
async function fetchUserSignups(days = 28) {
    const res = await fetch(`/api/dashboard/user-signups?days=${days}`)
    if (!res.ok) throw new Error('Failed to fetch user signups')
    return res.json()
}

export default function UserBarChart({ days = 28 }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['userSignups', days],
        queryFn: () => fetchUserSignups(days),
    })

    // data expected: { dates: string[], counts: number[] }
    // Group into weeks of 7 days
    const chartData = React.useMemo(() => {
        if (!data?.dates) return []
        const { dates, counts } = data
        const weeks = []
        for (let i = 0; i < dates.length; i += 7) {
            const chunkDates = dates.slice(i, i + 7)
            const chunkCounts = counts.slice(i, i + 7)
            const total = chunkCounts.reduce((a, b) => a + b, 0)
            const start = new Date(chunkDates[0])
            const end = new Date(chunkDates[chunkDates.length - 1])
            const format = (d) =>
                d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
            weeks.push({
                week: `Week ${weeks.length + 1}`,
                count: total,
                range: `${format(start)} - ${format(end)}`,
            })
        }
        return weeks
    }, [data])

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Users (Last {days} Days)</CardTitle>
                <CardDescription>
                    Showing data of users joining our website in last 28 days.
                </CardDescription>
            </CardHeader>
            <CardContent className="h-64">
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error loading data.</div>}
                {!isLoading && !isError && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
                            <XAxis dataKey="week" tickLine={false} axisLine={false} />
                            <Tooltip
                                formatter={(value) => `${value} users`}
                                labelFormatter={(label) => `Date Range: ${chartData.find((w) => w.week === label)?.range
                                    }`}
                            />
                            <Bar dataKey="count" fill="#10b981" name="New Users" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    {chartData.length > 0 && chartData[0].range.split(' - ')[1]}{' to '}{chartData.at(-1)?.range.split(' - ')[1]}
                </div>
            </CardFooter>
        </Card>
    )
}
