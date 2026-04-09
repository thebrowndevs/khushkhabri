'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Package, Clock, CreditCard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OrderAccordion({ order }) {
    const [open, setOpen] = useState(false)

    // derive current status
    const latestStatus = order.status || 'created'

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex gap-4 justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="text-left flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-1">
                        <p className="font-bold text-gray-900 text-lg">Order #{order?.orderId}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
              ${latestStatus === 'paid' ? 'bg-green-100 text-green-700' : 
                latestStatus === 'created' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}
                        >
                            {latestStatus.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {format(new Date(order.createdAt), 'MMM d, yyyy')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Package size={14} />
                            Theme: {order.themeName}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Total</p>
                        <p className="font-bold text-gray-900">₹{order.totalAmount}</p>
                    </div>
                    <div className={`p-2 rounded-full ${open ? 'bg-gray-100' : 'bg-transparent'} transition-colors`}>
                        {open ? <ChevronUp size={20} className="text-gray-600" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                </div>
            </button>

            {/* Animated Expanded content */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-gray-50/50"
                    >
                        <div className="p-6 border-t border-gray-100 space-y-6">
                            {/* Order Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                                        Configuration Info
                                    </h4>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500">Theme Name</span>
                                            <span className="font-semibold text-gray-900">{order.themeName}</span>
                                        </div>
                                        {/* <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500">Base Value</span>
                                            <span className="font-semibold text-gray-900">₹{order.orderValue}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500">Discount</span>
                                            <span className="font-semibold text-green-600">- ₹{order.discount || 0}</span>
                                        </div> */}
                                        <div className="flex justify-between items-center py-2 pt-3">
                                            <span className="text-gray-900 font-bold">Total Amount</span>
                                            <span className="text-lg font-bold text-[#00441e]">₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                                        Payment Status
                                    </h4>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${order.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                                <CreditCard size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 leading-none">Status</p>
                                                <p className="font-bold text-gray-900 capitalize">{order.status}</p>
                                            </div>
                                        </div>
                                        {order.razorpayOrderId && (
                                            <div className="pt-2 border-t border-gray-50">
                                                <p className="text-xs text-gray-400 uppercase">Razorpay Order ID</p>
                                                <p className="text-sm font-mono text-gray-600">{order.razorpayOrderId}</p>
                                            </div>
                                        )}
                                        {order.paymentId && (
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Payment ID</p>
                                                <p className="text-sm font-mono text-gray-600">{order.paymentId}</p>
                                            </div>
                                        )}
                                        {order.paymentDate && (
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Payment Date</p>
                                                <p className="text-sm text-gray-600">
                                                    {format(new Date(order.paymentDate), 'PPP, p')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
