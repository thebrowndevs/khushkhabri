'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBanners } from '@/hooks/useBanners';
import ImageSelector from '@/components/ImageSelector';
import Image from 'next/image';
import LoaderButton from '@/components/custom/LoaderButton';

export const AddBannerDialog = ({ open, onOpenChange }) => {
    const [image, setImage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [link, setLink] = useState('');
    const { createBanner } = useBanners();

    const handleSubmit = () => {
        if (!image) return alert('Image URL is required');

        createBanner.mutate(
            { data: { image, link, page: 'home' } },
            {
                onSuccess: () => {
                    setImage('');
                    setLink('');
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Add Banner (16:9)</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Image URL */}
                    {!image
                        && <div
                            className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer h-48 mb-4 sm:mb-0"
                            onClick={() => { setIsDialogOpen(true) }}
                        >
                            <span className="text-gray-500">Click to select banner</span>
                        </div>
                    }
                    {image
                        && <div className="border rounded-xl">
                            <Image
                                height={1000}
                                width={1000}
                                quality={100}
                                src={image}
                                alt={image}
                                className="w-full h-96 object-cover object-top"
                            />
                        </div>
                    }
                    {image &&
                        <Button
                            type='button'
                            onClick={() => { setIsDialogOpen(true) }}
                        >
                            Change Image
                        </Button>
                    }

                    <Input
                        placeholder="Link (optional)"
                        value={link}
                        className={'mt-3'}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <LoaderButton
                        loading={createBanner.isPending}
                        onClick={handleSubmit} className="w-full">
                        Submit
                    </LoaderButton>
                </div>

                <ImageSelector
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    setImage={setImage}
                />
            </DialogContent>
        </Dialog>
    );
};
