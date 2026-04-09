"use client";
import { motion } from "framer-motion";

export default function MediaFrame({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg"
        >
            {children}
        </motion.div>
    );
}
