// app/components/TestimonialSlider.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
    {
        name: "Riya Verma",
        location: "Kurukshetra, Haryana",
        image: "/testimonial1.png",
        text: "I've tried many ghee brands, but this A2 Desi Cow Ghee has a rich aroma and taste that reminds me of homemade ghee. I feel more energetic and my digestion has improved too!",
        photo: "/user1.jpg",
    },
    {
        name: "Avinash Arora",
        location: "Mumbai, Maharashtra",
        image: "/testimonial2.png",
        text: "The wood-pressed coconut oil has transformed my hair care routine. After just 2 months of use, my hair is stronger and shinier than ever before. Truly authentic!",
        photo: "/user2.jpg",
    },
    {
        name: "Pooja Singh",
        location: "Lucknow, UP",
        image: "/testimonial3.png",
        text: "Very authentic product. My family loved the aroma and purity of the ghee. Will definitely buy again!",
        photo: "/user3.jpg",
    },
    {
        name: "Ramesh Kumar",
        location: "Delhi",
        image: "/testimonial4.png",
        text: "Best oil and ghee quality. I use them for daily cooking and even for rituals. Highly recommended!",
        photo: "/user4.jpg",
    },
    {
        name: "Sunita Reddy",
        location: "Hyderabad, Telangana",
        image: "/testimonial5.png",
        text: "The spices are incredibly fresh and aromatic. They've completely elevated my cooking. The packaging is eco-friendly too!",
        photo: "/user5.jpg",
    },
];

export default function TestimonialSlider2() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 0: left, 1: right

    const prev = () => {
        setDirection(0);
        setIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const next = () => {
        setDirection(1);
        setIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (slideIndex) => {
        setDirection(slideIndex > index ? 1 : 0);
        setIndex(slideIndex);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2
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

    const testimonialVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0
        })
    };

    return (
        <section className="bg-[#FFFCF6] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#2E8B57]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="inline-block mb-6"
                        variants={itemVariants}
                    >
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4"
                        variants={itemVariants}
                    >
                        What Our Customers Say
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Real Stories. Genuine Experiences. Trusted by Families Across India.
                    </motion.p>

                    {/* Nature divider */}
                    <motion.div
                        className="mt-8 flex justify-center"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-32 h-0.5 bg-[#2E8B57]/20"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="bg-[#2E8B57] w-3 h-3 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Main testimonial with animation */}
                    <div className="relative h-[500px] md:h-[400px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={testimonialVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#2E8B57]/10 flex flex-col md:flex-row h-full">
                                    {/* Image */}
                                    <div className="md:w-1/2 h-64 md:h-full relative">
                                        <Image
                                            src={testimonials[index].image}
                                            alt={testimonials[index].name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                        {/* Quote icon */}
                                        <div className="absolute top-6 left-6 bg-[#2E8B57] w-10 h-10 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                                        <div className="text-yellow-400 text-xl mb-4 flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className="text-gray-700 text-lg italic mb-6 flex-grow">
                                            "{testimonials[index].text}"
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#2E8B57]">
                                                <Image
                                                    src={testimonials[index].photo}
                                                    alt={testimonials[index].name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-gray-800">{testimonials[index].name}</p>
                                                <p className="text-sm text-gray-500">{testimonials[index].location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Additional testimonials grid */}
                    <motion.div
                        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {testimonials
                            .filter((_, i) => i !== index)
                            .slice(0, 3)
                            .map((testimonial, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-white rounded-xl p-6 border border-[#2E8B57]/10 shadow-sm hover:shadow-md transition-all"
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#2E8B57]">
                                            <Image
                                                src={testimonial.photo}
                                                alt={testimonial.name}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                            <p className="text-xs text-gray-500">{testimonial.location}</p>
                                        </div>
                                    </div>

                                    <div className="text-yellow-400 text-sm mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 inline"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 text-sm">
                                        "{testimonial.text.substring(0, 100)}..."
                                    </p>

                                    <button
                                        className="mt-4 text-[#2E8B57] text-sm font-medium flex items-center"
                                        onClick={() => goToSlide(testimonials.indexOf(testimonial))}
                                    >
                                        Read full story
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex justify-center mt-12 gap-4">
                        <button
                            onClick={prev}
                            className="p-3 bg-[#2E8B57] hover:bg-[#256e46] text-white rounded-full shadow-md hover:shadow-lg transition-all"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${idx === index
                                        ? "bg-[#2E8B57] w-6"
                                        : "bg-gray-300 hover:bg-[#2E8B57]/50"
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-3 bg-[#2E8B57] hover:bg-[#256e46] text-white rounded-full shadow-md hover:shadow-lg transition-all"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Nature Commitment */}
                <motion.div
                    className="mt-20 bg-[#f8fbf3] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold text-[#2E8B57] mb-6">
                        Join Thousands of Happy Customers
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Experience the purity of nature with our wood-pressed oils and natural products.
                        Loved by families across India for their authenticity and quality.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white px-6 py-3 rounded-full shadow-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">4.9/5 Customer Rating</span>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-full shadow-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">10,000+ Happy Families</span>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-full shadow-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">100% Natural Products</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}