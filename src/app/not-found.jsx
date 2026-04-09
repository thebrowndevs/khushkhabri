'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/website/common/Navbar';
import Footer from '@/components/website/common/Footer';

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex flex-col">
            {/* GLOBAL FIXED BACKGROUND FOR PARALLAX */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/bg/pinkbg.png')`, backgroundColor: '#FFEAED' }}
            />
            {/* Shared Overlay */}
            <div className="fixed inset-0 z-0 bg-white/60 backdrop-blur-[2px]" />

            {/* FOREGROUND CONTENT */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />

                <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
                    <div className="max-w-3xl w-full text-center relative">
                        {/* Animated 404 Text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative mb-8"
                        >
                            <h1 className="text-9xl md:text-[14rem] font-bold text-[#5a1e2b] opacity-10">
                                404
                            </h1>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <h2 className="text-4xl md:text-6xl font-script text-[#5a1e2b]">
                                        Page Not Found
                                    </h2>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Glassmorphism Message Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="bg-white/40 backdrop-blur-lg border border-white/60 p-8 md:p-12 rounded-3xl shadow-xl max-w-xl mx-auto"
                        >
                            <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-10">
                                Oops! The page you're looking for seems to have wandered off before the ceremony started.
                            </p>

                            <Link href="/">
                                <motion.div
                                    className="inline-block px-10 py-4 bg-[#7a2535] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#5a1e2b] transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Return to Home
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* Floating Petals for extra magic */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(6)].map((_, i) => (
                    <motion.img
                        key={i}
                        src={i % 2 === 0 ? "/icons/13.png" : "/icons/15.png"}
                        className="absolute w-8 opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}