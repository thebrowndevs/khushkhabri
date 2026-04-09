'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import LoaderButton from '@/components/custom/LoaderButton';

const statusOptions = [
    "New",
    "Processing",
    "Packed",
    "Shipped",
    "Ready for delivery",
    "Delivered",
    "cancelled",
];

function UpdateStatusDialog({ open, onOpenChange, order, updateOrder }) {
    const form = useForm({
        defaultValues: {
            currentStatus: '',
            message: ''
        }
    });

    async function onSubmit(data) {
        console.log({
            orderId: order._id,
            update: {
                currentStatus: data.currentStatus,
                message: data.message
            }
        });

        const update = {
            currentStatus: data.currentStatus,
            message: data.message
        }

        try {
            await updateOrder.mutateAsync({ id: order._id, status: update })
            onOpenChange(false)
        } catch (error) {

        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white rounded-xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Update Order Status</DialogTitle>
                </DialogHeader>

                <div className="py-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Status Select */}
                            <FormField
                                control={form.control}
                                name="currentStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className={'w-full'}>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statusOptions.map(status => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Message Textarea */}
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter status note (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <LoaderButton
                                loading={updateOrder.isPending}
                                type="submit"
                                className="w-full">
                                Submit
                            </LoaderButton>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateStatusDialog;
