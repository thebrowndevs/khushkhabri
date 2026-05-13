"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutHero() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* 🌸 FLOATING PETALS (Gentle Drift) */}
            {[...Array(12)].map((_, i) => (
                <motion.img
                    key={i}
                    src={i % 2 === 0 ? "/icons/13.webp" : "/icons/15.webp"}
                    className="absolute w-4 sm:w-6 opacity-40 pointer-events-none z-0"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        rotate: 0
                    }}
                    animate={{
                        x: [null, (Math.random() * 100) + "%"],
                        y: [null, (Math.random() * 100) + "%"],
                        rotate: 360
                    }}
                    transition={{
                        duration: 20 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                    }}
                />
            ))}

            {/* 🌿 LEAVES */}
            <motion.img
                src="/icons/16.webp"
                className="absolute left-4 top-10 w-12 opacity-30 pointer-events-none z-0 hidden sm:block"
                animate={{ y: [0, 15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/icons/14.webp"
                className="absolute right-10 top-20 w-10 opacity-30 pointer-events-none z-0 hidden sm:block"
                animate={{ y: [0, -15, 0], rotate: [0, -8, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ✉️ MAIL ICONS */}
            <motion.img
                src="/icons/17.webp"
                className="absolute left-10 bottom-10 w-14 opacity-50 pointer-events-none z-0"
                animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/icons/18.webp"
                className="absolute right-20 bottom-20 w-12 opacity-40 pointer-events-none z-0 hidden md:block"
                animate={{ y: [0, 12, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🌺 SIDE FLOWERS */}
            <motion.img
                src="/icons/2.webp"
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 opacity-60 pointer-events-none z-0 hidden lg:block"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.img
                src="/icons/3.webp"
                className="absolute -right-6 top-1/4 w-20 opacity-60 pointer-events-none z-0 hidden lg:block"
                animate={{ rotate: [2, -2, 2] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="py-20 md:py-32 px-4 text-center max-w-4xl mx-auto relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-semibold  text-[#5a1e2b] mb-8 leading-tight font-script"
                >
                    Crafting Digital Stories for Your Eternal Moments
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed"
                >
                    At Khushkhabri, we believe every invitation is more than just a link—it's a celebration of love, culture, and the beginning of a lifelong journey. We've modernized the traditional wedding invite to make it as beautiful, convenient, and sustainable as your love story.
                </motion.p>
            </div>
        </div>
    );
}
