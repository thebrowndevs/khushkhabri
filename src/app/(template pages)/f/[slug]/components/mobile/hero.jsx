"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import HeroTop from "./HeroTop";
import HeroBottom from "./HeroBottom";
import FloatingIcons from "./FloatingIcons";
import Image from "next/image";

export default function Hero({ invitation }) {
    const { bride, groom } = invitation?.weddingDetails || {};
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative w-full font-serif h-fit max-h-[1800px] overflow-hidden">

            {/* ✅ MAIN IMAGE (NOT BACKGROUND) */}
            {/* <img
                src="/templates/floral/hero2.png"
                alt="bg"
                className="w-full h-auto object-cover"
            /> */}
            <Image
                src="/templates/floral/hero2.webp"
                alt="bg"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
            />

            {/* ✅ OVERLAY CONTENT */}
            <div className="absolute inset-0 z-10 flex flex-col">

                <HeroTop bride={bride} groom={groom} side={invitation?.weddingDetails?.side} />
                <HeroBottom invitation={invitation} />


            </div>

        </section>
    );
}