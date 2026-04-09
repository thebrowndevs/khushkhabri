// components/TempleTemplateMobile.jsx
import { motion } from "framer-motion";

import Hero from "./hero";
import EventsSection from "./events";
import GallerySection from "./gallery";
import CountdownSection from "./CountdownSection";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import RSVPSticker from "./RSVPSticker";

export default function RoyalTemplateMobile({ invitation, events, weddingDate }) {
    const showGallery = invitation?.mainDetails?.showPreWeddingPhotos && invitation?.mainDetails?.preWeddingPhotos?.length > 0;
    const showVideo = invitation?.mainDetails?.showWeddingVideo && invitation?.mainDetails?.weddingVideo;
    const isGalleryVisible = showGallery || showVideo;

    return (
        <SmoothScroll>
            <div className="w-full max-w-[680px] mx-auto bg-white shadow-lg overflow-x-hidden">
                <main className="bg-[#fffaf5] min-h-screen flex justify-center">
                    <div className="w-full max-w-5xl">
                        <div className="relative z-20">
                            <Hero invitation={invitation} />
                        </div>

                        <div className="relative z-10 mt-[-200px]">
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
                                </motion.div>
                            }
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
                            <CountdownSection weddingDate={weddingDate} />


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

                        {/* End Section */}
                        <div className="relative h-[1000px] w-full flex items-center justify-center overflow-hidden">
                            <img
                                src="/templates/royal/end.png"
                                alt="End"
                                className="w-full h-full object-cover"
                            />

                            <motion.img
                                src="/templates/royal/endCar.png"
                                alt="car"
                                initial={{ x: "60vw", y: "10vh", rotate: -5, scale: 0.5 }}
                                whileInView={{ x: 0, y: "30vh", rotate: 0, scale: 1.2 }}
                                transition={{ duration: 3, ease: "easeOut" }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="absolute w-[350px] z-10"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </SmoothScroll>
    );
}