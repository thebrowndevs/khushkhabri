'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import LoaderButton from '@/components/custom/LoaderButton';
import { useOrders } from '@/hooks/useOrders';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const statusOptions = ["pending", "paid"];

// ✅ Zod Schema
const paymentSchema = z.object({
    paymentStatus: z.enum(["pending", "paid"]),
    paymentDate: z.string().min(1, "Payment date is required"),
    message: z.string().optional()
});


function UpdatePaymentStatus({ open, onOpenChange, order }) {
    const { updatePaymentStatus } = useOrders({ status: 'all', page: 1, pageSize: 10 });

    const localISOTime = () => {
        const now = new Date();
        const tzOffsetMs = now.getTimezoneOffset() * 60000;
        const localISO = new Date(now.getTime() - tzOffsetMs).toISOString().slice(0, 16);
        return localISO;
    };

    const form = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            paymentStatus: '',
            paymentDate: localISOTime(),
            message: ''
        }
    });


    async function onSubmit(data) {
        const update = {
            paymentStatus: data.paymentStatus,
            paymentDate: data.paymentDate,
            paymentMessage: data.message || ''
        };

        try {
            await updatePaymentStatus.mutateAsync({ id: order._id, data: { ...update } });
            onOpenChange(false);
        } catch (error) {
            console.error("Payment update failed:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white rounded-xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Update Payment Details</DialogTitle>
                </DialogHeader>

                <div className="py-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Payment Status */}
                            <FormField
                                control={form.control}
                                name="paymentStatus"
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

                            {/* Payment Date */}
                            <FormField
                                control={form.control}
                                name="paymentDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
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
                                            <Textarea placeholder="Enter payment note (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <LoaderButton
                                loading={updatePaymentStatus.isPending}
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

export default UpdatePaymentStatus;
