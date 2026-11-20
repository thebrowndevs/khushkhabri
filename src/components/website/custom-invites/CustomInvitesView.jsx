"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail, FiChevronDown, FiCheck, FiSend } from "react-icons/fi";
import Image from "next/image";
import { toast } from "sonner";

const COMPARISON_DATA = [
    {
        feature: "Design Architecture",
        ready: "Pre-crafted premium layouts",
        custom: "Built from a blank canvas to match your concept",
    },
    {
        feature: "Couple Illustration",
        ready: "High-resolution photo uploads",
        custom: "Personalized digital caricatures matching real outfits & jewellery",
    },
    {
        feature: "Event Schedule & Flow",
        ready: "Fixed multi-event sections",
        custom: "Custom itinerary, multiple venues, dress codes & interactive maps",
    },
    {
        feature: "Creative Revisions",
        ready: "Instant self-serve dashboard edits",
        custom: "Direct designer collaboration with fine-tuning until satisfied",
    },
    {
        feature: "Music & Multimedia",
        ready: "Curated devotional & celebratory tracks",
        custom: "Your chosen songs, voiceover recordings & video teasers",
    },
    {
        feature: "Estimated Turnaround",
        ready: "Instant live link in minutes",
        custom: "First preview in 24-48 hrs, final delivery in 3-5 days",
    },
];

const FAQS = [
    {
        q: "What is the process to get a custom invitation made?",
        a: "It begins with a quick conversation. Send us a message on WhatsApp or submit your contact info below. Share your event dates, special functions, moodboard or outfit photos. Our creative team will review your requirements, suggest ideas, and share a personalized plan with a transparent quote.",
    },
    {
        q: "How much time will it take to receive our custom invite?",
        a: "We usually prepare the initial interactive preview within 24 to 48 hours. Once you review it and suggest any tweaks, our team finalizes all animations, music, and details within 3 to 5 working days.",
    },
    {
        q: "Can you create custom illustrations of the bride & groom?",
        a: "Yes! Our digital artists specialize in hand-crafted caricatures. You can share your outfit colors, poses, and accessories, and we will illustrate you both into the invitation theme.",
    },
    {
        q: "What if event details or timings change after sharing?",
        a: "Since Khushkhabri invitations are fully digital and live, you can request text, venue, date, or timing updates anytime. The changes reflect instantly across the link without needing to re-send to your guests.",
    },
    {
        q: "How do payments and approvals work?",
        a: "We start designing after a simple advance confirmation. You receive previews at every stage for your feedback, and the final link is handed over once you are completely thrilled with the outcome.",
    },
];

export default function CustomInvitesView() {
    const [openFaq, setOpenFaq] = useState(0);
    const [email, setEmail] = useState("");
    const [idea, setIdea] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const whatsappNumber = "919990440099";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi Khushkhabri! I am interested in designing a custom wedding invitation."
    )}`;

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setSubmitting(true);
        // Pre-fill mailto link with inquiry details
        const subject = encodeURIComponent("Custom Invitation Inquiry - Khushkhabri");
        const body = encodeURIComponent(
            `Hi Khushkhabri Team,\n\nI am interested in designing a custom wedding invitation.\n\nMy Email: ${email}\nSpecific ideas or ceremonies in mind: ${idea || "None specified"}\n\nPlease get in touch with me.\n\nThank you!`
        );
        window.location.href = `mailto:officialkhushkhabri@gmail.com?subject=${subject}&body=${body}`;
        toast.success("Opening your email client to send details!");
        setSubmitting(false);
    };

    return (
        <div className="w-full text-[#1e261a]">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[#e5dcd6]/60">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(188,73,92,0.12),transparent_70%)]"
                />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3d1822] tracking-tight leading-[1.15] mb-6"
                    >
                        Want something unique?
                        <br />
                        <span className="italic font-medium text-[#8b2c3c]">
                            Let us bring your dream invitation to life.
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base sm:text-lg text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto"
                    >
                        Every celebration has its own special vibe and memories. If you want something beyond ready-made designs, our creative team crafts tailor-made digital wedding websites, custom couple caricatures, and interactive invitation experiences styled around your rituals, decor, and personality.
                    </motion.p>

                    {/* Actions Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-w-lg mx-auto"
                    >
                        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex-1 sm:flex-initial min-w-[170px]"
                            >
                                <FaWhatsapp className="text-xl" />
                                <span>WhatsApp Us</span>
                            </a>
                            <a
                                href="tel:+919990440099"
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#5a1e2b] hover:bg-[#3d141d] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex-1 sm:flex-initial min-w-[170px]"
                            >
                                <FiPhone className="text-lg" />
                                <span>Call Directly</span>
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="relative my-7 sm:my-8 flex items-center justify-center max-w-xs mx-auto">
                            <div className="w-full border-t border-gray-300"></div>
                            <span className="absolute bg-[#fffbfa] px-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                or email us
                            </span>
                        </div>

                        {/* Quick Inquiry Form */}
                        <form onSubmit={handleEmailSubmit} className="space-y-2.5">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl sm:rounded-full border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#8b2c3c] focus:ring-1 focus:ring-[#8b2c3c] transition-all shadow-xs"
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-full bg-[#5a1e2b] text-white font-semibold text-sm hover:bg-[#3d141d] transition-all duration-200 shadow-sm cursor-pointer shrink-0 disabled:opacity-70"
                                >
                                    <FiSend className="w-4 h-4 text-rose-200" />
                                    <span>Send Inquiry</span>
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Any specific ceremony, theme, or idea in mind? (optional)"
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl sm:rounded-full border border-gray-200 bg-white/90 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#8b2c3c] transition-all"
                            />
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* COMPARISON TABLE SECTION */}
            <section className="bg-[#fff9fa] border-t border-[#f4e2e5] py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs uppercase tracking-widest text-[#8b2c3c] font-bold mb-2 block">
                            COMPARISON
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#4a1823]">
                            Ready Templates vs. Custom Designs
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                            Not sure which one is right for your celebration? Here is a quick breakdown.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-[#ebd8dc] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-[#4a1823] text-white">
                                        <th className="py-4 px-5 font-semibold">Feature</th>
                                        <th className="py-4 px-5 font-semibold text-gray-300">Ready Templates</th>
                                        <th className="py-4 px-5 font-semibold text-[#ffd1dc]">
                                            Custom Invites ✦
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f2e7e9]">
                                    {COMPARISON_DATA.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                                            <td className="py-4 px-5 font-semibold text-gray-900">{row.feature}</td>
                                            <td className="py-4 px-5 text-gray-600">{row.ready}</td>
                                            <td className="py-4 px-5 text-[#8b2c3c] font-semibold bg-[#fff5f7]">
                                                {row.custom}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-widest text-[#8b2c3c] font-bold mb-2 block">
                        COMMON QUESTIONS
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#4a1823]">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-3.5">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openFaq === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                                        ? "bg-[#fff5f7] border-[#8b2c3c]/40 shadow-xs"
                                        : "bg-white border-gray-200 hover:border-[#8b2c3c]/30"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                                >
                                    <span className="text-base sm:text-lg font-bold text-gray-900">{faq.q}</span>
                                    <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-[#8b2c3c] text-white" : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        <FiChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-[#f4e2e5] pt-3">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Callout */}
                <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#5a1e2b] to-[#8b2c3c] text-white text-center shadow-xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 max-w-xl mx-auto">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to bring your dream invite to life?</h3>
                        <p className="text-rose-100 text-sm sm:text-base mb-6">
                            Chat directly with our creative team on WhatsApp and get your customized quote today.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold text-base shadow-lg transition-transform hover:scale-105"
                        >
                            <FaWhatsapp className="text-2xl" />
                            <span>Start on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
