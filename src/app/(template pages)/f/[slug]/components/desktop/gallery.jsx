"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function GallerySection({ invitation }) {

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
        <section className="relative w-full overflow-visible font-serif max-h-[2000px]">

            <div
                className="pt-45 pb-25 bg-cover bg-center bg-no-repeat text-center"
                style={{
                    backgroundImage: "url('/bg/blue-texture.png')",
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
                        <div className="mt-2 px-0">

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
                                        <div className="flex justify-center items-center py-4">
                                            <div className="relative w-[350px] h-[560px] flex items-center justify-center">
                                                {/* Frame Overlay */}
                                                <img
                                                    src="/templates/floral/frame3.png"
                                                    alt="frame"
                                                    className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none drop-shadow-lg"
                                                />

                                                {/* Couple Image */}
                                                <img
                                                    src={img}
                                                    alt="couple"
                                                    className="w-[255px] h-[460px] object-cover rounded-[110px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-0"
                                                />
                                            </div>
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
                        className="mt-15 px-6"
                    >
                        <p className="text-white text-2xl italic">
                            Watch our
                        </p>

                        <h2 className="text-white text-6xl font-script mt-5">
                            Pre Wedding
                        </h2>

                        <div className="mt-8 flex justify-center py-4">
                            <div className="relative w-[400px] h-[620px] flex items-center justify-center group">

                                {/* Video / Fallback — clipped to frame corners */}
                                {videoId ? (
                                    <iframe
                                        className="absolute z-0 border-0 video-frame-clip"
                                        style={{
                                            width: "82%",
                                            height: "90%",
                                            borderRadius: "52px 16px 52px 16px",
                                            overflow: "hidden",
                                        }}
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                                        title="Pre Wedding Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div
                                        className="absolute z-0 overflow-hidden"
                                        style={{
                                            width: "82%",
                                            height: "90%",
                                            borderRadius: "52px 16px 52px 16px",
                                        }}
                                    >
                                        <img
                                            src={images[0] || "/templates/sikh/couple2.jpeg"}
                                            alt="pre wedding"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-[#8b2c3c]">
                                                ▶
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Frame Overlay — on top */}
                                <img
                                    src="/templates/floral/vidFrame2.png"
                                    alt="video frame"
                                    className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none drop-shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Force iframe corner clipping via CSS */}
                        <style>{`
                            .video-frame-clip {
                                border-radius: 52px 16px 52px 16px !important;
                                overflow: hidden !important;
                                isolation: isolate;
                            }
                        `}</style>
                    </motion.div>
                )}
            </div>
        </section>
    );
}