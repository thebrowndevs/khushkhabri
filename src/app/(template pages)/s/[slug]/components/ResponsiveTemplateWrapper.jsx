// components/ResponsiveTemplateWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SikhTemplateMobile from "./mobile/SikhTemplateMobile";
import SikhTemplateDesktop from "./desktop/SikhTemplateDesktop";
import MusicPlayer from "@/components/MusicPlayer";

export default function ResponsiveTemplateWrapper(props) {
    const [isMobile, setIsMobile] = useState(null);
    const hasMusic = !!props.invitation?.mainDetails?.musicUrl;
    const [showPopup, setShowPopup] = useState(hasMusic);
    const [forcePlay, setForcePlay] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 700);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const handleOpen = () => {
        setShowPopup(false);
        setForcePlay(true);
    };

    if (isMobile === null) return null; // prevent hydration mismatch

    const { bride, groom, side } = props.invitation?.weddingDetails || {};

    return (
        <>
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-gradient-to-br from-[#0b1a30]/80 via-[#0a182b]/85 to-[#050c18]/90 backdrop-blur-[6px] px-6 font-serif overflow-hidden"
                    >
                        <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center">
                            
                            {/* Left Decorative Card */}
                            <motion.div
                                initial={{ x: -350, y: 15, rotate: -25, opacity: 0 }}
                                animate={{ x: -14, y: 4, rotate: -6, opacity: 1 }}
                                exit={{ x: -500, y: -30, rotate: -35, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.1 }}
                                className="absolute w-full h-full border border-[#D1CBA9]/10 rounded-[24px] bg-[#0b1a30]/40 backdrop-blur-md shadow-xl pointer-events-none z-0"
                            >
                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#D1CBA9]/15 rounded-[18px]" />
                            </motion.div>

                            {/* Right Decorative Card */}
                            <motion.div
                                initial={{ x: 350, y: 15, rotate: 25, opacity: 0 }}
                                animate={{ x: 14, y: 4, rotate: 6, opacity: 1 }}
                                exit={{ x: 500, y: -30, rotate: 35, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.1 }}
                                className="absolute w-full h-full border border-[#D1CBA9]/10 rounded-[24px] bg-[#0b1a30]/40 backdrop-blur-md shadow-xl pointer-events-none z-0"
                            >
                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#D1CBA9]/15 rounded-[18px]" />
                            </motion.div>

                            {/* Main Content Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85, y: 60 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -80 }}
                                transition={{ type: "spring", stiffness: 70, damping: 15 }}
                                className="relative w-full h-full border border-[#D1CBA9]/20 rounded-[24px] p-8 text-center bg-[#0b1a30]/75 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-6 z-10"
                            >
                                {/* Golden Ornament Frame Details */}
                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#D1CBA9]/25 rounded-[18px] pointer-events-none" />

                                <img
                                    src="/templates/sikh/onkar.png"
                                    alt="symbol"
                                    className="w-16 h-auto opacity-90 filter drop-shadow-[0_2px_8px_rgba(209,203,169,0.3)]"
                                />

                                <h2 className="text-[#D1CBA9] text-4xl sm:text-5xl font-script tracking-wide leading-tight drop-shadow-md">
                                    {side === 'bride' ? (
                                        <>
                                            {bride?.name ? bride.name.split(' ')[0] : 'Bride'} <br />
                                            <span className="text-white text-3xl font-sans font-light">weds</span> <br />
                                            {groom?.name ? groom.name.split(' ')[0] : 'Groom'}
                                        </>
                                    ) : (
                                        <>
                                            {groom?.name ? groom.name.split(' ')[0] : 'Groom'} <br />
                                            <span className="text-white text-3xl font-sans font-light">weds</span> <br />
                                            {bride?.name ? bride.name.split(' ')[0] : 'Bride'}
                                        </>
                                    )}
                                </h2>

                                <button
                                    onClick={handleOpen}
                                    className="px-8 py-3 bg-gradient-to-r from-[#D1CBA9] to-[#bca674] hover:from-[#e3ddbb] hover:to-[#cbba8f] text-gray-900 rounded-full font-sans font-semibold text-base tracking-wide transition-all duration-300 transform active:scale-95 shadow-lg active:shadow-md mt-2"
                                >
                                    Open Invitation
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isMobile ? (
                <SikhTemplateMobile {...props} />
            ) : (
                <div className="min-h-screen w-full"
                    style={{
                        backgroundImage: `url('/bg/pinkbg.webp')`,
                        backgroundPosition: "top",
                        backgroundAttachment: "fixed",
                        backgroundColor: '#FFEAED'
                    }}>
                    <div className="w-full max-w-[940px] mx-auto">
                        <SikhTemplateDesktop {...props} />
                    </div>
                </div>
            )}
            <MusicPlayer url={props.invitation?.mainDetails?.musicUrl} forcePlay={forcePlay} />
        </>
    );
}