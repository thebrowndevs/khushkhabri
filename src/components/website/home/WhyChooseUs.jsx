"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    FaBalanceScale,
    FaClock,
    FaShieldAlt,
    FaChartBar,
    FaSmile,
    FaRocket,
    FaHandshake
} from 'react-icons/fa';

export default function WhyChooseUs() {
    const [activeIndex, setActiveIndex] = useState(null);

    const features = [
        {
            title: "Expert Legal Team",
            description: "Skilled professionals you can trust",
            icon: <FaBalanceScale className="text-2xl" />,
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "Fast Process",
            description: "Quick and smooth service delivery",
            icon: <FaClock className="text-2xl" />,
            color: "from-amber-500 to-orange-500"
        },
        {
            title: "Startup-Focused",
            description: "Legal help tailored for startups",
            icon: <FaRocket className="text-2xl" />,
            color: "from-purple-500 to-fuchsia-500"
        },
        {
            title: "Transparent Pricing",
            description: "No hidden costs, ever",
            icon: <FaChartBar className="text-2xl" />,
            color: "from-emerald-500 to-teal-500"
        },
        {
            title: "Dedicated Support",
            description: "We're here when you need us",
            icon: <FaHandshake className="text-2xl" />,
            color: "from-rose-500 to-pink-500"
        },
        {
            title: "Complete Legal Services",
            description: "All legal needs, one platform",
            icon: <FaShieldAlt className="text-2xl" />,
            color: "from-cyan-500 to-sky-500"
        }
    ];

    useEffect(() => {
        // Auto rotate active feature for demo
        const interval = setInterval(() => {
            setActiveIndex(prev => prev === null ? 0 : (prev + 1) % features.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden py-20 px-4" id='why'>
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full filter blur-[120px] opacity-20"></div>
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-15"></div>
            </div>

            {/* Main content container */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="text-indigo-500 font-semibold tracking-wide uppercase">
                        Our Advantages
                    </span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Why Choose Us
                    </h2>
                    <div className="mt-4 max-w-2xl mx-auto">
                        <p className="text-lg text-gray-600">
                            We combine legal expertise with innovative solutions to provide unmatched service for your business
                        </p>
                    </div>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left features */}
                    <div className="space-y-8">
                        {features.slice(0, 3).map((feature, index) => (
                            <div
                                key={index}
                                className={`relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${activeIndex === index ? 'ring-2 ring-indigo-500' : ''
                                    }`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl"></div>
                                <div className="flex items-start">
                                    <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                                        {feature.icon}
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                                        <p className="mt-2 text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center image */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-[85%] h-[85%] rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 animate-pulse-slow opacity-10"></div>
                            </div>

                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-white shadow-2xl transform rotate-0 hover:rotate-6 transition-all duration-500">
                                    <Image
                                        src="/chooseUs.png"
                                        alt="Friendly advisor"
                                        layout="fill"
                                        objectFit="cover"
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="animate-ping-slow absolute w-[90%] h-[90%] rounded-full border-2 border-indigo-300 opacity-50"></div>
                                <div className="animate-ping-slow-delay absolute w-[95%] h-[95%] rounded-full border-2 border-blue-300 opacity-30"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right features */}
                    <div className="space-y-8">
                        {features.slice(3).map((feature, index) => (
                            <div
                                key={index + 3}
                                className={`relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${activeIndex === index + 3 ? 'ring-2 ring-indigo-500' : ''
                                    }`}
                                onMouseEnter={() => setActiveIndex(index + 3)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl"></div>
                                <div className="flex items-start">
                                    <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                                        {feature.icon}
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                                        <p className="mt-2 text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats section */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">95%</div>
                        <div className="mt-2 text-gray-600">Client Satisfaction</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">500+</div>
                        <div className="mt-2 text-gray-600">Happy Clients</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">24/7</div>
                        <div className="mt-2 text-gray-600">Support Available</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">10+</div>
                        <div className="mt-2 text-gray-600">Years Experience</div>
                    </div>
                </div>
            </div>
        </section>
    );
}