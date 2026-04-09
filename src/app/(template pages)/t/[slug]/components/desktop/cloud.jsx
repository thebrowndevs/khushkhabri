"use client";
import { motion } from "framer-motion";

export default function Cloud({ isLeft, index, layer = 1 }) {

    const initialX = isLeft ? -120 : 120;

    // 🧠 Size variation based on layer (depth illusion)
    const baseSize = layer === 1 ? 220 : layer === 2 ? 180 : 140;
    const size = baseSize + (index * 10);

    // 🧠 Horizontal spread
    const leftPos = isLeft ? `${(index % 4) * 22}%` : "auto";
    const rightPos = !isLeft ? `${(index % 4) * 22}%` : "auto";

    // 🧠 Vertical layering (main magic)
    const bottomBase =
        layer === 1 ? -5 :
            layer === 2 ? 10 :
                25;

    const bottomPos = `${bottomBase + (index % 3) * 6}%`;

    return (
        <motion.img
            src="/templates/temple/cloud.png"
            alt="cloud"
            className="absolute object-contain pointer-events-none z-20"
            style={{
                width: size,
                left: leftPos !== "auto" ? leftPos : undefined,
                right: rightPos !== "auto" ? rightPos : undefined,
                bottom: bottomPos,
                opacity: layer === 3 ? 0.6 : layer === 2 ? 0.75 : 0.9, // depth fade
            }}

            initial={{ x: initialX, opacity: 0 }}

            whileInView={{
                x: [initialX, isLeft ? 10 : -10, isLeft ? -8 : 8, 0],
                opacity: 1,
            }}

            transition={{
                opacity: { duration: 2, delay: index * 0.15 },

                // 🐢 MUCH SLOWER FLOATING
                x: {
                    duration: 6 + index * 0.8,  // earlier 4 tha → now double slow
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }
            }}

            viewport={{ once: false, amount: 0.2 }}
        />
    );
}