'use client';

import dynamic from 'next/dynamic';
const RTEField = dynamic(
    () => import('./RTEField'),
    {
        ssr: false,
        loading: () => <p className="py-10 text-center text-gray-500">Loading editor...</p>
    }
);

import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import LoaderButton from '@/components/custom/LoaderButton';

function TermsForm({ open, onOpenChange, data, onUpdate, loading, error, onCreate }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm();

    useEffect(() => {
        if (data) {
            // format the ISO string into yyyy-MM-dd for <input type="date" />
            const formattedDate = data.lastUpdated?.split('T')[0] || ''
            reset({
                lastUpdated: formattedDate,
                content: data.content,
            })
        }
    }, [data, reset])

    async function onSubmit(values) {
        try {
            if (data) {
                await onUpdate({ id: data._id, data: values })
            } else {
                await onCreate(values)
            }
            onOpenChange(false);
        } catch (error) {
            console.error(error)
        }

    }

    if (error) {
        console.error(error)
    }

    // console.log(data)
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:min-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Terms and Conditions</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="lastUpdated" className={' mb-2'}>Last Updated *</Label>
                        <Input
                            id="lastUpdated"
                            type="date"
                            {...register('lastUpdated', { required: 'This field is required' })}
                        />
                        {errors.lastUpdated && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastUpdated.message}</p>
                        )}
                    </div>

                    <RTEField
                        setValue={setValue}
                        content={data?.content}
                    />

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        <LoaderButton
                            loading={loading}
                            type='submit'
                        >
                            Save Changes
                        </LoaderButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TermsForm