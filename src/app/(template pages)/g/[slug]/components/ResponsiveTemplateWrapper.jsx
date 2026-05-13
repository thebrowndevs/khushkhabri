"use client";

import { useEffect, useState } from "react";
import GurujiTemplateMobile from "./mobile/GurujiTemplateMobile";
import MusicPlayer from "@/components/MusicPlayer";
import GurujiTemplateDesktop from "./desktop/GurujiTemplateDesktop";

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
            {isMobile ? <GurujiTemplateMobile {...props} /> :

                <div className="min-h-screen w-full bg-[#fdf6ee]"
                    style={{
                        backgroundImage: `url('/bg/pinkbg.webp')`,
                        backgroundPosition: "top",
                        backgroundAttachment: "fixed",
                        backgroundColor: '#FFEAED'
                    }}>
                    <div className="w-full max-w-[440px] mx-auto">
                        <GurujiTemplateDesktop {...props} />
                    </div>
                </div>
            }
            {props.invitation?.satsangDetails?.musicUrl && (
                <MusicPlayer url={props.invitation.satsangDetails.musicUrl} />
            )}
        </>
    );
}
