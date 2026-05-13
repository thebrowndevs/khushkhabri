"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function MidIcons() {
    const { scrollY } = useScroll();
    const smooth = useSpring(scrollY, { stiffness: 50, damping: 22 });

    const icons = [
        { left: "8%", top: "15%" }, { left: "26%", top: "28%" },
        { left: "44%", top: "18%" }, { left: "62%", top: "30%" },
        { left: "79%", top: "22%" }, { left: "91%", top: "34%" },

        { left: "12%", top: "48%" }, { left: "30%", top: "54%" },
        { left: "47%", top: "42%" }, { left: "64%", top: "57%" },
        { left: "81%", top: "49%" },

        { left: "18%", top: "72%" }, { left: "39%", top: "68%" },
        { left: "59%", top: "75%" }, { left: "83%", top: "70%" },
    ];

    return icons.map((icon, i) => {
        const y = useTransform(smooth, [-500, 0, 500], [-120, 0, 80]);
        const rotate = -25 + Math.random() * 50;

        return (
            <motion.img
                key={i}
                src="/icons/34.webp"
                style={{
                    position: "absolute",
                    left: icon.left,
                    top: icon.top,
                    width: "38px",
                    y,
                    rotate,
                    opacity: 0.6,
                }}
            />
        );
    });
}