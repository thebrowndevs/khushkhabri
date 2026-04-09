"use client";

export default function CloudStatic() {
    return (
        <img
            src="/templates/temple/cloud.png"
            alt="cloud"
            className="absolute object-contain pointer-events-none z-10"
            style={{
                width: "260px",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "18%",   // 👈 tune kar sakta hai
                opacity: 0.85,
            }}
        />
    );
}