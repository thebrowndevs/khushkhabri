// app/admin/categories/components/CategoriesListView.jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash } from 'lucide-react';
// import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog ';
import Loader from '@/components/Loader';
import Image from 'next/image';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import TableSkeleton from '@/components/custom/TableSkeleton';

export default function CategoriesListView({
    isLoading,
    error,
    categories,
    onEdit,
    onDelete,
    isDeleting,
    deleteError,
    canEdit,
    canDelete,
}) {
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);

    const handleDeleteClick = (categoryId) => {
        setDeletingCategoryId(categoryId);
    };

    const handleDeleteConfirm = async () => {
        await onDelete(deletingCategoryId);
        setDeletingCategoryId(null);
    };

    if (isLoading)
        return (
            <div className="text-center p-4">
                <TableSkeleton
                    rows={5}
                    columns={4}
                    showHeader={false}
                    showPagination={true}
                />
            </div>
        );

    if (error)
        return (
            <div className="text-red-600 p-4">
                Error: {error.message}
            </div>
        );

    if (!categories?.length)
        return (
            <div className="text-center text-gray-500 p-4">
                No categories Found!
            </div>
        );

    return (
        <section className="w-full">
            <div className="overflow-x-auto rounded-md border border-gray-200">
                <Table className="w-full border-collapse">
                    <TableHeader>
                        <TableRow className="bg-gray-50 text-xl border-b text-primary">
                            <TableHead className="px-6 py-3 text-center font-semibold align-middle">
                                #
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center font-semibold align-middle">
                                Image
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center font-semibold align-middle">
                                Name
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center font-semibold align-middle">
                                Slug
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center font-semibold align-middle">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((item, index) => (
                            <TableRow
                                key={item._id || index}
                                className=" transition"
                            >
                                <TableCell className="px-6 py-3 border-b text-center align-middle">
                                    {index + 1}
                                </TableCell>

                                <TableCell className="px-6 py-3 border-b align-middle">
                                    <div className="flex items-center justify-center min-h-20 py-1">
                                        <Image
                                            height={80}
                                            width={80}
                                            quality={100}
                                            src={item.imageURL}
                                            alt={item.name}
                                            className="object-contain rounded-md"
                                        />
                                    </div>
                                </TableCell>

                                <TableCell className="px-6 py-3 border-b text-center align-middle">
                                    {item.name}
                                </TableCell>

                                <TableCell className="px-6 py-3 border-b text-center align-middle">
                                    {item.slug}
                                </TableCell>

                                <TableCell className="px-6 py-3 border-b align-middle">
                                    <div className="flex items-center justify-center gap-2">
                                        {canEdit && (
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => onEdit(item)}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                        )}
                                        {canDelete && (
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDeleteClick(item._id)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deletingCategoryId}
                onOpenChange={(open) => !open && setDeletingCategoryId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Category"
                description="Are you sure you want to delete this category?"
            />
        </section>
    );
}
