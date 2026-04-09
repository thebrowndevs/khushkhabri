import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Loader2 } from 'lucide-react';

export default function TagDialog({ open, onOpenChange, selectedTag, onCreate, onUpdate, isSubmitting, error, }) {

    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()

    useEffect(() => {
        if (open) {
            if (selectedTag) {
                reset({
                    name: selectedTag.name,
                    slug: selectedTag.slug
                });
            } else {
                reset({
                    name: '',
                    slug: ''
                });
            }
        }
    }, [open, selectedTag, reset]);

    const watchName = watch("name");

    useEffect(() => {
        const generatedSlug = watchName
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setValue('slug', generatedSlug);
    }, [watchName, setValue, selectedTag]);


    const onSubmit = async (data) => {
        try {
            if (selectedTag?._id) {
                await onUpdate({ id: selectedTag._id, data });
                onOpenChange(false);
            } else {
                await onCreate(data);
                onOpenChange(false);
            }
        } catch (error) {
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {selectedTag ? "Edit Tag" : "Add Tag"}
                    </DialogTitle>
                    <DialogDescription>
                        Good tags help in SEO and interlinking of your website.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="name" className="text-right mt-2">
                                Name<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    className={clsx("w-full", {
                                        "border-red-500": errors.name,
                                    })}
                                    placeholder="Almond Oil"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="slug" className="text-right mt-2">
                                Slug<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="slug"
                                    disabled
                                    {...register("slug", {
                                        required: "Slug is required",
                                        validate: value =>
                                            !/\s/.test(value) || "Slug cannot contain spaces",
                                    })}
                                    className={clsx("w-full", { "border-red-500": errors.slug })}
                                    placeholder="almond-oil"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.slug.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-600 mb-5 text-sm">Error: {error}</p>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                            {selectedTag ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
