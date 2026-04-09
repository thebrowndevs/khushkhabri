"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function BackIcons() {
    const { scrollY } = useScroll();
    const smooth = useSpring(scrollY, { stiffness: 35, damping: 28 });

    const icons = [
        { left: "3%", top: "7%" }, { left: "17%", top: "3%" },
        { left: "29%", top: "11%" }, { left: "46%", top: "5%" },
        { left: "61%", top: "9%" }, { left: "77%", top: "4%" },
        { left: "92%", top: "8%" },

        { left: "6%", top: "23%" }, { left: "21%", top: "19%" },
        { left: "38%", top: "25%" }, { left: "53%", top: "21%" },
        { left: "69%", top: "26%" }, { left: "85%", top: "20%" },

        { left: "4%", top: "41%" }, { left: "24%", top: "38%" },
        { left: "41%", top: "45%" }, { left: "58%", top: "40%" },
        { left: "73%", top: "44%" }, { left: "91%", top: "39%" },

        { left: "14%", top: "58%" }, { left: "34%", top: "63%" },
    ];

    const iconTypes = ["/icons/3.png", "/icons/34.png"];

    return icons.map((icon, i) => {
        const y = useTransform(smooth, [-500, 0, 500], [-200, 0, 100]);

        // 🔥 balanced mix (not fully random)
        const src = iconTypes[i % 2];

        // slight variation for natural feel
        const rotate = -25 + (i * 7 % 50);
        const scale = 0.9 + (i % 3) * 0.15;

        return (
            <motion.img
                key={i}
                src={src}
                style={{
                    position: "absolute",
                    left: icon.left,
                    top: icon.top,
                    width: "20px",
                    y,
                    rotate,
                    scale,
                    opacity: 0.35,
                }}
            />
        );
    });
}