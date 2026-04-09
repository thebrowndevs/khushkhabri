"use client";
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog ";
import Loader from '@/components/Loader';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function TestimonialsListView({ isLoading, error, testimonials, onEdit, onDelete, isDeleting, deleteError, canEdit, canDelete }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeletingId(id);
    };

    const handleDeleteConfirm = async () => {
        await onDelete(deletingId);
        setDeletingId(null);
    };

    if (isLoading) return <div className="text-center p-4">
        <Loader />
    </div>;

    if (error) return <div className="text-red-600 p-4">Error: {error.message}</div>;
    if (!testimonials?.length) return <div className="text-center text-gray-500 p-4">No testimonials Found!</div>;

    return (
        <section className="w-full">
            <div className="overflow-x-auto rounded-md">
                {/* grid of testimonials */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-xl shadow-lg flex flex-col justify-between"
                    >
                        <Badge
                            className={`text-white absolute top-3 left-3 z-[1] px-2 py-1 rounded-full text-xs font-semibold ${testimonial.isVisible ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        >
                            {testimonial.isVisible ? 'Visible' : 'Hidden'}
                        </Badge>

                        <div className=''>
                            <div className="w-full max-h-72 relative aspect-[16/13]">
                                <Image
                                    src={testimonial.imageURL}
                                    alt={`testimony`}
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>

                            <div className="mt-4 px-4">
                                <h3 className="text-lg font-semibold">{testimonial.userName}</h3>
                                <p className="text-sm text-gray-500">{testimonial?.designation}</p>

                                <h2 className='font-semibold mt-4'>{testimonial.company}</h2>
                                <p className="mt-1 text-gray-700">
                                    “{testimonial.message}”
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-5 w-full p-6">
                            {canEdit &&
                                <Button
                                    variant="outline"
                                    onClick={() => onEdit(testimonial)}
                                >
                                    <Pencil size={16} /> Edit
                                </Button>
                            }

                            {canDelete &&
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteClick(testimonial._id)}
                                >
                                    <Trash size={16} /> Delete
                                </Button>
                            }
                        </div>

                    </div>
                ))}
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deletingId}
                onOpenChange={(open) => !open && setDeletingId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Testimonial"
                description="Are you sure you want to delete this Testimonial?"
            />

        </section>
    );
}




{/* <td className="px-6 py-3 border-b align-middle">
                                    
                                </td> */}