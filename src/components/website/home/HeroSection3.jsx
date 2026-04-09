"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    // Parallax logic attached directly to the global window scroll
    const { scrollY } = useScroll();

    // As the user scrolls down, translate the hero elements out of view seamlessly
    const leftOut = useTransform(scrollY, [0, 600], [0, -400]);
    const rightOut = useTransform(scrollY, [0, 600], [0, 400]);
    const contentOut = useTransform(scrollY, [0, 400], [0, -250]);

    return (
        <section
            className="relative w-full flex-1 flex items-center justify-center overflow-hidden pb-16 sm:pb-16"
        >

            {/* 🌸 PETALS */}
            {[...Array(20)].map((_, i) => {
                const isLeft = i % 2 === 0;
                return (
                    <motion.img
                        key={i}
                        src={i % 3 === 0 ? "/icons/13.png" : "/icons/15.png"}
                        className={`absolute w-5 sm:w-8 pointer-events-none z-10 ${isLeft ? "left-0" : "right-0"}`}
                        initial={{
                            y: -100 - Math.random() * 100,
                            x: isLeft ? Math.random() * 300 : -Math.random() * 300,
                            opacity: 0.7
                        }}
                        animate={{
                            y: "100vh",
                            x: isLeft ? Math.random() * 400 : -Math.random() * 400,
                            rotate: 360,
                        }}
                        transition={{
                            duration: 40 + Math.random() * 15,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear",
                        }}
                    />
                );
            })}

            {/* 🌿 LEAVES */}
            <motion.img
                src="/icons/16.png"
                className="absolute left-6 top-24 w-16 opacity-60 hidden sm:block z-20 pointer-events-none"
                style={{ x: leftOut }}
                animate={{ y: [0, 20, 0], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.img
                src="/icons/14.png"
                className="absolute right-6 top-44 w-14 opacity-60 hidden sm:block z-20 pointer-events-none"
                style={{ x: rightOut }}
                animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
            />

            {/* ✉️ ENVELOPES (BACKGROUND) */}
            <motion.img
                src="/icons/18.png"
                className="absolute left-6 sm:left-32 top-10 sm:top-20 w-12 sm:w-20 opacity-80 pointer-events-none z-10"
                style={{ x: leftOut }}
                animate={{ y: [0, -15, 0], rotate: [-10, 10, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/icons/19.png"
                className="absolute right-6 sm:right-32 bottom-40 sm:bottom-48 w-12 sm:w-20 opacity-80 pointer-events-none z-10"
                style={{ x: rightOut }}
                animate={{ y: [0, 20, 0], rotate: [10, -10, 10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🌺 SIDE FLOWERS */}
            <motion.img
                src="/icons/2.png"
                className="absolute -left-4 sm:left-12 bottom-28 sm:bottom-32 w-16 sm:w-32 opacity-80 sm:opacity-90 pointer-events-none origin-bottom-left z-20"
                style={{ x: leftOut }}
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.img
                src="/icons/3.png"
                className="absolute -right-4 sm:right-12 top-16 sm:top-32 w-16 sm:w-32 opacity-80 sm:opacity-90 pointer-events-none origin-bottom-right z-20"
                style={{ x: rightOut }}
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🌷 GROUND FLOWERS (BUNCHES) */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-2 sm:px-12 pointer-events-none z-20 overflow-hidden">
                {/* Left Bunch */}
                <motion.div
                    style={{ x: leftOut }}
                    className="flex items-end -space-x-4 sm:-space-x-8"
                >
                    <motion.img
                        src="/icons/9.png"
                        className="w-16 sm:w-32 origin-bottom"
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src="/icons/10.png"
                        className="w-20 sm:w-40 origin-bottom z-10"
                        animate={{ rotate: [2, -2, 2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src="/icons/11.png"
                        className="w-16 sm:w-32 origin-bottom"
                        animate={{ rotate: [-1, 3, -1] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* Right Bunch */}
                <motion.div
                    style={{ x: rightOut }}
                    className="flex items-end -space-x-4 sm:-space-x-8"
                >
                    <motion.img
                        src="/icons/11.png"
                        className="w-16 sm:w-32 origin-bottom"
                        animate={{ rotate: [1, -3, 1] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src="/icons/12.png"
                        className="w-20 sm:w-40 origin-bottom z-10"
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src="/icons/9.png"
                        className="w-16 sm:w-32 origin-bottom"
                        animate={{ rotate: [2, -2, 2] }}
                        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>

            {/* 🧠 CONTENT */}
            <motion.div
                style={{ y: contentOut }}
                className="relative z-30 flex flex-col items-center text-center px-4 max-w-3xl sm:pt-6 pt-0"
            >
                {/* Main Floating Envelope on Mobile */}
                <motion.img
                    src="/icons/17.png"
                    className="w-24 sm:w-28 mb-2 sm:mb-7 block pointer-events-none"
                    animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl font-semibold text-[#5a1e2b] tracking-tighter"
                >
                    <span className="block sm:inline">Turn Your </span>
                    <span className="block sm:inline">Special Moments </span>
                    <span className="block sm:inline">Into </span>
                    <span className="block font-script text-[#8b2c3c] mt-4 sm:mt-4 text-4xl sm:text-6xl tracking-normal">
                        Beautiful Invitations
                    </span>
                </motion.h1>


                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-gray-700 text-base sm:text-lg"
                >
                    Create, customize and share your invitation in minutes
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
                >
                    <button className="px-6 py-3 border border-[#8b2c3c] text-[#8b2c3c] rounded-full hover:bg-[#8b2c3c] hover:text-white transition">
                        Explore Templates
                    </button>
                </motion.div>

                {/* Trust */}
                <p className="mt-6 text-sm text-gray-600 max-[500px]:max-w-[250px]">
                    Loved by 500+ families • No design skills needed
                </p>
            </motion.div>
        </section>
    );
}