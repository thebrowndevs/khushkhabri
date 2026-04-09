'use client';
import { useTags } from '@/hooks/useTags';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import TagsListView from './components/TagsListView';
import TagDialog from './components/TagDialog';
import { useState } from 'react';
import NotAuthorizedPage from '@/components/notAuthorized';

export default function Page() {
    // fetch tags query
    const { tagsQuery, createTag, updateTag, deleteTag, permissions: {
        canView,
        canAdd,
        canEdit,
        canDelete,
    } } = useTags();

    // destructure createTag mutation
    const {
        mutateAsync: createTagAsync,
        isPending: isCreating,
        error: createError,
        reset: resetCreate,
    } = createTag;

    // destructure updateTag mutation
    const {
        mutateAsync: updateTagAsync,
        isPending: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = updateTag;

    // destructure deleteTag mutation
    const {
        mutateAsync: deleteTagAsync,
        isPending: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = deleteTag;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState();

    // open dialog to add new tag
    const handleAddClick = () => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedTag(undefined);
        setIsDialogOpen(true);
    };

    // open dialog to edit
    const handleEditClick = (tag) => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedTag(tag);
        setIsDialogOpen(true);
    };

    if (!canView) return <NotAuthorizedPage />

    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-3">Tags</h1>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant="outline">
                        Tags: {tagsQuery.data?.length || 0}
                    </Button>
                    {canAdd &&
                        <Button onClick={handleAddClick}>
                            <CirclePlus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    }
                </div>

                <TagsListView
                    tags={tagsQuery.data}
                    onEdit={handleEditClick}
                    onDelete={deleteTagAsync}
                    isLoading={tagsQuery.isLoading}
                    error={tagsQuery.error}
                    isDeleting={isDeleting}
                    deleteError={deleteError}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />

                <TagDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    selectedTag={selectedTag}
                    onCreate={createTagAsync}
                    onUpdate={updateTagAsync}
                    isSubmitting={isCreating || isUpdating}
                    error={createError?.message || updateError?.message}
                />
            </div>
        </InnerDashboardLayout>
    );
}