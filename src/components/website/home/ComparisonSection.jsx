"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ComparisonSection() {
    return (
        <section className="relative w-full overflow-hidden z-20">
            {/* 🌸 FALLING PETALS */}
            {[...Array(8)].map((_, i) => {
                const isLeft = i % 2 === 0;
                return (
                    <motion.img
                        key={`comp-petal-${i}`}
                        src={i % 3 === 0 ? "/icons/13.webp" : "/icons/15.webp"}
                        className={`absolute w-6 sm:w-10 pointer-events-none z-0 opacity-40 ${isLeft ? "left-[10%] sm:left-[20%]" : "right-[10%] sm:right-[20%]"}`}
                        initial={{
                            y: -100 - Math.random() * 100,
                            x: isLeft ? Math.random() * 100 : -Math.random() * 100,
                        }}
                        animate={{
                            y: "100vh",
                            x: isLeft ? Math.random() * 200 : -Math.random() * 200,
                            rotate: 360,
                        }}
                        transition={{
                            duration: 25 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear",
                        }}
                    />
                );
            })}

            {/* 🌿 FLOATING LEAVES */}
            <motion.img
                src="/icons/16.webp"
                className="absolute left-4 sm:left-10 top-32 w-16 sm:w-20 opacity-40 pointer-events-none z-0"
                animate={{ y: [-10, 15, -10], rotate: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/icons/14.webp"
                className="absolute right-8 sm:right-16 top-64 w-12 sm:w-16 opacity-40 pointer-events-none z-0 hidden lg:block"
                animate={{ y: [10, -15, 10], rotate: [5, -10, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ✉️ MAIL ICONS */}
            <motion.img
                src="/icons/17.webp"
                className="absolute left-6 sm:left-24 bottom-30 w-14 sm:w-20 opacity-60 pointer-events-none z-0"
                animate={{ y: [-15, 10, -15], rotate: [-10, 8, -10] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/icons/18.webp"
                className="absolute right-4 sm:right-20 top-20 sm:top-24 w-14 sm:w-24 opacity-60 pointer-events-none z-0"
                animate={{ y: [15, -10, 15], rotate: [12, -8, 12] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🌺 CORNER SINGLE FLOWERS */}
            <motion.img
                src="/icons/3.webp"
                className="absolute -left-6 top-1/2 w-20 sm:w-28 opacity-80 pointer-events-none z-0"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/icons/4.webp"
                className="absolute -right-6 bottom-20 w-20 sm:w-28 opacity-70 pointer-events-none z-0"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-35 flex flex-col items-center">

                {/* Heading */}
                <div className="text-center max-w-3xl mb-12 px-2">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5a1e2b] tracking-tight leading-tight"
                    >
                        Still Sending Boring Invitations?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="mt-4 text-base sm:text-lg text-gray-700 font-medium"
                    >
                        Make your special moments unforgettable with beautiful digital invites
                    </motion.p>
                </div>

                {/* Main Comparison Layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1.2fr] gap-10 lg:gap-14 items-center justify-items-center mb-14 px-2 lg:px-6">

                    {/* LEFT SIDE: Traditional */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex flex-col items-center text-center w-full max-w-md"
                    >
                        <div className="relative w-full max-w-[280px] aspect-[4/5] mb-6 flex items-center justify-center ">
                            <Image
                                src="/images/boring-invite.png"
                                alt="Boring traditional invitation"
                                fill
                                className="object-contain object-center "
                            />
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-gray-200 text-gray-700 text-xs font-bold mb-3 uppercase tracking-wider">
                            Traditional
                        </span>
                        <p className="text-gray-500 text-sm sm:text-base font-medium">
                            Printed cards, slow delivery, no excitement
                        </p>
                    </motion.div>

                    {/* Desktop Divider */}
                    <div className="hidden lg:flex flex-col items-center h-full min-h-[300px] justify-center">
                        <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                        <div className="absolute bg-[#fff0f3] rounded-full p-2 shadow-sm border border-gray-200 flex items-center justify-center -ml-[1px]">
                            <span className="text-gray-400 font-bold text-[10px]">VS</span>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Digital */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex flex-col items-center text-center w-full max-w-2xl"
                    >
                        {/* 3 Images Horizontal on Desktop, Vertical on Mobile */}
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 mb-8">

                            {/* Image 1 */}
                            <motion.div
                                animate={{ y: [-4, 4, -4] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.03 }}
                                className="relative w-full max-w-[220px] sm:w-1/3 aspect-[3/4] rounded-xl shadow-md overflow-hidden border-[3px] border-white bg-pink-50"
                            >
                                <Image src="/images/invite1.webp" alt="Digital Invite 1" fill className="object-cover" />
                            </motion.div>

                            {/* Image 2 */}
                            <motion.div
                                animate={{ y: [4, -4, 4] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.03 }}
                                className="relative w-full max-w-[220px] sm:w-1/3 aspect-[3/4] rounded-xl shadow-lg border-[3px] border-white overflow-hidden bg-pink-100"
                            >
                                <Image src="/images/invite2.webp" alt="Digital Invite 2" fill className="object-cover" />
                            </motion.div>

                            {/* Image 3 */}
                            <motion.div
                                animate={{ y: [-6, 6, -6] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.03 }}
                                className="relative w-full max-w-[220px] sm:w-1/3 aspect-[3/4] rounded-xl shadow-md overflow-hidden border-[3px] border-white bg-pink-200"
                            >
                                <Image src="/images/invite3.webp" alt="Digital Invite 3" fill className="object-cover" />
                            </motion.div>
                        </div>

                        <span className="px-4 py-1.5 rounded-full bg-white text-[#8b2c3c] border border-[#8b2c3c]/20 text-xs font-bold mb-3 uppercase tracking-wider shadow-sm">
                            Digital Experience
                        </span>
                        <p className="text-[#5a1e2b] text-sm sm:text-base font-semibold">
                            Animated invites, instant sharing, beautiful experience
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
