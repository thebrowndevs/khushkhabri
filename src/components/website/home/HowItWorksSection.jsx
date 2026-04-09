"use client";

import React from "react";
import { motion } from "framer-motion";

const PaintbrushIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-[#dcae96]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.813-3.814a3.18 3.18 0 00-4.497-4.498l-3.814 3.814q-.506.505-.98 1.05z" />
    </svg>
);

const FormIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-[#dcae96]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-[#dcae96]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
);

export default function HowItWorksSection() {
    const steps = [
        {
            id: "01",
            icon: <PaintbrushIcon />,
            title: "Choose Template",
            desc: "Browse templates made for your wedding tradition and pick a design you love."
        },
        {
            id: "02",
            icon: <FormIcon />,
            title: "Add Your Details",
            desc: "Names, events, photos — everything is easily customizable with no coding required."
        },
        {
            id: "03",
            icon: <ShareIcon />,
            title: "Publish & Share",
            desc: "Get your unique hosted link (e.g., khushkhabri.in/yours) and send it on WhatsApp to guests instantly.",
            highlight: "No hosting or tech skills needed!"
        }
    ];

    return (
        <section id="how-it-works" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 z-20 bg-[#FFFFF0]/40 backdrop-blur-sm border-t border-b border-[#F7E7CE]/50">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#8b2c3c] font-bold tracking-widest uppercase text-sm mb-3 block">HOW IT WORKS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5a1e2b] tracking-tight leading-tight">
                        Create Your Invite in 3 Simple Steps
                    </h2>
                </motion.div>

                {/* Steps Container */}
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 lg:gap-12 w-full mb-16">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            className="flex flex-col flex-1 items-center text-center relative max-w-sm mx-auto group"
                        >
                            {/* Step Number Background */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl font-sans font-bold text-[#F7E7CE] opacity-30 select-none z-0">
                                {step.id}
                            </div>
                            
                            {/* Icon Circle */}
                            <div className="w-24 h-24 rounded-full bg-white border border-[#F7E7CE] flex items-center justify-center shadow-[0_8px_30px_rgba(218,174,150,0.15)] mb-6 z-10 group-hover:scale-105 transition-transform duration-500">
                                {step.icon}
                            </div>
                            
                            {/* Content */}
                            <h3 className="text-xl font-semibold text-[#5a1e2b] mb-3 z-10">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed z-10">
                                {step.desc}
                            </p>
                            {step.highlight && (
                                <p className="text-[#8b2c3c] font-medium text-xs mt-3 bg-[#fff5f6] px-3 py-1 rounded-full border border-[#8b2c3c]/20 z-10">
                                    {step.highlight}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Highlight */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center bg-white/70 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#F7E7CE] shadow-sm max-w-2xl"
                >
                    <p className="text-gray-600 text-sm sm:text-base font-medium">
                        Less than the cost of <span className="text-gray-800 line-through decoration-[#8b2c3c]/30">printed cards</span> — and shareable instantly with 1,000 guests.
                    </p>
                    <p className="text-[#8b2c3c] font-semibold mt-2 flex items-center justify-center gap-2">
                        ⏱ Takes less than 10 minutes
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
