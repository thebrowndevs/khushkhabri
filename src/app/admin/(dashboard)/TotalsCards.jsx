'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, } from '@/components/ui/card'
import {
    LayoutGrid,
    Settings,
    Layers,
    Users,
    Phone,
    FileText,
    Loader2,
} from 'lucide-react'
import { AiFillProduct } from "react-icons/ai";
import { motion } from 'framer-motion'
import { FaProductHunt } from 'react-icons/fa'

async function fetchTotals() {
    const res = await fetch('/api/dashboard/totals')
    if (!res.ok) throw new Error('Failed to fetch totals')
    return res.json()
}

export default function TotalsCards() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['dashboardTotals'],
        queryFn: fetchTotals,
        refetchInterval: 300000
    })

    if (isLoading) return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="h-full rounded-2xl bg-white shadow-md border-0 overflow-hidden relative">
                    <div className="p-6">
                        <div className="h-12 w-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-5 animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 rounded-full mb-3" />
                        <div className="h-7 w-16 bg-gray-300 rounded-full" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </Card>
            ))}
        </div>
    )

    if (isError) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 text-center text-red-500 bg-red-50 rounded-xl border border-red-100 shadow-sm"
        >
            Error loading dashboard totals. Please try again later.
        </motion.div>
    )

    const items = [
         {
            label: 'Users',
            value: data.usersCount,
            icon: <Users className="h-7 w-7" />,
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50'
        },
        {
            label: 'Categories',
            value: data.categoriesCount,
            icon: <LayoutGrid className="h-7 w-7" />,
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50'
        },
        // {
        //     label: 'Products',
        //     value: data.servicesCount,
        //     icon: <AiFillProduct className="h-7 w-7" />,
        //     color: 'from-purple-500 to-purple-600',
        //     bg: 'bg-purple-50'
        // },
       
        {
            label: 'Blogs',
            value: data.blogsCount,
            icon: <FileText className="h-7 w-7" />,
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50'
        },
    ]

    // console.log(data)

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{
                        y: -5,
                        transition: { duration: 0.2 }
                    }}
                >
                    <div className="h-full rounded-2xl bg-white shadow-md border-0 overflow-hidden group relative">
                        <div className="p-6 flex gap-3">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.bg}`}>
                                <div className={`bg-gradient-to-br ${item.color} p-2 rounded-lg text-white`}>
                                    {item.icon}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">
                                    {item.label}
                                </div>

                                <div className="p-0">
                                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                                </div>
                            </div>
                        </div>

                        {/* Animated gradient bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent group-hover:via-current transition-all duration-500">
                            <div className={`w-full h-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}