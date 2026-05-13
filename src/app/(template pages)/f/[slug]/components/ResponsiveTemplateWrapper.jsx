// components/ResponsiveTemplateWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import FloralTemplateMobile from "./mobile/FloralTemplateMobile";
import MusicPlayer from "@/components/MusicPlayer";
import FloralTemplateDesktop from "./desktop/FloralTemplateDesktop";

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
            {isMobile ? <FloralTemplateMobile {...props} /> :
                <div className="min-h-screen w-full bg-[#fdf6ee]"
                    style={{
                        backgroundImage: `url('/bg/pinkbg.webp')`,
                        backgroundPosition: "top",
                        backgroundAttachment: "fixed",
                        backgroundColor: '#FFEAED'
                    }}>
                    <div className="w-full max-w-[940px] mx-auto">
                        <FloralTemplateDesktop {...props} />
                    </div>
                </div>

            }
            <MusicPlayer url={props.invitation?.mainDetails?.musicUrl} />
        </>
    );
}