// components/ResponsiveTemplateWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import TempleTemplateMobile from "./mobile/TempleTemplateMobile";
import MusicPlayer from "@/components/MusicPlayer";
import TempleTemplateDesktop from "./desktop/TempleTemplateDesktop";

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
            {isMobile ? <TempleTemplateMobile {...props} /> :
                <div className="min-h-screen w-full bg-[#fdf6ee]"
                    style={{
                        backgroundImage: `url('/bg/pinkbg.webp')`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px',
                        backgroundOpacity: 0.3
                    }}>
                    <div className="w-full max-w-[940px] mx-auto">
                        <TempleTemplateDesktop {...props} />
                    </div>
                </div>

            }
            <MusicPlayer url={props.invitation?.mainDetails?.musicUrl} />
        </>
    );
}