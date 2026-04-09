"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactSection({bgColor}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully");

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }

    setLoading(false);
  };

  return (
    <section className="w-[95%] lg:w-[85%] max-w-6xl mx-auto pb-6 relative z-10 transition-all duration-300">
      <div className={`backdrop-blur-lg bg-white/40 border-2 border-[#efd4d8] rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500`}>
        {/* heading */}

        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#5a1e2b] mb-4">
            Let’s Create Your Special Invitation
          </h2>

          <p className="text-gray-800 max-w-lg mx-auto text-base lg:text-lg font-medium leading-relaxed">
            Have questions about your invitation website or need help getting
            started? Send us a message and we will happily assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* left side */}

          <div className="flex flex-col justify-between h-full">
            <div className="bg-white/50 p-6 rounded-2xl border border-white/60 mb-8 backdrop-blur-sm shadow-sm">
              <h3 className="text-xl font-bold text-[#5a1e2b] mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-[#5a1e2b]/30"></span>
                Contact Details
              </h3>

              <div className="space-y-6 text-gray-900 font-medium">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-[#7a2535] text-lg" />
                  </div>
                  <a href="mailto:khushkhabari@gmail.com" className="hover:text-[#7a2535] transition-colors">
                    khushkhabari@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <FaPhone className="text-[#7a2535] text-lg" />
                  </div>
                  <a href="tel:+918878789898" className="hover:text-[#7a2535] transition-colors">
                    +91 8878789898
                  </a>
                </div>
              </div>
            </div>

            {/* wedding image placeholder/illustration */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mt-4 flex-grow flex justify-center lg:justify-start"
            >
              <Image
                src="/contact-sticker.png"
                alt="Wedding Illustration"
                width={260}
                height={260}
                className="opacity-90 h-full w-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* form */}

          <form onSubmit={handleSubmit} className="space-y-4 bg-white/30 p-6 lg:p-8 rounded-2xl border border-white/40 backdrop-blur-sm shadow-sm">
            <InputField
              icon={<FaUser />}
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <InputField
              icon={<FaPhone />}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <InputField
              icon={<FaEnvelope />}
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Tell us about your invitation needs..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-white/70 border border-[#e7d3d7] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7a2535]/20 focus:border-[#7a2535] transition-all text-gray-800 placeholder:text-gray-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7a2535] text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#5a1e2b] transform hover:translate-y-[-2px] active:translate-y-0 shadow-lg hover:shadow-xl transition-all font-bold text-lg"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <FaPaperPlane className="text-base" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Toaster position="top-right" />
    </section>
  );
}

function InputField({ icon, ...props }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a2535] group-focus-within:scale-110 transition-transform z-10">
        {icon}
      </div>

      <input
        {...props}
        className="w-full bg-white/70 border border-[#e7d3d7] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#7a2535]/20 focus:border-[#7a2535] transition-all text-gray-800 placeholder:text-gray-500"
      />
    </div>
  );
}

