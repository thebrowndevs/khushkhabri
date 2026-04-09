import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Loader2 } from 'lucide-react';
import ImageSelector from "@/components/ImageSelector";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function TestimonialDialog({
    open,
    onOpenChange,
    selectedTestimonial,
    onCreate,
    onUpdate,
    isSubmitting,
    error,
    image,
    setImage
}) {

    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            if (selectedTestimonial) {
                reset({
                    userName: selectedTestimonial.userName,
                    designation: selectedTestimonial.designation,
                    company: selectedTestimonial.company,
                    message: selectedTestimonial.message,
                    isVisible: selectedTestimonial.isVisible,
                });
            } else {
                reset({});
            }
        }
    }, [open, selectedTestimonial, reset]);

    const onSubmit = async (data) => {
        try {
            if (selectedTestimonial?._id) {
                await onUpdate({
                    id: selectedTestimonial._id,
                    data: {
                        ...data,
                        imageURL: image
                    }
                });
            } else {
                await onCreate({
                    data: {
                        ...data,
                        imageURL: image
                    }
                });
            }

            onOpenChange(false);
            setImage(null)

        } catch (error) {}
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">

                <DialogHeader>
                    <DialogTitle>
                        {selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                    </DialogTitle>
                    <DialogDescription>
                        Add review to your website.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <p className="text-xs bg-gray-100 rounded-full px-2 border py-1 w-fit">
                        Image aspect ratio: 9/16
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 py-4">

                        {/* LEFT - IMAGE */}
                        <div className="flex flex-col gap-4 md:sticky md:top-4 h-fit">

                            {!image && (
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer aspect-[9/16] w-full"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    <span className="text-gray-500 text-sm text-center px-4">
                                        Click to select image
                                    </span>
                                </div>
                            )}

                            {image && (
                                <div className="w-full aspect-[9/16] border rounded-xl overflow-hidden">
                                    <Image
                                        height={1000}
                                        width={1000}
                                        quality={100}
                                        src={image}
                                        alt={image}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {image && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Change Image
                                </Button>
                            )}

                        </div>

                        {/* RIGHT - FORM */}
                        <div className="flex flex-col gap-4">

                            {/* Username */}
                            <div>
                                <Label>User Name *</Label>
                                <Input
                                    {...register("userName", {
                                        required: "User Name is required",
                                    })}
                                    className={clsx({
                                        "border-red-500": errors.userName,
                                    })}
                                    placeholder="Rajat Patidar"
                                />
                                {errors.userName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.userName.message}
                                    </p>
                                )}
                            </div>

                            {/* Place */}
                            <div>
                                <Label>Place *</Label>
                                <Input
                                    {...register("designation", {
                                        required: "Place is required.",
                                    })}
                                    placeholder="Rohtak, Haryana"
                                />
                                {errors.designation && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.designation.message}
                                    </p>
                                )}
                            </div>

                            {/* Heading */}
                            <div>
                                <Label>Heading *</Label>
                                <Input
                                    {...register("company", {
                                        required: "Heading is required.",
                                    })}
                                    placeholder="Excellent Quality"
                                />
                                {errors.company && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.company.message}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <Label>Message *</Label>
                                <Textarea
                                    {...register("message", {
                                        required: "Message is required",
                                    })}
                                    placeholder="Write the review message here."
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Visible */}
                            <div className="flex items-center gap-2 pt-2">
                                <Switch
                                    checked={watch("isVisible")}
                                    onCheckedChange={(val) => setValue("isVisible", val)}
                                />
                                <Label>Visible</Label>
                            </div>

                        </div>

                    </div>

                    {error && (
                        <p className="text-red-600 mb-5 text-sm">
                            Error: {error}
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                            {selectedTestimonial ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>

            <ImageSelector
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                setImage={setImage}
            />
        </Dialog>
    )
}

