import React from 'react';
import { motion } from 'framer-motion';
import { Dancing_Script, Cormorant_Upright } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });
const cormorantUpright = Cormorant_Upright({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700']
});

export default function MessageAndContacts({ invitation }) {
    const contacts = invitation?.satsangDetails?.contacts || [];

    return (
        <section className="relative w-full flex flex-col items-center">
            {/* Floating Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
                {/* Flower 1 (Small) */}
                <motion.img
                    src="/icons/1.png"
                    className="absolute top-[5%] left-[10%] w-16 h-auto opacity-70"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Flower 2 (Small) */}
                <motion.img
                    src="/icons/2.png"
                    className="absolute top-[30%] right-[10%] w-14 h-auto opacity-60"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -15, 0],
                        rotate: [0, -15, 0]
                    }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Flower 3 (Small) */}
                <motion.img
                    src="/icons/3.png"
                    className="absolute top-[60%] left-[8%] w-18 h-auto opacity-60"
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 20, 0],
                        rotate: [0, 20, 0]
                    }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Flower 4 (Small) */}
                <motion.img
                    src="/icons/4.png"
                    className="absolute top-[80%] right-[8%] w-16 h-auto opacity-60"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, -10, 0],
                        rotate: [0, 15, 0]
                    }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Petals - Large Copies */}
                {[...Array(15)].map((_, i) => (
                    <motion.img
                        key={`contact-petal-${i}`}
                        src={i % 2 === 0 ? "/icons/13.png" : "/icons/15.png"}
                        className="absolute w-auto opacity-70"
                        style={{
                            top: `${(i * 6) + 10}%`,
                            left: `${(i * 17) % 90}%`,
                            width: `${30 + (i % 5) * 6}px`, // Larger petals: 30-54px
                        }}
                        animate={{
                            y: [0, 120 + (i % 3) * 60, 0],
                            x: [0, (i % 2 === 0 ? 40 : -40), 0],
                            rotate: [0, i % 2 === 0 ? 360 : -360]
                        }}
                        transition={{
                            duration: 12 + (i % 5) * 2.5,
                            repeat: Infinity,
                            ease: i % 3 === 0 ? "linear" : "easeInOut",
                            delay: i * 0.4
                        }}
                    />
                ))}
            </div>

            {/* Upper Section: Message */}
            <div className="relative w-full pt-25 pb-[45vh] flex flex-col items-center text-center px-0">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/templates/guruji/flowersbg.png"
                        alt="flowers bg"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className={`${dancingScript.className} relative z-10 text-[#13351d] text-4xl font-bold leading-relaxed space-y-2 drop-shadow-sm`}
                >
                    <p>Let us come</p>
                    <p>together</p>
                    <p>in</p>
                    <p>gratitude, love</p>
                    <p>& devotion</p>
                    <p>to</p>
                    <p>celebrate</p>
                    <p>Guruji's divine</p>
                    <p>presence.</p>
                </motion.div>
            </div>

            {/* Overlapping Shivji Image */}
            <div className="relative z-30 -mt-[55vh] -mb-[10vh]">
                <motion.img
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ y: [0, -15, 0] }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                        duration: 2.0,
                        ease: "easeOut",
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    src="/templates/guruji/shivji.png"
                    alt="Shivji"
                    className="w-[100vw] h-auto drop-shadow-2xl"
                />
            </div>

            {/* Bottom Section: Contacts */}
            <div className="relative w-full flex flex-col items-center pt-24 pb-20">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/templates/guruji/details2.png"
                        alt="details bg"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contacts Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
                    className={`${cormorantUpright.className} relative z-10 bg-white/30 backdrop-blur-sm px-8 py-12 w-full max-w-[280px] flex flex-col items-center text-center border-[#8b2c3c]/80 border-2 shadow-xl rounded-2xl`}
                >
                    <h3 className={`${dancingScript.className} text-[#13351d] text-4xl font-bold mb-8`}>Our Contacts</h3>

                    <img src="/templates/guruji/divider.png" alt="divider" className="w-40 h-auto mb-8 opacity-80" />

                    <div className="space-y-10 w-full">
                        {contacts.map((contact, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col gap-2">
                                    <span className="text-3xl font-bold text-[#13351d]">{contact.name}</span>
                                    <span className="text-xl text-[#13351d] opacity-90">{contact.phone}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <img src="/templates/guruji/divider.png" alt="divider" className="w-40 h-auto mt-8 opacity-80 rotate-180" />
                </motion.div>
            </div>
        </section>
    );
}
