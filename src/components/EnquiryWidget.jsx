// components/EnquiryWidget.jsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EnquiryForm from './website/EnquiryForm'

export default function EnquiryWidget() {
    const [open, setOpen] = useState(false)
    const panelRef = useRef(null)

    // close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        if (open) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    return (
        <>
            {/* Floating Button with rotate animation */}
            <motion.button
                onClick={() => setOpen(o => !o)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    key={open ? 'cross' : 'chat'}
                    initial={{ rotate: open ? 0 : 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: open ? 180 : -180, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {open ? <X size={24} /> : <MessageCircle size={24} />}
                </motion.div>
            </motion.button>

            {/* Animated Pop-up Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={panelRef}
                        className="fixed bottom-22 right-8 z-50 w-80 sm:w-96 bg-white shadow-lg rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    >
                        <div className="p-4">
                            <EnquiryForm />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
