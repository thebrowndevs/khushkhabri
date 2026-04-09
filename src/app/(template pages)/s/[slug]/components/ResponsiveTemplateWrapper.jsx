// components/ResponsiveTemplateWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import SikhTemplateMobile from "./mobile/SikhTemplateMobile";
import SikhTemplateDesktop from "./desktop/SikhTemplateDesktop";
import MusicPlayer from "@/components/MusicPlayer";

export default function ResponsiveTemplateWrapper(props) {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 700);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    if (isMobile === null) return null; // prevent hydration mismatch

    return (
        <>
            {isMobile ? (
                <SikhTemplateMobile {...props} />
            ) : (
                <div className="min-h-screen w-full bg-[#fdf6ee]"
                    style={{
                        backgroundImage: `url('/bg/pinkbg.png')`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px',
                        backgroundOpacity: 0.3
                    }}>
                    <div className="w-full max-w-[940px] mx-auto">
                        <SikhTemplateDesktop {...props} />
                    </div>
                </div>
            )}
            <MusicPlayer url={props.invitation?.mainDetails?.musicUrl} />
        </>
    );
}