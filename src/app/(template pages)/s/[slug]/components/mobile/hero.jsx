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
        <section ref={containerRef} className="relative w-full font-serif h-fit max-h-[2200px] overflow-hidden">

            {/* ✅ MAIN IMAGE (NOT BACKGROUND) */}
            <Image
                src="/templates/sikh/hero24.webp"
                alt="bg"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
                quality={75}
                sizes="100vw"
            />

            {/* ✅ OVERLAY CONTENT */}
            <div className="absolute inset-0 z-10 flex flex-col">

                <HeroTop bride={bride} groom={groom} side={invitation?.weddingDetails?.side} />
                <HeroBottom invitation={invitation} />


            </div>

        </section>
    );
}