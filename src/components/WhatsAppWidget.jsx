// components/WhatsAppWidget.jsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function WhatsAppWidget() {
    const whatsappNumber = "9990440099"
    const [showMsg, setShowMsg] = useState(true)
    const [hovered, setHovered] = useState(false)

    const openWhatsApp = () => {
        window.open(`https://wa.me/91${whatsappNumber}`, "_blank")
    }

    return (
        <div className="fixed bottom-7 right-6 z-50 flex flex-col items-end gap-2">
            {/* Message Popup */}
            <AnimatePresence>
                {showMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white text-gray-800 px-4 py-2 rounded-2xl shadow-lg text-sm"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <span>Let’s chat on WhatsApp</span>

                        {/* Cross button (only on hover) */}
                        {hovered && (
                            <button
                                onClick={() => setShowMsg(false)}
                                className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                            >
                                <X size={14} className="text-gray-600" />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Floating Button */}
            <motion.button
                onClick={openWhatsApp}
                className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Image
                    src="/whatsapp3.png"
                    alt="WhatsApp"
                    width={30}
                    height={30}
                    className="object-contain"
                />
            </motion.button>
        </div>
    )
}
