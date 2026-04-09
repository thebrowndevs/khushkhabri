"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useImages } from '@/hooks/useImages';
import Image from 'next/image';
import { ImagesIcon, CirclePlus, RefreshCw } from 'lucide-react'; // Import RefreshCw icon
import UploaderDialog from '@/app/admin/media/components/UploaderDialog';
import Loader from './Loader';

function ImageSelector({ open, onOpenChange, setImage }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { imagesQuery } = useImages();
    const images = imagesQuery.data || [];
    const [selectedId, setSelectedId] = useState(null);

    // Add refresh handler
    const handleRefresh = async () => {
        await imagesQuery.refetch();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1200px] h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle>Select an Image</DialogTitle>
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={imagesQuery.isRefetching}
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${imagesQuery.isRefetching ? 'animate-spin' : ''}`}
                            />
                            Refresh
                        </Button>
                    </div>
                </DialogHeader>

                <div className='flex flex-wrap gap-3 max-h-[90vh] overflow-y-auto pt-4'>
                    {imagesQuery.isRefetching ? (
                        <div className="w-full flex justify-center py-8">
                            <Loader />
                        </div>
                    ) : images.length === 0 ? (
                        <div className="w-full text-center py-8 text-gray-500">
                            No images found
                        </div>
                    ) : (
                        images.map(img => (
                            <div
                                key={img.public_id}
                                className={`border-2 rounded-lg overflow-hidden shadow-sm cursor-pointer relative ${selectedId === img.public_id
                                    ? 'border-purple-600'
                                    : 'border-transparent hover:border-purple-400'
                                    }`}
                                onClick={() => setSelectedId(img.public_id)}
                            >
                                <Image
                                    height={100}
                                    width={100}
                                    quality={100}
                                    src={img.url}
                                    alt={img.public_id}
                                    className="w-full h-44 object-contain"
                                />
                            </div>
                        ))
                    )}
                </div>

                <UploaderDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onUploadSuccess={handleRefresh} // Refresh after upload
                />

                <DialogFooter className="mt-1 gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <CirclePlus className="mr-1 h-4 w-4" /> Upload New
                    </Button>

                    <Button
                        onClick={() => {
                            const selectedImage = images.find(img => img.public_id === selectedId);
                            if (selectedImage) {
                                setImage(selectedImage.url)
                                onOpenChange(false);
                            }
                        }}
                        disabled={!selectedId}
                    >
                        <ImagesIcon className="mr-2" size={18} />Select Image
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ImageSelector;