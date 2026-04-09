"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

export default function MusicPlayer({ url }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const mediaRef = useRef(null);

    useEffect(() => {
        if (!url || !mediaRef.current) return;

        const media = mediaRef.current;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        media.addEventListener("play", handlePlay);
        media.addEventListener("pause", handlePause);

        const playWithSound = async () => {
            try {
                media.currentTime = 0;
                media.volume = 1;
                media.muted = false;

                await media.play();

                setIsPlaying(true);
                console.log("Direct autoplay with sound worked");
            } catch (err) {
                console.log("Direct autoplay blocked", err);

                // fallback only if browser blocks it
                try {
                    media.muted = true;
                    await media.play();

                    // immediately try to unmute after slight delay
                    setTimeout(() => {
                        media.muted = false;
                    }, 100);

                    setIsPlaying(true);
                } catch (e) {
                    console.log("Muted fallback also failed", e);
                }
            }
        };

        // try immediately
        playWithSound();

        // Samsung browser / page restore sometimes works better on pageshow
        const handlePageShow = () => {
            playWithSound();
        };

        window.addEventListener("pageshow", handlePageShow);

        // real interaction fallback
        const unlock = async () => {
            try {
                media.muted = false;
                media.volume = 1;

                if (media.paused) {
                    await media.play();
                }

                setIsPlaying(true);
            } catch (e) {
                console.log("unlock failed", e);
            }
        };

        ["click", "touchstart", "scroll"].forEach((event) => {
            window.addEventListener(event, unlock, { once: true });
        });

        return () => {
            media.removeEventListener("play", handlePlay);
            media.removeEventListener("pause", handlePause);
            window.removeEventListener("pageshow", handlePageShow);

            ["click", "touchstart", "scroll"].forEach((event) => {
                window.removeEventListener(event, unlock);
            });
        };
    }, [url]);

    const togglePlay = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const media = mediaRef.current;
        if (!media) return;

        try {
            if (media.paused) {
                media.muted = false;
                media.volume = 1;
                await media.play();
            } else {
                media.pause();
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!url) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <video
                ref={mediaRef}
                autoPlay
                playsInline
                loop
                preload="auto"
                style={{ display: "none" }}
            >
                <source src={url} type="audio/mpeg" />
            </video>

            <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white text-[#8b2c3c] shadow-xl flex items-center justify-center"
            >
                {isPlaying ? (
                    <div className="flex gap-[2px]">
                        <div className="w-[3px] h-3 bg-current animate-pulse rounded-full" />
                        <div className="w-[3px] h-5 bg-current animate-pulse rounded-full" />
                        <div className="w-[3px] h-4 bg-current animate-pulse rounded-full" />
                    </div>
                ) : (
                    <Play className="fill-current ml-0.5" size={20} />
                )}
            </button>
        </div>
    );
}