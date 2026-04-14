"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPenNib, FaLanguage, FaPaintBrush, FaMicrophoneAlt } from "react-icons/fa";

export default function VideoInvitesHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 🌸 FALLING PETALS */}
      {[...Array(8)].map((_, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.img
            key={`hero-petal-${i}`}
            src={i % 3 === 0 ? "/icons/13.png" : "/icons/15.png"}
            className={`absolute w-6 sm:w-10 pointer-events-none z-0 opacity-40 ${isLeft ? "left-[10%] sm:left-[20%]" : "right-[10%] sm:right-[20%]"}`}
            initial={{
              y: -100 - Math.random() * 100,
              x: isLeft ? Math.random() * 100 : -Math.random() * 100,
            }}
            animate={{
              y: "100vh",
              x: isLeft ? Math.random() * 200 : -Math.random() * 200,
              rotate: 360,
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Title */}
      <div className="z-20 text-center mb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-800"
        >
          Premium Designed <br className="hidden md:block" /> Video Invites
        </motion.h1>
      </div>

      {/* Hero Visual Area */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[500px]">

        {/* Floating Element 1: Designed by Experts */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: [-15, 10, -15] }}
          transition={{ opacity: { delay: 0.2 }, x: { delay: 0.2 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-0 left-[5%] md:left-[15%] flex flex-col items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-30 transform -rotate-6"
        >
          <span className="text-sm font-semibold text-gray-700 mb-2 font-handwriting">Designed by<br />Experts</span>
          <div className="text-primary text-3xl">
            <FaPenNib />
          </div>
          <img src="/arrow.png" alt="arrow" className="absolute -right-16 md:-right-24 top-1/2 w-12 md:w-16 opacity-50 hidden md:block transform rotate-12" />
        </motion.div>

        {/* Floating Element 2: Customization Available */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: [10, -15, 10] }}
          transition={{ opacity: { delay: 0.4 }, x: { delay: 0.4 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[10%] left-[5%] md:left-[10%] flex flex-col items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-30"
        >
          <span className="text-sm font-semibold text-gray-700 mb-2 font-handwriting">Customization<br />Available</span>
          <div className="text-primary text-3xl">
            <FaMicrophoneAlt />
          </div>
          <div className="w-24 h-6 mt-2 flex items-center gap-1 justify-center">
            {[1, 2, 3, 4, 5, 4, 3, 2, 4, 5].map((h, i) => (
              <div key={i} className="w-1 bg-[#4CAF50] rounded-full" style={{ height: `${h * 4}px` }} />
            ))}
          </div>
          <img src="/arrow.png" alt="arrow" className="absolute -right-16 md:-right-24 bottom-1/2 w-12 md:w-16 opacity-50 hidden md:block transform -scale-y-100 -rotate-12" />
        </motion.div>

        {/* Floating Element 3: Premium Caricature */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: [-10, 12, -10] }}
          transition={{ opacity: { delay: 0.3 }, x: { delay: 0.3 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[5%] right-[5%] md:right-[15%] flex flex-col items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-30 transform rotate-3"
        >
          <span className="text-sm font-semibold text-gray-700 mb-2 font-handwriting">Premium Caricature<br />Video invites</span>
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-pink-100 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xl">👨</div>
            <div className="w-12 h-12 bg-pink-100 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xl">👩</div>
          </div>
          {/* <img src="/arrow.png" alt="arrow" className="absolute -left-16 md:-left-24 top-1/2 w-12 md:w-16 opacity-50 hidden md:block transform -scale-x-100 rotate-[15deg]" /> */}
        </motion.div>

        {/* Floating Element 4: Multiple Languages */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: [12, -10, 12] }}
          transition={{ opacity: { delay: 0.5 }, x: { delay: 0.5 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[15%] right-[5%] md:right-[10%] flex flex-col items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-30"
        >
          <span className="text-sm font-semibold text-gray-700 mb-2 font-handwriting">Design in multiple<br />Language</span>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">ગુજરાતી</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs opacity-50">हिन्दी</span>
          </div>
          <img src="/arrow.png" alt="arrow" className="absolute -left-16 md:-left-24 bottom-1/2 w-12 md:w-16 opacity-50 hidden md:block transform -scale-x-100 -scale-y-100 -rotate-12" />
        </motion.div>

        {/* Center Videos View */}
        <div className="relative w-[300px] md:w-[500px] h-auto flex flex-col md:flex-row items-center justify-center gap-4 z-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="w-[200px] md:w-[250px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl relative z-10 transform md:-rotate-6 md:translate-x-10"
          >
            <video
              src="videos/hero_video_1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Fallback pattern if video missing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 opacity-50 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-[220px] md:w-[280px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl relative z-20 md:transform md:-translate-x-5"
          >
            <video
              src="videos/hero_video_2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Fallback pattern if video missing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-orange-400 opacity-50 -z-10" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
