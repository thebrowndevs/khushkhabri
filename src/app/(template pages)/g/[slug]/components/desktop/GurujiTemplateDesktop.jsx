// components/TempleTemplateMobile.jsx
import { motion } from "framer-motion";

import Hero from "./hero";
import Details from "./details";
import MessageAndContacts from "./MessageAndContacts";
import SmoothScroll from "@/components/website/common/SmoothScroll";

export default function GurujiTemplateDesktop({ invitation }) {

    return (
        <SmoothScroll>
            <div className="w-full max-w-[680px] mx-auto bg-white shadow-lg overflow-x-hidden">
                <main className="bg-[#fffaf5] min-h-screen flex justify-center">
                    <div className="w-full max-w-5xl">
                        <div className="relative">
                            <Hero />
                            <div className="relative">
                                <Details invitation={invitation} />
                                <motion.div
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2 }}
                                    viewport={{ once: true }}
                                    className="absolute left-0 bottom-[5%] w-full z-50 translate-y-1/2 pointer-events-none"
                                >
                                    <img
                                        src="/templates/guruji/singhasan.png"
                                        alt="cover"
                                        className="w-full object-contain"
                                    />
                                </motion.div>
                            </div>
                            <MessageAndContacts invitation={invitation} />
                        </div>

                    </div>
                </main>
            </div>
        </SmoothScroll>
    );
}