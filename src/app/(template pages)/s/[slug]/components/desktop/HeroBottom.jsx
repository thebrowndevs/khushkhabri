"use client";
import { motion } from "framer-motion";

export default function HeroBottom({ invitation }) {
    const { bride, groom, side } = invitation?.weddingDetails || {};

    // 🔥 container stagger
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.3,
            },
        },
    };

    // 💎 smooth cinematic animation
    const item = {
        hidden: {
            opacity: 0,
            y: 40,
            filter: "blur(6px)",
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // premium easing
            },
        },
    };

    return (
        <section className="absolute bottom-[3%] left-0 w-full pb-10 text-center text-white px-6">

            {/* 🔥 khanda animation */}
            <motion.img
                src="/templates/sikh/khanda.png"
                alt="khanda"
                className="w-auto h-36 mx-auto mb-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: false }}
            />

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-100px" }}
                className="space-y-7"
            >

                <motion.p variants={item} className="text-xl leading-relaxed">
                    {side === 'groom' ? (
                        <>
                            Sardar {groom?.father} <br />
                            Sardani {groom?.mother}
                        </>
                    ) : (
                        <>
                            Sardar {bride?.father} <br />
                            Sardani {bride?.mother}
                        </>
                    )}
                </motion.p>

                <motion.h2 variants={item} className="text-5xl font-script italic tracking-wide">
                    Invites you
                </motion.h2>

                <motion.p variants={item} className="text-lg leading-relaxed">
                    to join the wedding celebration of their{" "}
                    {side === 'groom' ? 'son' : 'daughter'}
                </motion.p>

                <motion.h3 variants={item} className="text-5xl font-script tracking-wide">
                    {side === 'groom' ? groom?.name : bride?.name}
                </motion.h3>

                <motion.p variants={item} className="text-lg">
                    with
                </motion.p>

                <motion.h3 variants={item} className="text-5xl font-script tracking-wide">
                    {side === 'groom' ? bride?.name : groom?.name}
                </motion.h3>

                <motion.p variants={item} className="text-lg mt-4">
                    {side === 'groom' ? 'daughter of' : 'son of'}
                </motion.p>

                <motion.p variants={item} className="text-2xl leading-relaxed">
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
                </motion.p>

            </motion.div>
        </section>
    );
}