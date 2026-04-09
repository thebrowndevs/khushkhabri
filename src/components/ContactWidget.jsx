// components/ContactWidget.jsx
"use client";
import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

export default function ContactWidget({ phone = "+918744043846" }) {
  const waNumber = phone.replace(/\+/g, ""); // wa.me link ke liye

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
      <div className="flex w-full">
        {/* CALL (Primary) */}
        <a
          href={`tel:${phone}`}
          className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 font-semibold text-sm sm:text-base"
        >
          <FaPhone className="text-lg sm:text-xl animate-bounce-slow" />
          <span>Call Now</span>
        </a>

        {/* WHATSAPP (Secondary) */}
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white py-4 font-semibold text-sm sm:text-base"
        >
          <FaWhatsapp className="text-lg sm:text-xl animate-pulse-slow" />
          <span>WhatsApp</span>
        </a>
      </div>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2.2s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
}
