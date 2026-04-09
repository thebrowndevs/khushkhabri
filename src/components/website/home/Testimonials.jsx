"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Testimonials({ testimonials }) {
    return (
        <section className="relative w-full pb-16 md:pb-24 pt-8 sm:pt-10 overflow-hidden z-20">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

                {/* Heading */}
                <div className="text-center mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-3xl md:text-5xl font-bold text-[#5a1e2b] mb-4 tracking-tight"
                    >
                        Real Stories from Happy Customers
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-gray-700 text-lg md:text-xl font-medium max-w-2xl mx-auto"
                    >
                        Hear directly from people who trusted us with their special moments
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        speed={1000}
                        autoplay={{ delay: 5000, disableOnInteraction: true }}
                        pagination={{
                            clickable: true,
                            el: ".testimonial-pagination",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                        }}
                        className="pb-4"
                    >
                        {testimonials.map((t, idx) => {
                            return (
                                <SwiperSlide key={idx} className="h-auto">
                                    <div className="bg-white/80 backdrop-blur-md border border-white duration-300 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-6 h-full items-stretch min-h-[380px] sm:min-h-[320px]">

                                        {/* TESTIMONIAL PHOTO 
                                            Supports Aspect Ratio: 3:4 (Portrait)
                                        */}
                                        <div className="w-full sm:w-[38%] aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative shadow-sm">
                                            {t.thumbnail ? (
                                                <Image 
                                                    src={t.thumbnail} 
                                                    alt="Testimonial photo" 
                                                    fill 
                                                    className="object-cover" 
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium bg-gray-50 uppercase tracking-widest text-xs">
                                                    khushkhabari
                                                </div>
                                            )}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex flex-col justify-between w-full sm:w-[62%] gap-4">

                                            <div>
                                                {/* Stars */}
                                                <div className="flex gap-1 mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className="text-[#f59e0b] text-sm" />
                                                    ))}
                                                </div>

                                                {/* Message */}
                                                <p className="text-gray-700 text-sm xl:text-base leading-relaxed italic line-clamp-[8] sm:line-clamp-[10]">
                                                    "{t.message}"
                                                </p>
                                            </div>

                                            {/* BOTTOM PROFILE */}
                                            <div className="mt-4 pt-4 border-t border-gray-200/60 flex items-center gap-4">
                                                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#fff0f3] shadow-sm flex-shrink-0">
                                                    <Image
                                                        src={t.image || "/avatar.jpg"}
                                                        alt={t.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <h4 className="text-base font-bold text-[#5a1e2b] leading-tight mb-0.5">
                                                        {t.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                                        {t.place}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <div className="testimonial-pagination mt-8 flex justify-center gap-2"></div>
                </motion.div>
            </div>
        </section>
    );
}