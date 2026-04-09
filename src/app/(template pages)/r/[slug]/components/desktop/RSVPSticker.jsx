"use client";
import { motion } from "framer-motion";

export default function RSVPSticker({ rsvpNumber }) {
    if (!rsvpNumber) return null;

    const whatsappLink = `https://wa.me/${rsvpNumber.replace(/\s+/g, '')}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="absolute left-0 bottom-[0%] w-full z-50 translate-y-1/2 flex justify-center items-center"
        >
            <div className="relative w-full aspect-[1.6/0.6] flex flex-col items-center justify-center px-0 pb-4 text-center">
                {/* Frame Image */}
                <img
                    src="/templates/sikh/routeSticker4.png"
                    alt="RSVP Frame"
                    className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
                />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center mt-5">
                    <h4 className="text-[#ffffff] text-4xl font-script italic">
                        Click here to RSVP
                    </h4>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 hover:scale-110 transition-transform cursor-pointer"
                    >
                        <p className="text-[#ffffff] text-xl font-medium mt-1">
                            {rsvpNumber}
                        </p>
                    </a>

                    {/* <img
                            src="/whatsapp.png"
                            alt="WhatsApp"
                            className="w-12 h-12 drop-shadow-md"
                        /> */}
                </div>
            </div>
        </motion.div>
    );
}
