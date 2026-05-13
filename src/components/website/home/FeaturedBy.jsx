"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const logos = [
    "/newsLogo/1.webp",
    "/newsLogo/2.webp",
    "/newsLogo/3.webp",
    "/newsLogo/4.webp",
    "/newsLogo/5.webp",
    "/newsLogo/6.webp",
    "/newsLogo/7.webp",
    "/newsLogo/8.webp",
    "/newsLogo/9.webp",
    "/newsLogo/10.webp",
];

const FeaturedBy = () => {
    return (
        <section className="w-full bg-white/30 backdrop-blur-sm py-12 md:py-16 overflow-hidden border-y border-white/50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-center text-gray-500 font-medium mb-12 tracking-widest uppercase text-xs md:text-sm">
                    Trusted & Featured By
                </h2>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, FreeMode]}
                        spaceBetween={60}
                        slidesPerView={2}
                        loop={true}
                        speed={5000}
                        freeMode={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: true, // Left to right
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 80,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 100,
                            },
                        }}
                        className="logo-swiper"
                    >
                        {logos.map((logo, index) => (
                            <SwiperSlide key={index} className="!flex items-center justify-center">
                                <div className="relative w-32 md:w-44 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-in-out cursor-default">
                                    <Image
                                        src={logo}
                                        alt={`Featured Logo ${index + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .logo-swiper .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
            `}</style>
        </section>
    );
};

export default FeaturedBy;
