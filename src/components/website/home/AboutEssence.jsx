"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const essenceItems = [
    {
        title: "Eco-friendly Celebrations",
        desc: "Modernizing traditions while honoring nature. Our digital invitations help save thousands of trees every year.",
        image: "/icons/26.png",
        delay: 0
    },
    {
        title: "Timeless Elegance",
        desc: "Each theme is a masterpiece, handpicked to reflect the beauty and sanctity of your special day.",
        image: "/icons/27.png",
        delay: 0.1
    },
    {
        title: "Stress-free Planning",
        desc: "Say goodbye to scattered lists. Manage your RSVPs and guest details from a single, seamless dashboard.",
        image: "/icons/28.png",
        delay: 0.2
    },
    {
        title: "Lasting Memories",
        desc: "Your digital invite transforms into a beautiful gallery, keeping the magic alive for a year after the ceremony.",
        image: "/icons/29.png",
        delay: 0.3
    }
];

export default function AboutEssence() {
    return (
        <section className="py-20 relative px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-[#5a1e2b] mb-4"
                    >
                        The Essence of Khushkhabri
                    </motion.h2>
                    <div className="w-24 h-1 bg-[#5a1e2b]/20 mx-auto rounded-full" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                    {essenceItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: item.delay }}
                            className="bg-white/40 backdrop-blur-lg border-2 border-[#efd4d8] hover:border-[#5a1e2b] p-8 rounded-2xl transition-all duration-300 group flex flex-col items-center text-center"
                        >
                            <div className={`p-2 w-26 h-26 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={120}
                                    height={120}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-700 leading-relaxed text-base">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
