'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiX, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import LoginButton from '@/components/auth/LoginButton'
import { NAVBAR_LINKS } from '@/lib/constants/sidebarLinks'

export default function MobileNav({ isOpen, onClose }) {

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-white p-1 rounded-lg">
                                        <Image
                                            alt="logo"
                                            src="/logo.png"
                                            height={200}
                                            width={200}
                                            className="h-10 w-auto"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <FiX className="text-gray-700" size={24} />
                                </button>
                            </div>

                            {/* Navigation Content */}
                            <div className="flex-1 overflow-y-auto py-4 px-6">
                                {NAVBAR_LINKS.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.href}
                                        className="flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#006624] rounded-lg transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-500">
                                © {new Date().getFullYear()} Brown Devs. All rights reserved.
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}