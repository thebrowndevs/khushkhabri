'use client';

import React, { useState } from 'react';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { useBanners } from '@/hooks/useBanners';
import Link from 'next/link';
import { AddBannerDialog } from './components/AddBannerDialog';

function BannersPage() {
    const { bannersQuery, deleteBanner, permissions } = useBanners();
    const [openDialog, setOpenDialog] = useState(false);

    // console.log(bannersQuery.data)

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            deleteBanner.mutate(id);
        }
    };

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Banners</h1>
                {permissions.canAdd && (
                    <Button onClick={() => setOpenDialog(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Banner
                    </Button>
                )}
            </div>

            <AddBannerDialog open={openDialog} onOpenChange={setOpenDialog} />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bannersQuery.data?.length > 0 ? (
                    bannersQuery.data.map((banner) => (
                        <div
                            key={banner._id}
                            className="border rounded-sm overflow-hidden shadow-sm relative"
                        >
                            <img
                                src={banner.image}
                                alt="Banner"
                                className="w-full h-72 object-cover object-top"
                            />
                            {banner.link && (
                                <Link
                                    href={banner.link}
                                    className="block text-blue-600 text-sm p-2 underline"
                                >
                                    {banner.link}
                                </Link>
                            )}
                            {permissions.canDelete && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(banner._id)}
                                    className="absolute top-2 right-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground">No banners found.</p>
                )}
            </div>
        </InnerDashboardLayout>
    );
}

export default BannersPage;
