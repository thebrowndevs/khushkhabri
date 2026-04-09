"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative w-full font-serif h-[125vh] overflow-hidden">

            {/* ✅ MAIN IMAGE (NOT BACKGROUND) */}
            <motion.img
                src="/templates/guruji/hero.png"
                alt="bg"
                className="w-full h-full object-cover"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Petals - Large Copies */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[15]">
                {[...Array(15)].map((_, i) => (
                    <motion.img
                        key={`hero-petal-${i}`}
                        src={i % 2 === 0 ? "/icons/13.png" : "/icons/15.png"}
                        className="absolute w-auto opacity-70"
                        style={{
                            top: `${(i * 8) % 100}%`,
                            left: `${(i * 19) % 90}%`,
                            width: `${35 + (i % 5) * 6}px`, // Large petals: 35px to 65px
                        }}
                        animate={{ 
                            y: [0, 150 + (i % 3) * 70, 0], 
                            x: [0, (i % 2 === 0 ? 50 : -50), 0],
                            rotate: [0, i % 2 === 0 ? 360 : -360] 
                        }}
                        transition={{ 
                            duration: 12 + (i % 5) * 3, 
                            repeat: Infinity, 
                            ease: i % 3 === 0 ? "linear" : "easeInOut",
                            delay: i * 0.6
                        }}
                    />
                ))}
            </div>

            {/* ✅ PILLOWS - Pair 1 (Left) */}
            <motion.img
                src="/templates/guruji/pillow2.png"
                className="absolute -left-20 bottom-[20%] w-[150px] h-auto drop-shadow-2xl z-20"
                initial={{ opacity: 0, x: -100, rotate: 0 }}
                animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: [0, 2, 0],
                    y: [0, -10, 0]
                }}
                transition={{ 
                    duration: 0.8,
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/pillow2.png"
                className="absolute -left-10 bottom-[32%] w-[150px] h-auto drop-shadow-2xl z-10 opacity-90"
                initial={{ opacity: 0, x: -100, rotate: 0 }}
                animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: [0, -2, 0],
                    y: [0, 8, 0]
                }}
                transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* ✅ PILLOWS - Pair 2 (Right) */}
            <motion.img
                src="/templates/guruji/pillow.png"
                className="absolute -right-20 bottom-[20%] w-[150px] h-auto drop-shadow-2xl z-20"
                initial={{ opacity: 0, x: 100, rotate: 0 }}
                animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: [0, -2, 0],
                    y: [0, -10, 0]
                }}
                transition={{ 
                    duration: 0.8,
                    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/pillow.png"
                className="absolute -right-10 bottom-[32%] w-[150px] h-auto drop-shadow-2xl z-10 opacity-90"
                initial={{ opacity: 0, x: 100, rotate: 0 }}
                animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: [0, 2, 0],
                    y: [0, 8, 0]
                }}
                transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            <motion.img
                src="/templates/guruji/whitevase.png"
                className="absolute -left-[5%] bottom-[4%] w-[40%] h-auto z-[35]"
                initial={{ opacity: 0, scale: 1.5 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -5, 0] 
                }} 
                transition={{ 
                    delay: 0.1,
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/pinkvase.png"
                className="absolute left-[8%] bottom-[10%] w-[28%] h-auto z-[34]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0] 
                }} 
                transition={{ 
                    delay: 0.2,
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/whitevase.png"
                className="absolute left-[16%] bottom-[25%] w-[25%] h-auto z-[33]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -4, 0] 
                }} 
                transition={{ 
                    delay: 0.3,
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/pinkvase.png"
                className="absolute left-[24%] bottom-[30%] w-[18%] h-auto z-[32]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0] 
                }} 
                transition={{ 
                    delay: 0.4,
                    y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/peacock.png"
                className="absolute left-[28%] bottom-[37%] w-[14%] h-auto z-[31] scale-x-[-1]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: [-1, 1, -1],
                    y: [0, -4, 0]
                }} 
                transition={{ 
                    delay: 0.5,
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* Right Side (Bottom to Top) */}
            <motion.img
                src="/templates/guruji/whitevase.png"
                className="absolute -right-[5%] bottom-[4%] w-[40%] h-auto z-[35] scale-x-[-1]"
                initial={{ opacity: 0, scale: 1.5 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -5, 0] 
                }} 
                transition={{ 
                    delay: 0.1,
                    y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/pinkvase.png"
                className="absolute right-[8%] bottom-[10%] w-[28%] h-auto z-[34] scale-x-[-1]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0] 
                }} 
                transition={{ 
                    delay: 0.2,
                    y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/whitevase.png"
                className="absolute right-[16%] bottom-[25%] w-[25%] h-auto z-[33] scale-x-[-1]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -4, 0] 
                }} 
                transition={{ 
                    delay: 0.3,
                    y: { duration: 4.7, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/pinkvase.png"
                className="absolute right-[24%] bottom-[30%] w-[18%] h-auto z-[32] scale-x-[-1]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0] 
                }} 
                transition={{ 
                    delay: 0.4,
                    y: { duration: 5.7, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.img
                src="/templates/guruji/peacock.png"
                className="absolute right-[28%] bottom-[37%] w-[14%] h-auto z-[31]"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: [1, -1, 1],
                    y: [0, -4, 0]
                }} 
                transition={{ 
                    delay: 0.5,
                    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                }}
            />


        </section>
    );
}