'use client'

import React, { useState } from 'react'
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import Loader from '@/components/Loader'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog '
import Link from 'next/link'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import TableSkeleton from '@/components/custom/TableSkeleton'
import { useBlogs } from '@/hooks/useBlogs'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function BlogsTable({
    isLoading,
    error,
    blogs = [],
    page,
    pageCount,
    onPageChange,
    onDelete,
    isDeleting,
    deleteError,
    canDelete,
    canEdit,
    onlyAdmin,
    updateBlog
}) {
    const [deletingBlogId, setDeletingBlogId] = useState(null)

    const handleDeleteClick = (userId) => {
        setDeletingBlogId(userId)
    }
    const handleDeleteConfirm = async () => {
        await onDelete(deletingBlogId)
        setDeletingBlogId(null)
    }

    if (isLoading)
        return (
            <TableSkeleton
                rows={5}
                columns={4}
                showHeader={false}
                showPagination={true}
            />
        )

    if (error)
        return (
            <div className="text-red-600 p-4">
                Error: {error.message || error}
            </div>
        )

    if (blogs.length === 0)
        return (
            <div className="text-center text-gray-500 p-4">
                No blogs found!
            </div>
        )

    return (
        <section className="space-y-4">
            {/* Data Table */}
            <div className="overflow-hidden rounded-md border border-gray-200">
                <Table className={'bg-white'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={'text-center'}>#</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Publish Date</TableHead>
                            <TableHead>Status</TableHead>
                            {/* <TableHead>Featured</TableHead> */}
                            <TableHead className={'text-center'}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.map((item, idx) => (
                            <TableRow key={item._id}>
                                <TableCell className={'text-center'}>{(page - 1) * blogs.length + idx + 1}</TableCell>
                                <TableCell>
                                    <Image
                                        src={item.imageURL}
                                        height={80}
                                        width={50}
                                        alt={'image'}
                                        className='rounded-sm w-auto'
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className={'max-w-96 text-wrap'}>
                                        {item.title}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div>{format(new Date(item.createdAt), 'dd MMM yyyy')}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {format(new Date(item.createdAt), 'hh:mm a')}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={item.status}
                                        onCheckedChange={(val) => {
                                            const toastId = toast.loading('Updating...')
                                            try {
                                                const data = {
                                                    status: val
                                                }
                                                updateBlog.mutateAsync({ id: item._id, data })
                                            } catch (error) {

                                            } finally {
                                                toast.dismiss(toastId)
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell className={'text-center space-x-2'}>
                                    {canEdit &&
                                        <Link href={`/admin/blogs/edit/${item._id}`}>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                        </Link>
                                    }
                                    {canDelete &&
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDeleteClick(item._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash />
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {pageCount}
                </p>
                <div className="space-x-2">
                    <Button
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        disabled={page >= pageCount}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation */}
            <DeleteConfirmationDialog
                isOpen={!!deletingBlogId}
                onOpenChange={(open) => !open && setDeletingBlogId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Blog"
                description="Are you sure you want to delete this Blog?"
            />
        </section>
    )
}
