"use client";

import {
    FileText,
    CalendarClock,
    CheckCircle,
    CreditCard
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function OrderDetailsDialog({ open, onOpenChange, order }) {
    if (!order) return null;

    const formatDate = (date) =>
        format(new Date(date), "dd MMM yyyy, hh:mm a");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] w-full p-0 bg-white rounded-xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white p-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                            <FileText size={18} />
                            Order Details
                        </DialogTitle>
                        <p className="text-xs text-gray-300 mt-1">
                            {order?.orderId}
                        </p>
                    </DialogHeader>
                </div>

                {/* BODY */}
                <div className="p-5 space-y-5">

                    {/* TEMPLATE INFO */}
                    <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            🎨 Template Info
                        </h3>

                        <div className="flex justify-between text-sm">
                            <span>Theme Name</span>
                            <span className="font-medium">
                                {order.themeName}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm mt-2">
                            <span>Total Amount</span>
                            <span className="font-semibold">
                                ₹{order.totalAmount?.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* PAYMENT */}
                    <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <CreditCard size={16} />
                            Payment Info
                        </h3>

                        <div className="flex flex-wrap gap-2 text-xs mb-2">
                            <Badge className="bg-green-100 text-green-700">
                                {order.status}
                            </Badge>
                        </div>

                        <div className="text-sm space-y-1">
                            <p>Payment ID: {order.paymentId}</p>
                            <p>Razorpay Order: {order.razorpayOrderId}</p>
                        </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <CalendarClock size={16} />
                            Timeline
                        </h3>

                        <div className="text-sm space-y-2">
                            <div>
                                <p className="text-gray-500">Created</p>
                                <p className="font-medium">
                                    {formatDate(order.createdAt)}
                                </p>
                            </div>

                            {order.paymentDate && (
                                <div>
                                    <p className="text-gray-500">Paid At</p>
                                    <p className="font-medium">
                                        {formatDate(order.paymentDate)}
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-gray-500">Last Updated</p>
                                <p className="font-medium">
                                    {formatDate(order.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}
