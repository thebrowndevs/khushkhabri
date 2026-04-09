"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ContactHero() {
    return (
        <div className="py-20 md:py-24 px-4 text-center max-w-4xl mx-auto relative z-10">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-7xl text-[#5a1e2b] mb-8 leading-tight font-script"
            >
                Get in Touch
            </motion.h1>
            
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed"
            >
                Whether you have a question about our templates, need a custom design, or just want to say hello—we're here to help you share your joy with the world.
            </motion.p>
        </div>
    );
}
