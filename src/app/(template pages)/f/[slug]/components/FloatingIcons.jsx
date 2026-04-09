"use client";
import { motion } from "framer-motion";

export default function FloatingIcons({ count = 10, icons = [1, 2, 3, 4, 5], sectionId }) {
    // Generate random positions and animations
    const floatingElements = [...Array(count)].map((_, i) => ({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
        size: 20 + Math.random() * 30,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {floatingElements.map((el) => (
                <motion.img
                    key={`${sectionId}-${el.id}`}
                    src={`/icons/${el.icon}.png`}
                    alt="floating icon"
                    className="absolute opacity-20"
                    style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        width: el.size,
                        height: "auto",
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: el.delay,
                    }}
                />
            ))}
        </div>
    );
}
