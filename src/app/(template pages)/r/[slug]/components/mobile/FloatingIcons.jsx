    "use client";
    import { motion, useScroll, useTransform, useSpring } from "framer-motion";

    export default function FloatingIcons() {
        const { scrollY } = useScroll();

        const smoothScroll = useSpring(scrollY, {
            stiffness: 50,
            damping: 20,
        });

        const ICON_SIZE = 48; // 🔥 fixed size

        const icons = [
            // 🔝 TOP LAYER (dense spread)
            { left: "10%", top: "5%", rotate: -10, depth: 0.3 },
            { left: "30%", top: "8%", rotate: 12, depth: 0.3 },
            { left: "55%", top: "6%", rotate: -8, depth: 0.3 },
            { left: "80%", top: "10%", rotate: 10, depth: 0.3 },

            // 🔼 UPPER MID (diagonal flow)
            { left: "5%", top: "18%", rotate: -15, depth: 0.5 },
            { left: "25%", top: "22%", rotate: 8, depth: 0.5 },
            { left: "50%", top: "20%", rotate: -6, depth: 0.5 },
            { left: "75%", top: "24%", rotate: 14, depth: 0.5 },
            { left: "90%", top: "18%", rotate: -12, depth: 0.5 },

            // 🔁 CENTER (controlled but not empty)
            { left: "15%", top: "35%", rotate: 10, depth: 0.7 },
            { left: "35%", top: "38%", rotate: -8, depth: 0.7 },
            { left: "60%", top: "36%", rotate: 6, depth: 0.7 },
            { left: "82%", top: "40%", rotate: -10, depth: 0.7 },

            // 🔽 LOWER MID (more depth)
            { left: "8%", top: "55%", rotate: -12, depth: 0.9 },
            { left: "28%", top: "58%", rotate: 9, depth: 0.9 },
            { left: "52%", top: "56%", rotate: -6, depth: 0.9 },
            { left: "78%", top: "60%", rotate: 11, depth: 0.9 },

            // 🔻 BOTTOM (big visual weight)
            { left: "12%", top: "75%", rotate: 8, depth: 1.1 },
            { left: "38%", top: "78%", rotate: -10, depth: 1.1 },
            { left: "65%", top: "76%", rotate: 12, depth: 1.1 },
            { left: "85%", top: "82%", rotate: -6, depth: 1.1 },

            // 🔥 EXTRA floating randomness (like image)
            { left: "20%", top: "48%", rotate: -5, depth: 0.8 },
            { left: "70%", top: "50%", rotate: 7, depth: 0.8 },
        ];
        return (
            <>
                {icons.map((icon, i) => {

                const y = useTransform(
        smoothScroll,
        [-500, 0, 500], 
        [-80 * icon.depth, 0, 80 * icon.depth]
    );
                    return (
                        <motion.img
                            key={i}
                            src="/icons/34.webp"
                            initial={{
                                y: 80,
                                opacity: 0,
                                rotate: icon.rotate - 8,
                            }}
                            animate={{
                                y: 0,
                                opacity: 0.7,
                                rotate: icon.rotate,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.05, // 🔥 nice stagger
                                ease: "easeOut",
                            }}
                            style={{
                                position: "absolute",
                                left: icon.left,
                                top: icon.top,
                                width: `${ICON_SIZE}px`,
                                y,
                            }}
                            className="pointer-events-none"
                        />
                    );
                })}
            </>
        );
    }