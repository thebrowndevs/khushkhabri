// components/SikhTemplateDesktop.jsx
import { motion } from "framer-motion";

import Hero from "./hero";
import EventsSection from "./events";
import GallerySection from "./gallery";
import CountdownSection from "./CountdownSection";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import RSVPSticker from "./RSVPSticker";

export default function SikhTemplateDesktop({ invitation, events, weddingDate }) {
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

                            {/* <motion.div
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                                className="absolute left-0 bottom-[2%] w-full z-50 translate-y-1/2 pointer-events-none"
                            >
                                <img
                                    src="/templates/sikh/temple.png"
                                    alt="temple"
                                    className="w-full object-contain"
                                />
                            </motion.div> */}
                        </div>

                        <div className="relative">
                            <EventsSection events={events} />
                            {invitation.rsvpNumber ?
                                <RSVPSticker rsvpNumber={invitation.rsvpNumber} />
                                : <motion.div
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2 }}
                                    viewport={{ once: true }}
                                    className="absolute left-0 bottom-[0%] w-full z-50 translate-y-1/2 pointer-events-none"
                                >
                                    <img
                                        src="/templates/sikh/routeSticker4.png"
                                        alt="route"
                                        className="w-full object-contain"
                                    />
                                </motion.div>
                            }
                        </div>
                        {isGalleryVisible && (
                            <GallerySection invitation={invitation} />
                        )}
                        <CountdownSection weddingDate={weddingDate} />
                    </div>
                </main>
            </div>
        </SmoothScroll>
    );
}
