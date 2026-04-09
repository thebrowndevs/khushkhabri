"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FloatingIcons from "./FloatingIcons";

export default function Hero({ invitation }) {
    const { bride, groom, side } = invitation?.weddingDetails || {};
    const containerRef = useRef(null);

    const { scrollY } = useScroll();
    const slowY = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <section ref={containerRef} className="relative w-full overflow-visible font-serif ">
            {/* Background Image WITHOUT Parallax */}
            <div className="w-full h-full overflow-hidden">
                <img
                    src="/templates/sikh/hero2.png"
                    alt="invitation background"
                    className="w-full h-full object-cover object-top scale-100 md:scale-110"
                />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center text-center px-4 z-10">

                {/* 🔥 ICONS BEHIND TEXT */}
                <div className="absolute inset-0 z-0">
                    <FloatingIcons slowY={slowY} />
                </div>
                <div className="mt-20" />

                <motion.div style={{ y: slowY }} className="flex flex-col items-center relative z-10">
                    <h1
                        className="text-white text-7xl md:text-8xl font-light tracking-wide font-script"
                    >
                        {bride?.name?.split(' ')[0] || 'Bride'}
                    </h1>

                    <p
                        className="text-white text-xl md:text-4xl mt-2 font-script"
                    >
                        weds
                    </p>

                    <h2
                        className="text-white text-7xl md:text-8xl mt-2 font-script"
                    >
                        {groom?.name?.split(' ')[0] || 'Groom'}
                    </h2>

                </motion.div>

                <div className="h-[32%]" />

                <img
                    src="/templates/sikh/khanda.png"
                    alt="khanda"
                    className="w-auto h-45 mb-12"
                />

                <div
                    className="w-full px-6 text-center text-white space-y-5"
                >

                    <p className="text-2xl tracking-wide">
                        {side === 'groom' ? (
                            <>
                                Sardar {groom?.father || 'Father'} &<br />
                                Sardami {groom?.mother || 'Mother'}
                            </>
                        ) : (
                            <>
                                Sardar {bride?.father || 'Father'} &<br />
                                Sardami {bride?.mother || 'Mother'}
                            </>
                        )}
                    </p>

                    <h2 className="text-6xl my-9 font-script italic">
                        Invites you
                    </h2>

                    <p className="text-lg mb-8">
                        to join the wedding celebration of<br />
                        their {side === 'groom' ? 'son' : 'daughter'}
                    </p>

                    <h3 className="text-6xl mt-5 font-light font-script">
                        {side === 'groom' ? groom?.name : bride?.name}
                    </h3>

                    <p className="text-lg mt-0">with</p>

                    <h3 className="text-6xl mt-1 font-script">
                        {side === 'groom' ? bride?.name : groom?.name}
                    </h3>

                    <p className="text-lg mt-4">
                        {side === 'groom' ? 'daughter of' : 'son of'}
                    </p>

                    <p className="text-2xl mt-1 ">
                        {side === 'groom' ? (
                            <>
                                Sardar {bride?.father || 'Father'} &<br />
                                Sardami {bride?.mother || 'Mother'}
                            </>
                        ) : (
                            <>
                                Sardar {groom?.father || 'Father'} &<br />
                                Sardami {groom?.mother || 'Mother'}
                            </>
                        )}
                    </p>

                </div>
            </div>
            {/* Temple full width overlap */}
            <motion.div
                initial={{ opacity: 1, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute bottom-[-170px] left-0 w-full z-50"
            >
                <img
                    src="/templates/sikh/temple.png"
                    alt="temple"
                    className="w-full object-contain"
                />
            </motion.div>
        </section>
    );
}