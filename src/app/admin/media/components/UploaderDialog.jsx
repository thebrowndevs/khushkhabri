'use client';

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useImages } from '@/hooks/useImages';
import { convertToBase64 } from '@/lib/services/convertToBase64';
import { FolderUp, Loader2 } from 'lucide-react';

export default function UploaderDialog({ open, onOpenChange, onUploadSuccess }) {

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const inputRef = useRef();

    const { uploadImage, imagesQuery } = useImages();
    const {
        mutateAsync: uploadImageAsync,
        isPending: isUploading,
        error: uploadError,
    } = uploadImage;

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => file.size <= 2048 * 1024);

        if (validFiles.length !== selectedFiles.length) {
            alert('Some files exceed 2048KB (2MB) and were skipped.');
        }

        setFiles(validFiles);
        const previewUrls = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);
    };

    const triggerFileSelect = () => {
        if (inputRef.current) inputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files.length) return alert("Please select images first.");

        try {
            const base64Images = await Promise.all(
                files.map(file => convertToBase64(file))
            );

            const results = await Promise.all(
                base64Images.map(base64 =>
                    uploadImageAsync({ image: base64 })
                )
            );

            const uploadedUrls = results.map(res => res.imageURL);
            if (onUploadSuccess) onUploadSuccess(uploadedUrls);

            // Reset states
            setFiles([]);
            setPreviews([]);
            imagesQuery.refetch();
            onOpenChange(false);

        } catch (err) {
            console.error(err);
            alert("Failed to upload images.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:min-w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Upload Images</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="flex flex-col sm:flex-row sm:space-x-6">
                        {/* Left: upload area */}
                        <div
                            className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer h-96 mb-4 sm:mb-0 overflow-x-auto"
                            onClick={triggerFileSelect}
                        >
                            {previews.length > 0 ? (
                                <div className="flex gap-2 overflow-x-auto max-h-full p-2">
                                    {previews.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Preview ${index}`}
                                            className="h-64 w-auto object-contain rounded"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500">Click to select image(s)</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={handleFileChange}
                                multiple
                            />
                        </div>

                        {/* Right: metadata */}
                        <div className="flex-1">
                            <Label className="font-semibold mb-2 block">File Details</Label>
                            {files.length > 0 ? (
                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2 max-h-96 overflow-y-auto">
                                    {files.map((file, i) => (
                                        <div key={i} className="border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0">
                                            <p className="text-sm font-medium text-gray-800">📁 {file.name}</p>
                                            <p className="text-xs text-gray-600">Size: {Math.round(file.size / 1024)} KB</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="italic text-gray-500">No files selected</p>
                            )}
                        </div>
                    </div>

                    {uploadError && (
                        <p className="text-red-600 mb-5 text-sm">Error: {uploadError}</p>
                    )}

                    <DialogFooter className="mt-6">
                        <Button type="submit" disabled={isUploading}>
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <FolderUp className="mr-2 h-4 w-4" />
                                    Upload
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
