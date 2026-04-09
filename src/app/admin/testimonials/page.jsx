"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { useTestimonials } from '@/hooks/useTestimonials'
import React, { useState } from 'react'
import TestimonialDialog from './components/TestimonialDialog'
import { CirclePlus } from 'lucide-react'
import TestimonialsListView from './components/TestimonialsListView'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import NotAuthorizedPage from '@/components/notAuthorized'

function page() {
    const [isVisible, setIsVisible] = useState('all')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        testimonialsQuery,
        createTestimonial,
        updateTestimonial,
        patchTestimonial,
        deleteTestimonial,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        } } = useTestimonials({ isVisible, page, pageSize })

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState();
    const [image, setImage] = useState(null)

    // open dialog to add new tag
    const handleAddClick = () => {
        createTestimonial.reset();
        updateTestimonial.reset();
        deleteTestimonial.reset();
        setImage(null)
        setSelectedTestimonial(undefined);
        setIsDialogOpen(true);
    };

    // open dialog to edit
    const handleEditClick = (testimonial) => {
        createTestimonial.reset();
        updateTestimonial.reset();
        deleteTestimonial.reset();
        setImage(testimonial.imageURL)
        setSelectedTestimonial(testimonial);
        setIsDialogOpen(true);
    };

    if (!testimonialsQuery.isLoading && !canView) {
        return <NotAuthorizedPage />
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Testimonials</h1>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4">
                <div className='space-x-3 flex'>
                    <Button variant="outline">
                        Testimonials: {testimonialsQuery.data?.data?.length || 0}
                    </Button>

                    <Select value={isVisible} onValueChange={(value) => { setIsVisible(value); setPage(1); }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Featured" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="isVisible">Visible</SelectItem>
                            <SelectItem value="not-visible">Not Visible</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                {canAdd &&
                    <Button onClick={handleAddClick}>
                        <CirclePlus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                }
            </div>

            <TestimonialsListView
                testimonials={testimonialsQuery?.data?.data}
                onEdit={handleEditClick}
                isLoading={testimonialsQuery.isLoading}
                error={testimonialsQuery.error}
                onDelete={deleteTestimonial.mutateAsync}
                isDeleting={deleteTestimonial.isPending}
                deleteError={deleteTestimonial.error}
                canEdit={canEdit}
                canDelete={canDelete}
            />

            <TestimonialDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedTestimonial={selectedTestimonial}
                onCreate={createTestimonial.mutateAsync}
                onUpdate={updateTestimonial.mutateAsync}
                isSubmitting={createTestimonial.isPending || updateTestimonial.isPending}
                error={createTestimonial.error?.message || updateTestimonial.error?.message}
                image={image}
                setImage={setImage}
            />
        </InnerDashboardLayout>
    )
}

export default page