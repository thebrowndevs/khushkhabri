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
        image: "/templates/temple/engagement2.png",
        icon: "/icons/ring.png",
    },
    haldi: {
        title: "Haldi",
        image: "/templates/temple/haldi2.png",
        icon: "/icons/haldi3.png",
    },
    mehndi: {
        title: "Mehandi",
        image: "/templates/temple/mehandi2.png",
        icon: "/icons/mehndi.png",
    },
    cocktail: {
        title: "Cocktail Party",
        image: "/templates/temple/cocktail2.png",
        icon: "/icons/glass.png",
    },
    anand_karaj: {
        title: "Shaadi",
        image: "/templates/temple/shaadi2.png",
        icon: "/icons/khanda.png",
    },
    reception: {
        title: "Reception",
        image: "/templates/temple/reception2.png",
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
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px",
    });

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="relative flex flex-col items-center z-10 overflow-hidden"
        >

            {/* icons */}
            <FloatingEventIcons icon={meta.icon} />
            {/* Image */}

            <motion.div variants={item} className="w-[460px] relative z-10">
                <img
                    src={meta.image}
                    alt={meta.title}
                    className="w-full h-auto rounded-[24px]"
                />
            </motion.div>

            {/* Title */}
            <motion.h3 variants={item} className="text-white text-6xl -mt-2 font-script relative z-10">
                {meta.title}
            </motion.h3>

            {/* Details */}
            <motion.p variants={item} className="text-white text-xl mt-3 font-medium relative z-10">
                {event.date}
            </motion.p>

            <motion.p variants={item} className="text-white text-xl mt-1 relative z-10">
                at {event.location}
            </motion.p>

            <motion.p variants={item} className="text-white text-xl mt-1 mb-2 relative z-10">
                {formatEventTime(event.time)}
            </motion.p>

            {event.mapLink && (
                <motion.a
                    variants={item}
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 text-lg mt-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm z-30"
                >
                    <MapPin size={18} />
                    <span>See Location</span>
                </motion.a>
            )}
        </motion.div>
    );
}

export default function EventsSection({ events = [], invitation }) {
    const { bride, groom, side } = invitation?.weddingDetails || {};

    const containerDetails = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.25, delayChildren: 0.3 },
        },
    };

    const itemDetails = {
        hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
        show: {
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section className="relative w-full overflow-visible font-serif">

            <div
                className="pt-30 pb-60 px-4 text-center bg-contain bg-center bg-repeat"
                style={{
                    backgroundImage: "url('/bg/green.png')",
                    // backgroundAttachment: "fixed",
                }}
            >
                <motion.img
                    src="/templates/floral/gm.png"
                    alt="gm"
                    className="w-auto h-25 mx-auto mb-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                />

                <motion.div
                    variants={containerDetails}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-7 text-white mb-10"
                >
                    <motion.p variants={itemDetails} className="text-2xl leading-relaxed">
                        {side === 'groom' ? (
                            <>
                                Mr {groom?.father} &<br />
                                Mrs {groom?.mother}
                            </>
                        ) : (
                            <>
                                Mr {bride?.father} &<br />
                                Mrs {bride?.mother}
                            </>
                        )}
                    </motion.p>

                    <motion.h2 variants={itemDetails} className="text-5xl font-script italic tracking-wide">
                        Invites you
                    </motion.h2>

                    <motion.p variants={itemDetails} className="text-lg leading-relaxed">
                        to join the wedding celebration of their{" "}
                        {side === 'groom' ? 'son' : 'daughter'}
                    </motion.p>

                    <motion.h3 variants={itemDetails} className="text-6xl font-script tracking-wide">
                        {side === 'groom' ? groom?.name : bride?.name}
                    </motion.h3>

                    <motion.p variants={itemDetails} className="text-xl">
                        with
                    </motion.p>

                    <motion.h3 variants={itemDetails} className="text-6xl font-script tracking-wide">
                        {side === 'groom' ? bride?.name : groom?.name}
                    </motion.h3>

                    <motion.p variants={itemDetails} className="text-xl mt-4">
                        {side === 'groom' ? 'daughter of' : 'son of'}
                    </motion.p>

                    <motion.p variants={itemDetails} className="text-2xl leading-relaxed">
                        {side === 'groom' ? (
                            <>
                                Mr {bride?.father || 'Father'} &<br />
                                Mrs {bride?.mother || 'Mother'}
                            </>
                        ) : (
                            <>
                                Mr {groom?.father || 'Father'} &<br />
                                Mrs {groom?.mother || 'Mother'}
                            </>
                        )}
                    </motion.p>
                </motion.div>

                <p className="text-white text-2xl italic">
                    You are invited to the following
                </p>

                <h2 className="text-white text-6xl mt-8 font-script">
                    Events
                </h2>

                <div className="mt-10 space-y-15">
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