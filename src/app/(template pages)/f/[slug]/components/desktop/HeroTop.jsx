"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingIcons from "./FloatingIcons";
import BackIcons from "./BackIcons";
import MidIcons from "./MidIcons";
import FrontIcons from "./FrontIcons";

export default function HeroTop({ bride, groom, side }) {
    const { scrollY } = useScroll();

    const textY = useTransform(scrollY, [0, 500], [0, 160]);

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.25,
            },
        },
    };

    const item = {
        hidden: {
            y: 60,
            opacity: 0,
            rotate: -5,
        },
        show: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };
    const firstName = side === 'groom' ? groom?.name : bride?.name;
    const secondName = side === 'groom' ? bride?.name : groom?.name;

    console.log(firstName, secondName);
    return (
        <section className="relative h-[90vh] flex items-start justify-center text-center pt-[8%]">
            <div className="absolute top-0 left-0 w-full h-[120vh] z-0 overflow-visible pointer-events-none">
                <BackIcons />
                <MidIcons />
                <FrontIcons />
            </div>
            <motion.div
                style={{ y: textY }}
                variants={container}
                initial="hidden"
                animate="show"
                className="z-10"
            >
                <motion.h1 variants={item} className="text-white text-7xl font-script">
                    {firstName?.split(' ')[0] || (side === 'groom' ? 'Groom' : 'Bride')}
                </motion.h1>

                <motion.p variants={item} className="text-white text-2xl mt-2 font-script">
                    weds
                </motion.p>

                <motion.h2 variants={item} className="text-white text-7xl mt-2 font-script">
                    {secondName?.split(' ')[0] || (side === 'groom' ? 'Bride' : 'Groom')}
                </motion.h2>
            </motion.div>

        </section>
    );
}