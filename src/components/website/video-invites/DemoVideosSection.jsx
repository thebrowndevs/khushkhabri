"use client";

import React from "react";
import { FaWhatsapp, FaPlay } from "react-icons/fa";

export default function DemoVideosSection() {
  const WHATSAPP_NUMBER = "918878789898";

  const demoVideos = [
    { id: "1101", title: "Premium Wedding Flow", videoUrl: "videos/hero_video_2.mp4" },
    { id: "1102", title: "Royal Caricature Invite", videoUrl: "videos/hero_video_2.mp4" },
    { id: "1103", title: "Elegant Floral Story", videoUrl: "videos/hero_video_2.mp4" },
    { id: "1104", title: "Modern Minimalist", videoUrl: "videos/hero_video_2.mp4" },
  ];

  const handleOrderClick = (videoId) => {
    const text = `Hello! I'd like to place an order for the video with video ID ${videoId}, and I have a few questions to ask.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 relative z-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#5a1e2b] mb-4">
          Explore Our Demo Videos
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch our high-quality premium video invitation samples. Love what you see? Order easily via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {demoVideos.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300">
            {/* Video Container */}
            <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden mb-4 group">
              <video
                src={item.videoUrl}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                controls
              />
              {/* Optional custom play overlay if controls are hidden
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaPlay className="text-white text-2xl ml-1" />
                </div>
              </div> */}
            </div>

            <div className="text-center flex-grow flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Video ID: {item.id}</span>
                <h3 className="font-bold text-gray-800 text-lg mt-1 mb-4">{item.title}</h3>
              </div>

              <button
                onClick={() => handleOrderClick(item.id)}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <FaWhatsapp className="text-xl" />
                Order via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
