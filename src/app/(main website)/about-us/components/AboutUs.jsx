// app/about/page.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutUs() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="bg-[#FFFDF7] min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#1a5c38]/90">
                    <Image
                        src="/oil-press.png"
                        alt="Traditional oil press"
                        fill
                        className="object-cover mix-blend-overlay"
                    />
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            About Trivenika Organic
                        </h1>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            Preserving Tradition, Delivering Purity
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Our Story */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <motion.section
                    className="mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <motion.div variants={itemVariants}>
                            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                                <Image
                                    src="/founders.png"
                                    alt="Trivenika founders"
                                    fill
                                    className="object-cover"
                                />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#2E8B57]/50 to-transparent"></div> */}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl font-bold text-[#2E8B57] mb-4">
                                Our Journey
                            </h2>

                            <p className="text-gray-700 mb-6">
                                Trivenika was born from a deep reverence for traditional Indian food practices and
                                a commitment to preserving the purity of natural ingredients. Our journey began in
                                the kitchens of our ancestors, where wood-pressed oils and bilona ghee were staples.
                            </p>

                            <p className="text-gray-700 mb-6">
                                Named after the sacred 'Triveni Sangam' - the confluence of three holy rivers -
                                Trivenika represents the merging of three core values: Purity, Health, and Prosperity.
                                We honor this tradition by bringing you oils and ghee made exactly as our grandparents did.
                            </p>

                            <div className="flex items-center gap-3 mt-8">
                                <div className="bg-[#2E8B57] w-12 h-12 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <p className="text-[#2E8B57] font-medium">
                                    Certified Organic • Traditional Methods • Chemical-Free
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Our Process */}
                <motion.section
                    className="mb-16 bg-[#f8fbf3] rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2E8B57]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                    <motion.div
                        className="text-center mb-12"
                        variants={itemVariants}
                    >
                        <h2 className="text-3xl font-bold text-[#2E8B57] mb-4">
                            The Trivenika Difference
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            How our traditional methods preserve nutrition and flavor
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Wood-Pressed Oils",
                                desc: "Cold-pressed in wooden ghani to preserve nutrients and natural flavor",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                )
                            },
                            {
                                title: "Bilona Ghee",
                                desc: "Hand-churned using Vedic methods for authentic flavor and nutrition",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v12m0 0l-3-3m3 3l3-3M3 10h18M3 10l3 3m-3-3l3-3" />
                                    </svg>
                                )
                            },
                            {
                                title: "Small Batches",
                                desc: "Crafted in limited quantities to ensure freshness and quality",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                )
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white rounded-2xl p-8 text-center border border-[#2E8B57]/20 shadow-sm hover:shadow-md transition-all h-full flex flex-col items-center"
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                            >
                                <div className="bg-[#2E8B57]/10 p-4 rounded-full mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-[#2E8B57] text-xl mb-3">{item.title}</h3>
                                <p className="text-gray-700 flex-grow">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Process Gallery */}
                <motion.section
                    className="mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="text-center mb-12"
                        variants={itemVariants}
                    >
                        <h2 className="text-3xl font-bold text-[#2E8B57] mb-4">
                            From Seed to Bottle
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Our meticulous process ensures the highest quality products
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Seed Selection",
                                desc: "Only organic, non-GMO seeds are selected",
                                image: "/seeds.png"
                            },
                            {
                                title: "Wood Pressing",
                                desc: "Cold-pressed in traditional wooden ghani",
                                image: "/wood-press.png"
                            },
                            {
                                title: "Natural Settling",
                                desc: "Oils naturally settle without chemicals",
                                image: "/oil-settling.png"
                            },
                            {
                                title: "Hand Packaging",
                                desc: "Carefully bottled and sealed by hand",
                                image: "/packaging.png"
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                className="group"
                                variants={itemVariants}
                            >
                                <div className="relative h-60 rounded-2xl overflow-hidden">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold text-lg">{step.title}</h3>
                                        <p className="text-white/90 text-sm">{step.desc}</p>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-[#2E8B57] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Beautiful Commitment Section */}
                <motion.section
                    className="py-16 relative"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-[#f8fbf3] z-0"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2E8B57]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4">
                        <motion.div
                            className="text-center mb-16"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="inline-block mb-6"
                                whileHover={{ rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="bg-[#2E8B57] w-20 h-20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </motion.div>

                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4"
                                variants={itemVariants}
                            >
                                Our Sacred Commitments
                            </motion.h2>

                            <motion.p
                                className="text-gray-600 max-w-2xl mx-auto"
                                variants={itemVariants}
                            >
                                The promises we uphold in every product we create
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={containerVariants}
                        >
                            {[
                                {
                                    title: "To Our Farmers",
                                    desc: "Fair prices and sustainable partnerships",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4c-1.105 0-2 .672-2 1.5S10.895 7 12 7s2-.672 2-1.5S13.105 4 12 4z" />
                                        </svg>
                                    ),
                                    color: "#e8f5e9"
                                },
                                {
                                    title: "To Our Customers",
                                    desc: "100% pure, chemical-free products",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    ),
                                    color: "#f1f8e9"
                                },
                                {
                                    title: "To Our Planet",
                                    desc: "Eco-friendly practices and packaging",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.5 10.5l.5-.5a4.95 4.95 0 00-7 7l.5-.5" />
                                        </svg>
                                    ),
                                    color: "#e8f5e9"
                                }
                            ].map((value, idx) => (
                                <motion.div
                                    key={idx}
                                    className="relative group"
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                >
                                    {/* Card */}
                                    <div className="bg-white rounded-2xl overflow-hidden border border-[#2E8B57]/20 shadow-md h-full flex flex-col">
                                        {/* Icon header */}
                                        <div
                                            className="p-8 flex items-center justify-center"
                                            style={{ backgroundColor: value.color }}
                                        >
                                            <div className="bg-white p-4 rounded-full">
                                                {value.icon}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex-grow flex flex-col">
                                            <h3 className="font-bold text-2xl text-[#2E8B57] mb-4">{value.title}</h3>
                                            <p className="text-gray-700 mb-6 flex-grow">{value.desc}</p>

                                            <div className="mt-auto">
                                                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute inset-y-0 bg-[#2E8B57]"
                                                        style={{ width: `${90 - idx * 10}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-right text-xs text-gray-500 mt-1">
                                                    Commitment Level: {90 - idx * 10}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative corner */}
                                    <div className="absolute top-4 right-4 w-0 h-0 border-t-[25px] border-r-[25px] border-t-[#2E8B57] border-r-white"></div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Nature Pledge */}
                        <motion.div
                            className="mt-16 bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-2xl p-8 text-white relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="absolute top-0 left-0 w-48 h-48 bg-[#ffffff]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffffff]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="bg-white/20 p-4 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold mb-4">
                                            Our Pledge to Nature
                                        </h3>
                                        <p className="mb-6">
                                            We promise to always prioritize sustainable practices, from seed to bottle.
                                            Our commitment extends beyond products to the planet we share.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                                                Eco-friendly Packaging
                                            </span>
                                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                                                Zero Waste Production
                                            </span>
                                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                                                Carbon Neutral Shipping
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Experience the Trivenika Difference
                    </motion.h2>
                    <motion.p
                        className="text-white/90 mb-8 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Taste the purity of traditional wood-pressed oils and bilona ghee
                    </motion.p>
                    <motion.button
                        className="bg-white text-[#2E8B57] px-8 py-3 rounded-full font-bold hover:bg-[#f8f8f8] transition-all transform hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Explore Our Products
                    </motion.button>
                </div>
            </div>
        </div>
    );
}