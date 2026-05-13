// components/SikhTemplateMobile.jsx
import { motion } from "framer-motion";

import Hero from "./hero";
import EventsSection from "./events";
import RSVPSticker from "./RSVPSticker";
import GallerySection from "./gallery";
import CountdownSection from "./CountdownSection";
import SmoothScroll from "@/components/website/common/SmoothScroll";

export default function FloralTemplateDesktop({ invitation, events, weddingDate }) {
    const showGallery = invitation?.mainDetails?.showPreWeddingPhotos && invitation?.mainDetails?.preWeddingPhotos?.length > 0;
    const showVideo = invitation?.mainDetails?.showWeddingVideo && invitation?.mainDetails?.weddingVideo;
    const isGalleryVisible = showGallery || showVideo;

    return (
        <SmoothScroll>
            <div className="w-full max-w-[680px] mx-auto bg-white shadow-lg overflow-x-hidden">
                <main className="bg-[#fffaf5] min-h-screen flex justify-center">
                    <div className="w-full max-w-5xl">
                        <div className="relative">
                            <Hero invitation={invitation} />

                            <motion.div
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                                className="absolute left-0 bottom-[-1%] w-full z-50 translate-y-1/2 pointer-events-none"
                            >
                                <img
                                    src="/templates/floral/cover2.png"
                                    alt="cover"
                                    className="w-full object-contain"
                                />
                            </motion.div>
                        </div>

                        <div className="relative">
                            <EventsSection events={events} />

                            <RSVPSticker rsvpNumber={invitation.rsvpNumber} />
                        </div>
                        {isGalleryVisible && (
                            <div className="relative">
                                <GallerySection invitation={invitation} />

                                <motion.div
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2 }}
                                    viewport={{ once: true }}
                                    className="absolute left-0 bottom-[0%] w-full z-50 translate-y-1/2 pointer-events-none"
                                >
                                    <img
                                        src="/templates/floral/cover2.webp"
                                        alt="cover"
                                        className="w-full object-contain"
                                    />
                                </motion.div>
                            </div>
                        )}
                        <CountdownSection weddingDate={weddingDate} />
                    </div>
                </main>
            </div>
        </SmoothScroll>
    );
}
