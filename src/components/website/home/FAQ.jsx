"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const weddingFaqs = [
    {
        question: "How do I create my digital invitation?",
        ans: "Simply choose a theme, enter your wedding details (names, date, venue), and your invitation website is ready instantly. It’s as easy as filling a simple form—most people finish in under 10 minutes and can share it right away with loved ones."
    },
    {
        question: "Can I customize the themes?",
        ans: "Your own photos, and even for more customizatoon you can contact us directly on whatsapp at +91 9990440099."
    },
    {
        question: "Is it possible to add music to the invitation?",
        ans: "Absolutely. You can select from our curated library of romantic background music or upload your favorite track to play when guests open your link."
    },
    {
        question: "How do I share the invitation with guests?",
        ans: "Once your invitation is ready, you'll get a unique link. You can share this link via WhatsApp, Email, or any social media platform effortlessly."
    },
    {
        question: "Are the invitations mobile-friendly?",
        ans: "Every invitation we create is fully responsive. They look beautiful on smartphones, tablets, and desktops, ensuring a great experience for all your guests."
    },
    {
        question: "How long does the invitation website stay active?",
        ans: "Your website remains active for up to one year after your wedding date, allowing you to share post-wedding photos and videos as well."
    },
    {
        question: "Can I add a location map for the venue?",
        ans: "Yes, you can integrate Google Maps links for all your venues, making it incredibly easy for guests to navigate to the wedding locations."
    },
    {
        question: "Do you offer support if I have trouble?",
        ans: "Our support team is available via WhatsApp and Email to help you with any technical issues or customization requests you might have."
    },
    {
        question: "Is my data secure?",
        ans: "We take privacy seriously. Your personal details and your guests' RSVP information are stored securely and are never shared with third parties."
    },
    {
        question: "Will this open like a website?",
        ans: "Yes. Once published your guests will be able to see your invite like a dynamic website: Interactable, complete with links to venue location, RSVP, and wedding Instagram."
    },
    {
        question: "What if I want to split guests by event?",
        ans: "The template has an easy provision to create as many event combinations as you need. That way you'll be able to call separate guests to separate events."
    },
    {
        question: "Do I need to know coding to use this?",
        ans: "Short Answer: Not at all. If you can use Canva or Instagram, you’ll find Framer as easy."
    },
    {
        question: "How long does it take to edit the invite?",
        ans: "Editing and sharing is super simple—just like filling a form. Add names, family details, events, photos, and links, and you’re ready to go. Most couples finish in just 10–20 minutes."
    },
    {
        question: "How do I get started?",
        ans: "We provide an 3 minute+ tutorial video to get you started. In brief - You can start with just a computer. Click the template link in your email after purchase—Then click on the tutorial video link in from the same email and simply follow the steps. Sign up, add your photos and text, and hit publish. It’s all free and fully editable—anytime & anywhere."
    },
    {
        question: "How do my guests view the invite?",
        ans: "Like they view any website—on their phone’s browser, Safari, Chrome or whatever. It opens beautifully like a website on any device."
    },
    {
        question: "Can I make changes after sharing?",
        ans: "Short Answer: Absolutely. Change anything – venue, timings, any link – even after it’s published, and it updates for everyone instantly, no need to re-share the invite."
    },
    {
        question: "What’s the refund policy?",
        ans: "Because this is a digital product, all sales are final and non-refundable. Please review the details carefully before purchasing. If you have any questions, feel free to contact us before placing your order."
    }
];

const floatingIcons = [
    { id: 211, src: "/icons/21.webp", top: "5%", left: "4%", size: "w-16 h-16 md:w-24 md:h-24", delay: 0 },
    { id: 212, src: "/icons/21.webp", bottom: "21%", right: "5%", size: "w-14 h-14 md:w-20 md:h-20", delay: 2 },
    { id: 221, src: "/icons/22.webp", top: "15%", right: "4%", size: "w-14 h-14 md:w-22 md:h-22", delay: 1.5 },
    { id: 222, src: "/icons/22.webp", bottom: "40%", left: "3%", size: "w-12 h-12 md:w-18 md:h-18", delay: 3.5 },
    { id: 231, src: "/icons/23.webp", bottom: "5%", left: "6%", size: "w-20 h-20 md:w-28 md:h-28", delay: 3 },
    { id: 232, src: "/icons/23.webp", top: "40%", right: "5%", size: "w-16 h-16 md:w-24 md:h-24", delay: 1 },
    { id: 241, src: "/icons/24.webp", bottom: "5%", right: "6%", size: "w-16 h-16 md:w-24 md:h-24", delay: 0.5 },
    { id: 242, src: "/icons/24.webp", top: "30%", left: "12%", size: "w-14 h-14 md:w-20 md:h-20", delay: 2.5 },
    { id: 251, src: "/icons/25.webp", top: "55%", right: "11%", size: "w-14 h-14 md:w-22 md:h-22", delay: 2.2 },
    { id: 252, src: "/icons/25.webp", bottom: "20%", left: "5%", size: "w-12 h-12 md:w-18 md:h-18", delay: 0.8 },
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="relative w-full pb-12 md:pb-20 z-10 pt-5 overflow-hidden">

            {/* Floating Icons */}
            {floatingIcons.map((icon) => (
                <motion.div
                    key={icon.id}
                    className={`absolute ${icon.size} opacity-40 pointer-events-none hidden md:block`}
                    style={{
                        top: icon.top,
                        left: icon.left,
                        right: icon.right,
                        bottom: icon.bottom
                    }}
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: icon.delay,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src={icon.src}
                        alt="decorative icon"
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                    />
                </motion.div>
            ))}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Heading */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-[#5a1e2b] mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-700 font-medium"
                    >
                        Everything you need to know about your special day's digital invite
                    </motion.p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {weddingFaqs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="overflow-hidden"
                        >
                            <div
                                className={`group bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/90 ${openIndex === index ? "shadow-md ring-1 ring-[#e7d3d7]" : "shadow-sm"
                                    }`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                {/* Question */}
                                <div className="flex justify-between items-center px-6 py-5">
                                    <h3 className={`font-semibold text-lg transition-colors duration-300 ${openIndex === index ? "text-[#7a2535]" : "text-gray-800"
                                        }`}>
                                        {item.question}
                                    </h3>
                                    <div className={`p-1 rounded-full transition-all duration-300 ${openIndex === index ? "bg-[#7a2535] text-white rotate-180" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-1 text-gray-600 leading-relaxed text-base">
                                                {item.ans}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
