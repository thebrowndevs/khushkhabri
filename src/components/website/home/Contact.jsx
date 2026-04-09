"use client";
import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import ContactForm from "../common/ContactForm";
import { usePathname } from "next/navigation";

export default function Contact() {
    const pathname = usePathname();

    const sectionPadding =
        pathname === "/contact-us"
            ? "py-24 sm:py-26"
            : "py-12 sm:py-16 md:py-20";

    return (
        <section
            className={`relative ${sectionPadding} px-4 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden`}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-repeat"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Heading */}
                <div className="text-center mb-4 md:mb-4">
                    <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-semibold text-gray-900 mb-0 md:mb-1 leading-tight">
                        Have a <span className="text-primary">great</span> idea?
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
                        We convert your ideas into reality.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-6">
                    {/* Contact Information */}
                    <div className="lg:w-2/5">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-300 h-full flex flex-col">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                                Contact Information
                            </h3>

                            <div className="space-y-6 flex flex-col h-full">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4 shrink-0">
                                        <FaPhone className="text-primary text-lg sm:text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                                        <p className="text-gray-600 text-sm sm:text-base">+91 8744043846</p>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                            We are available 24x7
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4 shrink-0">
                                        <FaEnvelope className="text-primary text-lg sm:text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                                        <p className="text-gray-600 text-sm sm:text-base">
                                            contact@browndevs.com
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                            We'll respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden xl:flex flex-col justify-center border-gray-100 bg-[#17171c] text-white rounded-2xl p-6 sm:p-8 h-full text-center lg:text-left">
                                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                                        Let's <br />
                                        <span className="text-blue-300">Connect</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-3/5">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
