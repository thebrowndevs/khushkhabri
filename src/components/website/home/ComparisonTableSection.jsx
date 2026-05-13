"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ComparisonTableSection() {
    const features = [
        { name: "Instant editing", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Publish anytime", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Share on WhatsApp", cross: "print", check2: "video", check: "khushkhabri" },
        { name: "RSVP", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Editable after sending", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Setup time", text1: "Days", text2: "Hours", text3: "10 mins" },
        { name: "Google Maps", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Premium feel", warn1: "print", warn: "video", check: "khushkhabri" },
        { name: "Cost efficiency", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Photo gallery / couple story", cross: "print", warn: "video", check: "khushkhabri" },
        { name: "Different event links for different guests", warn1: "print", warn: "video", check: "khushkhabri" },
        { name: "Engagement", warn1: "print", warn: "video", check: "khushkhabri" },
    ];

    const getIcon = (type, val) => {
        if (type === "text1" || type === "text2" || type === "text3") {
            return <span className="font-semibold text-gray-700">{val}</span>;
        }
        if (type === "cross" || type === "warn1" || type === "warn" || type === "check2" || type === "check") {
            switch(type) {
                case "cross": 
                case "warn1": // The prompt says some are warn, some cross. Let's just use what prompt says directly.
                    return <XCircle className="w-5 h-5 mx-auto text-red-400" strokeWidth={2.5}/>;
                case "warn":
                    return <AlertCircle className="w-5 h-5 mx-auto text-amber-500" strokeWidth={2.5}/>;
                case "check2":
                case "check":
                    return <CheckCircle2 className="w-5 h-5 mx-auto text-green-500" strokeWidth={2.5}/>;
                default: return null;
            }
        }
        return null;
    };

    // Refined the features array based precisely on prompt
    const tableData = [
        { feature: "Instant editing", printed: "x", video: "x", khushkhabri: "v" },
        { feature: "Publish anytime", printed: "x", video: "x", khushkhabri: "v" },
        { feature: "Share on WhatsApp", printed: "x", video: "v", khushkhabri: "v" },
        { feature: "RSVP", printed: "x", video: "x", khushkhabri: "v" },
        { feature: "Editable after sending", printed: "x", video: "x", khushkhabri: "v" },
        { feature: "Setup time", printed: "Days", video: "Hours", khushkhabri: "10 mins" },
        { feature: "Google Maps", printed: "x", video: "x", khushkhabri: "v" },
        { feature: "Premium feel", printed: "~", video: "~", khushkhabri: "v" },
        { feature: "Cost efficiency", printed: "x", video: "~", khushkhabri: "v" },
        { feature: "Photo gallery / couple story", printed: "x", video: "x", khushkhabri: "v" },
        { feature: "Different event links for different guests", printed: "~", video: "~", khushkhabri: "v" },
        { feature: "Engagement", printed: "~", video: "~", khushkhabri: "v" },
    ];

    const renderCell = (val) => {
        if (val === "x") return <XCircle className="w-6 h-6 mx-auto text-red-500 opacity-80" strokeWidth={2}/>;
        if (val === "~") return <AlertCircle className="w-6 h-6 mx-auto text-amber-500 opacity-90" strokeWidth={2}/>;
        if (val === "v") return <CheckCircle2 className="w-7 h-7 mx-auto text-green-500" strokeWidth={2.5}/>;
        return <span className="font-semibold text-gray-700 whitespace-nowrap">{val}</span>;
    };

    const renderKhushkhabriCell = (val) => {
        if (val === "v") return <CheckCircle2 className="w-7 h-7 mx-auto text-green-500" strokeWidth={2.5}/>;
        return <span className="font-bold text-[#8b2c3c] whitespace-nowrap">{val}</span>;
    };

    return (
        <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-20">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                
                {/* Headers */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <span className="text-[#8b2c3c] font-bold tracking-wider uppercase text-sm mb-3 block">WHY NOT TRADITIONAL INVITES?</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#5a1e2b] tracking-tight leading-tight">
                        Why modern couples are choosing website invites
                    </h2>
                </motion.div>

                {/* Table Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="w-full bg-white rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
                >
                    <div className="w-full overflow-hidden">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-4 md:py-6 px-2 md:px-6 font-semibold text-gray-800 flex-1 text-xs md:text-lg w-[40%]">Feature</th>
                                    <th className="py-4 md:py-6 px-1 md:px-4 text-center font-semibold text-gray-500 text-[10px] md:text-base w-[20%] leading-tight">Printed Cards</th>
                                    <th className="py-4 md:py-6 px-1 md:px-4 text-center font-semibold text-gray-500 text-[10px] md:text-base w-[20%] leading-tight">Video Invite</th>
                                    <th className="py-4 md:py-6 px-1 md:px-4 text-center font-bold text-[#8b2c3c] bg-[#fff5f6] text-[10px] md:text-base w-[20%] shadow-[inset_0_-2px_0_rgba(139,44,60,0.1)] relative leading-tight">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-[#8b2c3c]"></div>
                                        Khushkhabri <span className="hidden sm:inline">DIY</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, idx) => (
                                    <tr 
                                        key={idx} 
                                        className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${idx === tableData.length - 1 ? 'border-b-0' : ''}`}
                                    >
                                        <td className="py-3 md:py-4 px-2 md:px-6 text-gray-700 font-medium text-xs md:text-lg break-words">{row.feature}</td>
                                        <td className="py-3 md:py-4 px-1 md:px-4 text-center scale-75 md:scale-100 text-[10px] md:text-base">{renderCell(row.printed)}</td>
                                        <td className="py-3 md:py-4 px-1 md:px-4 text-center scale-75 md:scale-100 text-[10px] md:text-base">{renderCell(row.video)}</td>
                                        <td className="py-3 md:py-4 px-1 md:px-4 text-center bg-[#fff5f6]/60 border-l border-r border-white/50 scale-75 md:scale-100 text-[10px] md:text-base">{renderKhushkhabriCell(row.khushkhabri)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12"
                >
                    <Link
                        href="#templates"
                        className="group flex items-center justify-center gap-6 w-full sm:w-auto pl-8 pr-2 py-2 bg-[#8b2c3c] text-white rounded-full font-medium text-lg hover:bg-[#6e222b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <span>Explore Templates</span>
                        <div className="bg-white text-[#8b2c3c] flex items-center justify-center rounded-full w-10 h-10 shrink-0 transition-transform group-hover:rotate-45">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
