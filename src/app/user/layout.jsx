"use client"
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import LayoutDashboard from '@/components/dashboard/LayoutDashboard'
import { USER_SIDEBAR_LINKS } from '@/lib/constants/sidebarLinks'
import WhatsAppWidget from '@/components/WhatsAppWidget'

function layout({ children }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute cache
                retry: false // Auto-retry disable
            }
        }
    }))
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <LayoutDashboard sidebarLinks={USER_SIDEBAR_LINKS}>
                    {children}
                    <WhatsAppWidget />
                </LayoutDashboard>
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
                <Toaster position="top-right" />
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default layout