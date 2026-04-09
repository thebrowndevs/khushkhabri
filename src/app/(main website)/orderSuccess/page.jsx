// orderSuccess/page.jsx
'use client';

import WebsiteLayout from '@/components/website/WebsiteLayout';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiShoppingBag, FiGift, FiClock } from 'react-icons/fi';

function Page() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/user');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <WebsiteLayout>
            <div className="min-h-[80vh] flex items-center justify-center pt-18 px-4">
                <div className="max-w-md w-full text-center">
                    {/* Animated Checkmark */}
                    <div className="relative w-56 h-56 mx-auto mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: 0.2
                            }}
                            className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full"
                        />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: 0.4
                            }}
                            className="absolute inset-8 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full"
                        />

                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: 0.6
                            }}
                            className="absolute inset-16 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full flex items-center justify-center"
                        >
                            <FiCheckCircle className="h-28 w-28 text-white" />
                        </motion.div>
                    </div>

                    {/* Success Message */}
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        Order Confirmed!
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-600 mb-4 max-w-md mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4 }}
                    >
                        Thank you for your purchase! Your order has been successfully placed and is being processed.
                    </motion.p>

                    {/* Countdown Timer */}
                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6 max-w-xs mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.6 }}
                    >
                        <div className="flex items-center justify-center mb-3">
                            <FiClock className="h-5 w-5 text-amber-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Redirecting in</span>
                        </div>

                        <div className="flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={countdown}
                                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -20, opacity: 0, scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-3xl font-bold text-emerald-600"
                                >
                                    {countdown}
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-3xl font-bold text-emerald-600 ml-1">seconds</span>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.8 }}
                    >
                        <button
                            onClick={() => router.push('/user')}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
                        >
                            <FiShoppingBag className="mr-2" />
                            View Orders
                        </button>
                    </motion.div>
                </div>
            </div>
        </WebsiteLayout>
    );
}

export default Page;