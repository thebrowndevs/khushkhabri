"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection2() {
    const themes = [
        { id: 1, img: "/images/invite1.png", rotate: -12, x: -80, z: 10, delay: 0.1 },
        { id: 2, img: "/images/invite2.png", rotate: -6, x: -40, z: 20, delay: 0.2 },
        { id: 3, img: "/images/invite3.png", rotate: 0, x: 0, z: 30, delay: 0.3 },
        { id: 4, img: "/images/invite4.png", rotate: 6, x: 40, z: 20, delay: 0.4 },
        { id: 5, img: "/images/invite5.png", rotate: 12, x: 80, z: 10, delay: 0.5 },
    ];

    return (
        <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-8 md:py-0">
            {/* Background Accents */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#8b2c3c]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Container */}
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">

                {/* LEFT COLUMN: Text Content */}
                <motion.div
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:col-span-7"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold tracking-tight text-[#5a1e2b]">
                        Premium Wedding Invitation Websites for Modern Indian Families
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-gray-700 max-w-xl ">
                        Beautiful, customizable invite websites with photos, events, RSVP, maps & music — designed to impress every guest.
                    </p>

                    {/* Trust Strip */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm sm:text-base text-[#5a1e2b] font-medium bg-white/50 px-4 py-3 rounded-2xl border border-white/60 backdrop-blur-sm shadow-sm">
                        <span className="flex items-center gap-1">⭐ Loved by 500+ families</span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <span className="flex items-center gap-1">📱 Mobile-friendly</span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <span className="flex items-center gap-1">⚡ Ready in 10 mins</span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <span className="flex items-center gap-1">💯 No design skills</span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                        <Link
                            href="/templates"
                            className="group flex items-center justify-between sm:justify-center gap-6 w-full sm:w-auto pl-8 pr-2 py-2 bg-[#8b2c3c] text-white rounded-full font-medium text-lg hover:bg-[#6e222b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <span>View Live Templates</span>
                            <div className="bg-white text-[#8b2c3c] flex items-center justify-center rounded-full w-10 h-10 shrink-0 transition-transform group-hover:rotate-45">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </Link>
                        <a
                            href="#how-it-works"
                            className="group flex items-center justify-between sm:justify-center gap-6 w-full sm:w-auto pl-8 pr-2 py-2 bg-white text-[#8b2c3c] rounded-full font-medium text-lg border-2 border-[#8b2c3c] hover:bg-[#fff5f6] transition-all shadow-sm hover:shadow-md"
                        >
                            <span>How It Works</span>
                            <div className="bg-[#8b2c3c] text-white flex items-center justify-center rounded-full w-10 h-10 shrink-0 transition-transform group-hover:rotate-45">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: 5-Theme Staggered Stack */}
                <div className="lg:col-span-5 h-[400px] sm:h-[600px] relative mt-12 lg:mt-0 flex items-center justify-center lg:justify-end pr-10">
                    <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
                        {themes.map((theme, index) => (
                            <motion.div
                                key={theme.id}
                                className="absolute w-[200px] sm:w-[260px] aspect-[9/19] rounded-[32px] sm:rounded-[48px] overflow-hidden shadow-2xl border-[4px] sm:border-[8px] border-white bg-white group cursor-pointer"
                                style={{
                                    zIndex: theme.z,
                                    originY: 1,
                                }}
                                initial={{ opacity: 0, scale: 0.5, x: 0, rotate: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: theme.x,
                                    rotate: theme.rotate,
                                }}
                                transition={{
                                    duration: 1,
                                    delay: theme.delay,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    y: {
                                        duration: 4 + index,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }
                                }}
                                whileInView={{
                                    y: [0, index % 2 === 0 ? -15 : 15, 0],
                                }}
                                viewport={{ once: false }}
                                whileHover={{
                                    scale: 1.01,
                                    zIndex: 50,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="w-full h-full relative overflow-hidden bg-gray-50">
                                    <Image
                                        src={theme.img}
                                        alt={`Wedding Theme ${theme.id}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 640px) 200px, 260px"
                                        priority={index === 2}
                                    />
                                    {/* Overlay for better depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}


                        <motion.div
                            className="absolute -bottom-5 -left-20 w-36 h-36 sm:w-48 sm:h-48 z-0 opacity-40 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            <Image src="/icons/1.png" alt="Decoration" fill className="object-contain" />
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}