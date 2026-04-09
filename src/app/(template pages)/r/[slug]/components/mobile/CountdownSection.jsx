"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TimeBox from "./TimeBox";
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
        <section className="relative w-full overflow-hidden font-serif">
            {/* Background */}
            <div
                className="pt-35 pb-24 text-center bg-cover bg-center font-script"
                style={{
                    backgroundImage: "url('/bg/maroon.png')",
                }}
            >

                <p className="text-[#D1CBA9] italic text-4xl">
                    and the Countdown begins...
                </p>

                {/* Countdown */}
                <div className="flex justify-center gap-6 mt-6 text-[#D1CBA9]">

                    <TimeBox value={timeLeft.days} label="days" />
                    <TimeBox value={timeLeft.hours} label="hours" />
                    <TimeBox value={timeLeft.mins} label="mins" />
                    <TimeBox value={timeLeft.secs} label="secs" />

                </div>

                {/* Clock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="mt-10 flex justify-center mb-10"
                >
                    <img
                        src="/templates/sikh/clock.png"
                        alt="clock"
                        className="w-[250px]"
                    />
                </motion.div>

            </div>
        </section>
    );
}