"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection2() {
    return (
        <section className="relative w-full flex-1 flex items-center justify-center overflow-hidden py-12 md:py-10">

            {/* Container */}
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-10 items-center relative z-20">

                {/* LEFT COLUMN: Text Content */}
                <motion.div
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:-mt-26 col-span-2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
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

                {/* RIGHT COLUMN: Mobile Mockup */}
                <motion.div
                    className="flex justify-center lg:justify-end relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    {/* Decorative Blooms behind the phone */}
                    <motion.img
                        src="/icons/2.png"
                        className="absolute -left-10 bottom-10 w-24 sm:w-32 opacity-70 pointer-events-none z-0"
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        alt="Decorative flower"
                    />
                    <motion.img
                        src="/icons/3.png"
                        className="absolute -right-6 top-10 w-24 sm:w-32 opacity-70 pointer-events-none z-0"
                        animate={{ rotate: [3, -3, 3] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        alt="Decorative flower"
                    />

                    {/* The Phone Box */}
                    <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(139,44,60,0.15)] border-[8px] border-white overflow-hidden z-10 p-1">
                        {/* Phone Top Notch */}
                        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                            <div className="w-32 h-6 bg-white rounded-b-3xl shadow-sm"></div>
                        </div>

                        {/* Scrolling Image Container */}
                        <div className="w-full h-full rounded-[30px] overflow-hidden relative bg-[#FAF6F6]">
                            {/* Image that scrolls endlessly up and down */}
                            <motion.div
                                className="w-full relative"
                                animate={{
                                    y: ["0%", "-60%", "0%"]
                                }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                {/* We use a preview image or stack multiple template sections */}
                                <img
                                    src="/templates/sikh/preview.png"
                                    alt="Live Invite Preview"
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}