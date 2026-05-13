"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TimeBox from "./TimeBox";

function FloatingPetals() {
    const petals = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        src: i % 2 === 0 ? "/icons/13.webp" : "/icons/15.webp",
        left: (i * 23) % 100,
        top: (i * 17) % 100,
        duration: 12 + (i % 7) * 2,
        delay: (i % 11),
        size: 14 + (i % 4) * 4,
        drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 5) * 5),
    }));

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {petals.map(p => (
                <motion.img
                    key={p.id}
                    src={p.src}
                    initial={{ y: 0, opacity: 0, rotate: 0 }}
                    animate={{
                        y: [0, 200, 400],
                        x: [0, p.drift, p.drift * 1.5],
                        opacity: [0, 0.8, 0.8, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    className="absolute shadow-sm"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                    }}
                />
            ))}
        </div>
    );
}

export default function CountdownSection({ weddingDate }) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTargetDate() {
        const date = new Date(weddingDate);

        // Set 7 PM
        date.setHours(19, 0, 0, 0);

        return date;
    }

    function getTimeLeft() {
        const target = getTargetDate();
        const now = new Date();

        const diff = target - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, mins: 0, secs: 0 };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            mins: Math.floor((diff / (1000 * 60)) % 60),
            secs: Math.floor((diff / 1000) % 60),
        };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full flex flex-col font-serif">

            <FloatingPetals />

            {/* Top part with bottom1 background */}
            <div
                className="relative w-full pt-50 pb-20 flex flex-col items-center bg-cover bg-bottom z-10"
                style={{ backgroundImage: "url('/templates/floral/bottom1.webp')" }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <p className="text-white text-4xl font-script tracking-wide">
                        The Countdown
                    </p>
                    <p className="text-white text-5xl font-script mt-2 tracking-wide">
                        begins...
                    </p>
                </motion.div>

                {/* Countdown UI */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex justify-center gap-6 text-white mt-12 mb-12"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-script">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="text-xl italic font-script mt-1 tracking-wider">days</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-script">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-xl italic font-script mt-1 tracking-wider">hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-script">{String(timeLeft.mins).padStart(2, '0')}</span>
                        <span className="text-xl italic font-script mt-1 tracking-wider">mins</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-script">{String(timeLeft.secs).padStart(2, '0')}</span>
                        <span className="text-xl italic font-script mt-1 tracking-wider">secs</span>
                    </div>
                </motion.div>

                {/* Ganesh Icon */}
                <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    src="/templates/floral/ganesh.png"
                    alt="ganesh"
                    className="w-[120px] mb-12"
                />

                {/* Bottom text over first background */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center px-6"
                >
                    <p className="text-white text-[2rem] font-script leading-relaxed">
                        Your presence will make<br />our day even more<br />special...
                    </p>
                </motion.div>
            </div>

            {/* Bottom part showing couple on swing */}
            <div className="w-full relative -mt-[90%] z-0 pointer-events-none">
                <img
                    src="/templates/floral/bottom2.webp"
                    alt="Couple on swing"
                    className="w-full h-auto object-cover"
                />
            </div>

        </section>
    );
}