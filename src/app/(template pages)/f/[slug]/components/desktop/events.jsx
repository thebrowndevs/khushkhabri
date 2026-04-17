"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.2,
        },
    },
};

const item = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: "blur(8px)",
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const eventMeta = {
    engagement: {
        title: "Engagement",
        image: "/templates/floral/engagement.png",
        icon: "/icons/ring.png",
    },
    haldi: {
        title: "Haldi",
        image: "/templates/floral/haldi.png",
        icon: "/icons/haldi3.png",
    },
    mehndi: {
        title: "Mehandi",
        image: "/templates/floral/mehandi.png",
        icon: "/icons/mehndi.png",
    },
    cocktail: {
        title: "Cocktail Party",
        image: "/templates/floral/cocktail.png",
        icon: "/icons/glass.png",
    },
    anand_karaj: {
        title: "Shaadi",
        image: "/templates/floral/shaadi.png",
        icon: "/icons/1.png",
    },
    reception: {
        title: "Reception",
        image: "/templates/floral/reception.png",
        icon: "/icons/celebration.png",
    },
};

const normalizeType = (type) => {
    return type.toLowerCase().replace(/\s+/g, "_");
};

function FloatingEventIcons({ icon }) {
    const icons = Array.from({ length: 12 });

    return (
        <>
            {icons.map((_, i) => {
                const left = (i * 13) % 100;
                const top = (i * 17) % 100;

                return (
                    <motion.img
                        key={i}
                        src={icon}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5, y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            width: "18px",
                            transform: `rotate(${i * 15}deg)`,
                        }}
                    />
                );
            })}
        </>
    );
}

const formatEventTime = (timeStr) => {
    if (!timeStr) return "";

    // Handle HH:MM format (24 hour)
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = parseInt(hoursStr);
    let minutes = parseInt(minutesStr);

    if (isNaN(hours)) return timeStr; // Return original if not a direct HH:MM

    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    if (minutes < 30) {
        return `${displayHours} ${ampm} Onwards`;
    } else {
        return `${displayHours}:30 ${ampm} Onwards`;
    }
};

function EventItem({ event, meta }) {
    // console.log(event)
    return (
        <div className="relative flex flex-col items-center z-10 overflow-hidden w-full">
            {/* icons */}
            <FloatingEventIcons icon={meta.icon} />

            {/* Image */}
            <motion.div
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-100px" }}
                className="w-[450px] relative z-10"
            >
                <img
                    src={meta.image}
                    alt={meta.title}
                    className="w-full h-auto rounded-[24px]"
                />
            </motion.div>

            {/* Text Content Group */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-100px" }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                {/* Title */}
                <motion.h3 variants={item} className="text-white text-6xl mt-6 font-script">
                    {meta.title}
                </motion.h3>

                {/* Details */}
                <motion.p variants={item} className="text-white text-xl mt-3 font-medium">
                    {event.date}
                </motion.p>

                <motion.p variants={item} className="text-white max-w-[400px] text-xl mt-1">
                    at {event.location}
                </motion.p>

                <motion.p variants={item} className="text-white text-xl mt-1 mb-2">
                    {formatEventTime(event.time)}
                </motion.p>

                {event.mapLink && (
                    <motion.a
                        variants={item}
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/90 text-lg mt-4 bg-white/10 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm z-30 hover:bg-white/20 transition-colors"
                    >
                        <MapPin size={18} />
                        <span>See Location</span>
                    </motion.a>
                )}
            </motion.div>
        </div>
    );
}

export default function EventsSection({ events = [] }) {
    return (
        <section className="relative w-full overflow-visible font-serif">

            <div
                className="pt-44 pb-60 px-4 text-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/bg/orange.png')",
                    // backgroundAttachment: "fixed",
                }}
            >
                <p className="text-white text-2xl italic">
                    You are invited to the following
                </p>

                <h2 className="text-white text-6xl mt-8 font-script">
                    Events
                </h2>

                <div className="mt-12 space-y-20">
                    {events.map((event, index) => {
                        const key = normalizeType(event.type);
                        const meta = eventMeta[key];
                        if (!meta) return null;

                        return (
                            <EventItem
                                key={index}
                                event={event}
                                meta={meta}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}