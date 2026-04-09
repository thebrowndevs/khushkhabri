"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FeatureVisualSection() {
    const features = [
        { id: 1, icon: "💌", title: "Couple Story Timeline", desc: "Share how you met and fell in love" },
        { id: 2, icon: "🗓️", title: "Multi-Event Schedule", desc: "Haldi, Mehndi, Wedding & Reception details" },
        { id: 3, icon: "📍", title: "Google Maps", desc: "One-click navigation for easy arrival" },
        { id: 4, icon: "📸", title: "Photo Gallery", desc: "Your pre-wedding shoot memories" },
        { id: 5, icon: "✅", title: "RSVP / Guest Info", desc: "Collect headcounts instantly" },
        { id: 6, icon: "🎵", title: "Background Music", desc: "Set the mood with your favorite track" },
        { id: 7, icon: "⏳", title: "Live Countdown", desc: "Build excitement for the big day" },
        { id: 8, icon: "💍", title: "Unlimited Shares", desc: "Send to 10 or 10,000 guests via WhatsApp" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-20">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-[#8b2c3c] font-bold tracking-wider uppercase text-sm mb-3 block">FEATURE RICH</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5a1e2b] tracking-tight leading-tight">
                        Everything You Can Add in Your Invite
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full"
                >
                    {features.map((feature) => (
                        <motion.div 
                            key={feature.id}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-pink-50 hover:shadow-[0_10px_30px_rgba(139,44,60,0.08)] transition-all"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 bg-pink-50 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-[#5a1e2b] text-base sm:text-lg mb-2 leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
