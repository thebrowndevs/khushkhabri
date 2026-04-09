"use client";
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog ";
import Loader from '@/components/Loader';
import TableSkeleton from '@/components/custom/TableSkeleton';

export default function TagsListView({ isLoading, error, tags, onEdit, onDelete, isDeleting, deleteError, canEdit, canDelete }) {
    const [deletingTagId, setDeletingTagId] = useState(null);

    const handleDeleteClick = (tagId) => {
        setDeletingTagId(tagId);
    };

    const handleDeleteConfirm = async () => {
        await onDelete(deletingTagId);
        setDeletingTagId(null);
    };

    if (isLoading) return
    <TableSkeleton
        rows={5}
        columns={4}
        showHeader={false}
        showPagination={true}
    />;

    if (error) return <div className="text-red-600 p-4">Error: {error.message}</div>;
    if (!tags?.length) return <div className="text-center text-gray-500 p-4">No Tags Found!</div>;

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-md border border-gray-200">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-50 text-xl border-b text-primary">
                            <th className="px-6 py-3 text-center font-semibold">S. No.</th>
                            <th className="px-6 py-3 text-center font-semibold">Name</th>
                            <th className="px-6 py-3 text-center font-semibold">Slug</th>
                            <th className="px-6 py-3 text-center font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tags?.map((item, key) => (
                            <tr key={key} className="even:bg-gray-50 hover:bg-gray-100 transition text-center">
                                <td className="px-6 py-3 border-b">{key + 1}</td>
                                <td className="px-6 py-3 border-b">{item?.name}</td>
                                <td className="px-6 py-3 border-b">{item?.slug}</td>
                                <td className="px-6 py-3 border-b text-center flex gap-2 items-center justify-center">
                                    {canEdit &&
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className='cursor-pointer'
                                            onClick={() => { onEdit(item) }}
                                        >
                                            <Pencil size={16} />
                                        </Button>
                                    }
                                    {canDelete &&
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDeleteClick(item._id)}
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deletingTagId}
                onOpenChange={(open) => !open && setDeletingTagId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Tag"
                description="Are you sure you want to delete this tag?"
            />
        </section>
    );
}
