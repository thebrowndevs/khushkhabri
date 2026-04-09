"use client";
import { motion } from "framer-motion";

export default function Blessings() {
    return (
        <section
            className="relative w-full pt-50 pb-35 px-6 text-center bg-cover bg-center bg-no-repeat overflow-hidden shadow-inner"
            style={{ backgroundImage: "url('/bg/bluePattern.png')" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-14"
            >
                <h2 className="text-white text-5xl font-script tracking-wide italic">
                    with Love & Blessings
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex justify-center mb-16"
            >
                <img
                    src="/templates/temple/ganesh.png"
                    alt="Ganesha"
                    className="w-full max-w-[420px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <p className="text-white text-4xl font-script leading-[1.3] max-w-sm mx-auto">
                    Your presence will make our day even more special...
                </p>
            </motion.div>
        </section>
    );
}
