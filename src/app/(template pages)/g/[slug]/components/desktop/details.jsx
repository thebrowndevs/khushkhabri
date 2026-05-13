import React from 'react';
import { motion } from 'framer-motion';
import { Dancing_Script, Cormorant_Upright } from 'next/font/google';
import { MapPin } from "lucide-react";

const dancingScript = Dancing_Script({ subsets: ['latin'] });
const cormorantUpright = Cormorant_Upright({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700']
});

const item = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: "blur(8px)",
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function Details({ invitation }) {
    const details = invitation?.satsangDetails || {};

    // Formatting date
    const dateObj = details.date ? new Date(details.date) : new Date();
    const dayName = dateObj.toLocaleDateString('en-IN', { weekday: 'long' });
    const dayNum = dateObj.toLocaleDateString('en-IN', { day: 'numeric' });
    const monthName = dateObj.toLocaleDateString('en-IN', { month: 'short' });
    const year = dateObj.toLocaleDateString('en-IN', { year: 'numeric' });

    return (
        <section className="relative w-full z-10 -mt-[40vh] font-serif flex flex-col items-center pb-5">
            {/* Background Images Layer */}
            <div className="absolute inset-0 z-0 flex flex-col w-full h-full">
                <img src="/templates/guruji/details.png" alt="bg1" className="w-full h-auto object-cover object-top" />
                <div
                    className="w-full flex-1"
                    style={{
                        backgroundImage: "url('/templates/guruji/details2.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "top"
                    }}
                />
            </div>

            {/* Floating Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
                {/* Flower 1 */}
                <motion.img
                    src="/icons/1.png"
                    className="absolute top-[10%] left-[5%] w-24 h-auto opacity-70"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Flower 2 */}
                <motion.img
                    src="/icons/2.png"
                    className="absolute top-[25%] right-[8%] w-20 h-auto opacity-60"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -15, 0],
                        rotate: [0, -15, 0]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Flower 3 */}
                <motion.img
                    src="/icons/3.png"
                    className="absolute top-[50%] left-[10%] w-28 h-auto opacity-60"
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 20, 0],
                        rotate: [0, 20, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Flower 4 */}
                <motion.img
                    src="/icons/4.png"
                    className="absolute top-[75%] right-[5%] w-24 h-auto opacity-60"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, -10, 0],
                        rotate: [0, 15, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Petals - Multiple Copies */}
                {[...Array(15)].map((_, i) => (
                    <motion.img
                        key={`petal-${i}`}
                        src={i % 2 === 0 ? "/icons/13.png" : "/icons/15.png"}
                        className="absolute w-auto opacity-70"
                        style={{
                            top: `${(i * 7) + 5}%`,
                            left: `${(i * 13) % 90}%`,
                            width: `${30 + (i % 5) * 5}px`, // Increased: 30px to 50px
                        }}
                        animate={{
                            y: [0, 100 + (i % 3) * 50, 0],
                            x: [0, (i % 2 === 0 ? 30 : -30), 0],
                            rotate: [0, i % 2 === 0 ? 360 : -360]
                        }}
                        transition={{
                            duration: 10 + (i % 5) * 2,
                            repeat: Infinity,
                            ease: i % 3 === 0 ? "linear" : "easeInOut",
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center w-full px-0 pt-[30vh] pb-13">

                {/* Ganesh Ji */}
                <motion.img
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    src="/templates/guruji/ganeshji2.png"
                    alt="Ganesh ji"
                    className="w-[100vw] h-auto mb-9 drop-shadow-xl saturate-150"
                />

                {/* Jai Guruji Text */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
                    className={`${dancingScript.className} text-[#102d18] text-6xl mb-10 font-black text-shadow-lg`}
                >
                    Jai Guruji
                </motion.h2>

                {/* Guruji Image (Framed) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                    className="relative z-20 -mb-14 px-4"
                >
                    <img
                        src="/templates/guruji/guruji.png"
                        alt="Guruji"
                        className="w-full max-w-[310px] h-auto drop-shadow-2xl"
                    />
                </motion.div>

                {/* Transparent Details Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1.8, delay: 0.7, ease: "easeOut" }}
                    className={`${cormorantUpright.className} bg-white/30  px-8 pt-24 pb-56 w-full max-w-[280px] flex flex-col items-center text-center relative border-x-2 border-[#8b2c3c]/80 border-b-2 shadow-2xl rounded-2xl`}
                >
                    <h3 className="text-[#13351d] text-4xl mt-3 font-bold mb-5 tracking-tight">{details.invitorName || 'Khanna Family'}</h3>
                    <p className="text-[#13351d] text-2xl mb-6 italic opacity-80 leading-relaxed">cordially invite<br />you to</p>

                    <h4 className="text-[#13351d] text-4xl font-bold mb-4 leading-relaxed">Guruji's <br />Divine Satsang</h4>

                    <img src="/templates/guruji/divider.png" alt="divider" className="w-[220px] h-auto my-4 opacity-80" />

                    <div className="mt-4 text-[#13351d] space-y-10 w-full">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl lowercase opacity-70 font-bold italic">on</span>
                            <div className="flex flex-col gap-1">
                                <span className="text-2xl font-bold">{dayName}, {dayNum} {monthName} {year}</span>
                                <span className="text-xl opacity-90">{details.time || '12 PM Onwards'}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl  lowercase opacity-70 font-bold italic">venue</span>
                            <span className="text-2xl font-bold w-full whitespace-pre-wrap leading-tight">{details.venue || 'Khanna Residence\nAshoka Society\nNew Delhi'}</span>
                        </div>
                    </div>
                    {details.mapLink && (
                        <motion.a
                            variants={item}
                            href={details.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-900/90 shadow-sm text-lg mt-4 bg-white/10 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm z-30 hover:bg-white/20 transition-colors"
                        >
                            <MapPin size={18} />
                            <span>See Location</span>
                        </motion.a>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
