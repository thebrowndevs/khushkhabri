"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroBottom({ invitation }) {
    const { bride, groom, side } = invitation?.weddingDetails || {};

    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            controls.start("show");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

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
        <section className="absolute bottom-[2%] left-0 w-full pb-10 text-center text-white px-6">
            <motion.img
                src="/templates/floral/gm.png"
                alt="gm"
                className="w-auto h-25 mx-auto mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: false }}
            />
            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={controls}
                className="space-y-7"
            >

                <motion.p variants={item} className="text-2xl leading-relaxed">
                    {side === 'groom' ? (
                        <>
                            Mr {groom?.father} &<br />
                            Mrs {groom?.mother}
                        </>
                    ) : (
                        <>
                            Mr {bride?.father} &<br />
                            Mrs {bride?.mother}
                        </>
                    )}
                </motion.p>

                <motion.h2 variants={item} className="text-5xl font-script italic tracking-wide">
                    Invites you
                </motion.h2>

                <motion.p variants={item} className="text-lg leading-relaxed">
                    to join the Engagement Ceremony of their{" "}
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
                            Mr {bride?.father || 'Father'} &<br />
                            Mrs {bride?.mother || 'Mother'}
                        </>
                    ) : (
                        <>
                            Mr {groom?.father || 'Father'} &<br />
                            Mrs {groom?.mother || 'Mother'}
                        </>
                    )}
                </motion.p>

            </motion.div>
        </section>
    );
}