import React from 'react'
import { getHomePageData } from '@/lib/main/getHomePageData';
import WebsiteLayout from './WebsiteLayout';

export default async function Outer({ children }) {
    const { services, categories } = await getHomePageData();
    return (
        <div>
            <WebsiteLayout services={services} categories={categories}>
                {children}
            </WebsiteLayout>
        </div>
    )
}
