"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function GallerySection({ invitation }) {
    const { bride, groom } = invitation?.weddingDetails || {};

    const preWeddingPhotos = invitation?.mainDetails?.preWeddingPhotos || [];
    const showPreWeddingPhotos = invitation?.mainDetails?.showPreWeddingPhotos ?? true;
    const weddingVideo = invitation?.mainDetails?.weddingVideo;
    const showWeddingVideo = invitation?.mainDetails?.showWeddingVideo ?? true;

    const defaultImages = [
        "/templates/sikh/couple1.jpeg",
        "/templates/sikh/couple2.jpeg",
        "/templates/sikh/couple3.jpeg",
        "/templates/sikh/couple2.jpeg",
        "/templates/sikh/couple1.jpeg",
    ];

    const images = preWeddingPhotos.length > 0 ? preWeddingPhotos : defaultImages;

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(weddingVideo);

    return (
        <section className="relative w-full overflow-visible font-serif">

            <div
                className="pt-55 pb-55 bg-cover bg-center bg-no-repeat text-center"
                style={{
                    backgroundImage: "url('/bg/darkBlue3.png')",
                }}
            >

                {showPreWeddingPhotos && (
                    <>
                        {/* ===== Heading ===== */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <p className="text-white text-2xl italic">
                                Meet the
                            </p>

                            <h2 className="text-white text-6xl font-script mt-5">
                                Bride & Groom
                            </h2>
                        </motion.div>

                        {/* ===== SLIDER ===== */}
                        <div className="mt-10 px-0">

                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1.2}
                                centeredSlides={true}
                                loop={images.length > 1}
                                grabCursor={true}

                                autoplay={{
                                    delay: 2500, // auto move
                                    disableOnInteraction: false,
                                }}

                                pagination={{
                                    clickable: true,
                                }}
                            >
                                {images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex justify-center">
                                            <img
                                                src={img}
                                                alt="couple"
                                                className="w-[300px] h-[520px] object-cover rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* 🔥 custom dots styling */}
                            <style jsx global>{`
                                .swiper-pagination {
                                    margin-top: 20px;
                                    position: relative;
                                }

                                .swiper-pagination-bullet {
                                    background: rgba(255,255,255,0.4);
                                    opacity: 1;
                                }

                                .swiper-pagination-bullet-active {
                                    background: white;
                                    transform: scale(1.2);
                                }
                            `}</style>

                        </div>
                    </>
                )}

                {showWeddingVideo && (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mt-20 px-6"
                    >
                        <p className="text-white text-2xl italic">
                            Watch our
                        </p>

                        <h2 className="text-white text-6xl font-script mt-5">
                            Pre Wedding
                        </h2>

                        <div className="mt-8 flex justify-center">
                            <div className="w-[300px] h-[520px] rounded-[18px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-black">
                                {videoId ? (
                                    <iframe
                                        className="w-full h-full border-0"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                                        title="Pre Wedding Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <>
                                        <img
                                            src={images[0] || "/templates/sikh/couple2.jpeg"}
                                            alt="pre wedding"
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white/40">
                                                ?
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>

            {/* Sticker */}
            {/* <motion.div
                initial={{ opacity: 0, x: 50, rotate: 20 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1 }}
                className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 z-10 w-full"
            >
                <img
                    src="/templates/temple/routeSticker2.png"
                    alt="sticker"
                    className="w-full"
                />
            </motion.div> */}

        </section>
    );
}