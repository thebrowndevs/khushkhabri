"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function FrontIcons() {
    const { scrollY } = useScroll();
    const smooth = useSpring(scrollY, { stiffness: 65, damping: 18 });

    const icons = [
        // 🔝 top (rare but important for mix feel)
        // { left: "12%", top: "10%" },
        { left: "82%", top: "14%" },

        // 🔼 upper mid
        { left: "5%", top: "30%" },
        // { left: "65%", top: "35%" },

        // 🔁 middle (text avoid but slight overlap ok)
        { left: "25%", top: "50%" },
        { left: "85%", top: "55%" },

        // 🔽 lower mid
        // { left: "10%", top: "70%" },
        { left: "55%", top: "72%" },

        // 🔻 bottom (visual weight)
        { left: "30%", top: "88%" },
        { left: "78%", top: "92%" },
    ];

    return icons.map((icon, i) => {
        const y = useTransform(
            smooth,
            [-500, 0, 500],
            [250, 0, -100] // correct direction
        );

        const rotate = -25 + Math.random() * 50;

        return (
            <motion.img
                key={i}
                src="/icons/34.png"
                style={{
                    position: "absolute",
                    left: icon.left,
                    top: icon.top,
                    width: "70px",
                    y,
                    rotate,
                    opacity: 0.9,
                }}
            />
        );
    });
}