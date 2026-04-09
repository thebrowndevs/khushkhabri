"use client"

import React, { useState } from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import Link from 'next/link'
import BlogsTable from './components/BlogsTable'
import { useBlogs } from '@/hooks/useBlogs';
import NotAuthorizedPage from '@/components/notAuthorized'

function Page() {
    // filters
    const [status, setStatus] = useState('all');
    const [featured, setFeatured] = useState('all');

    // pagination
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // fetch blogs with filters
    const {
        blogsQuery,
        deleteBlog,
        updateBlog,
        permissions: { canView, canAdd, canEdit, canDelete, onlyAdmin }
    } = useBlogs({ status, featured, page, pageSize })

    if (!blogsQuery.isPending && !canView) {
        return <NotAuthorizedPage />
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Blogs</h1>

            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Status Select */}
                <div className="flex items-center  space-x-2">
                    <div>
                        <Select value={status} onValueChange={(value) => { setStatus(value); setPage(1); }}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Featured Select */}
                    {/* <div className="flex items-center space-x-2">
                        <Select value={featured} onValueChange={(value) => { setFeatured(value); setPage(1); }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Featured" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="not-featured">Not Featured</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}

                    {/* Page size selector */}
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(v) => {
                            setPageSize(+v)
                            setPage(1)
                        }}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Rows" />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 5, 10, 25, 50, 100].map((n) => (
                                <SelectItem key={n} value={n.toString()}>
                                    {n} / page
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {canAdd && (
                    <Link href={'/admin/blogs/create'}>
                        <Button>
                            <CirclePlus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </Link>
                )}
            </div>

            {/* Blogs table */}
            {canView &&
                <BlogsTable
                    canDelete={canDelete}
                    isDeleting={deleteBlog.isPending}
                    deleteError={deleteBlog.error}
                    canEdit={canEdit}
                    error={blogsQuery.error}
                    isLoading={blogsQuery.isPending}
                    onDelete={deleteBlog.mutateAsync}
                    onPageChange={setPage}
                    onlyAdmin={onlyAdmin}
                    page={page}
                    blogs={blogsQuery.data?.data || []}
                    updateBlog={updateBlog}
                    pageCount={Math.ceil((blogsQuery.data?.totalCount || 0) / pageSize)}
                />
            }
        </InnerDashboardLayout>
    )
}

export default Page
