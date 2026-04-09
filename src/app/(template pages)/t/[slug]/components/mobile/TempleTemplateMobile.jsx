// components/TempleTemplateMobile.jsx
import { motion } from "framer-motion";

import Hero from "./hero";
import Cloud from "./cloud";
import EventsSection from "./events";
import GallerySection from "./gallery";
import Blessings from "./Blessings";
import CountdownSection from "./CountdownSection";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import CloudStatic from "./CloudStatic";
import RSVPSticker from "./RSVPSticker";

export default function TempleTemplateMobile({ invitation, events, weddingDate }) {
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

                            {/* ✅ TRANSITION CLOUDS */}
                            <div className="absolute bottom-[-12%] w-full h-[220px] z-20 pointer-events-none overflow-visible">
                                {/* 🔥 STATIC CENTER CLOUD */}
                                <CloudStatic />

                                {/* Layer 1 */}
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <Cloud key={`layer1-${i}`} index={i} isLeft={i % 2 === 0} layer={1} />
                                ))}

                                {/* Layer 2 (slightly upar + offset) */}
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <Cloud key={`layer2-${i}`} index={i} isLeft={i % 2 !== 0} layer={2} />
                                ))}

                                {/* Layer 3 (optional extra depth) */}
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Cloud key={`layer3-${i}`} index={i} isLeft={i % 2 === 0} layer={3} />
                                ))}

                                {/* Layer 4 (optional extra depth) */}
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Cloud key={`layer4-${i}`} index={i} isLeft={i % 2 === 0} layer={4} />
                                ))}

                            </div>
                        </div>

                        <div className="relative">
                            <EventsSection events={events} invitation={invitation} />
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
                                        src="/templates/sikh/routeSticker.png"
                                        alt="route"
                                        className="w-full object-contain"
                                    />
                                </motion.div>}
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
                                        src="/templates/royal/sep.png"
                                        alt="cover"
                                        className="w-full object-contain"
                                    />
                                </motion.div>
                            </div>
                        )}

                        <div className="relative">
                            <Blessings />

                            <motion.div
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                                className="absolute left-0 bottom-[-10%] w-full z-50 translate-y-1/2 pointer-events-none"
                            >
                                <img
                                    src="/templates/temple/sticker2.png"
                                    alt="cover"
                                    className="w-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[#5D4037] text-5xl font-script -mt-8">
                                        Shubh Vivah
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                        <CountdownSection weddingDate={weddingDate} />
                    </div>
                </main>
            </div>
        </SmoothScroll>
    );
}