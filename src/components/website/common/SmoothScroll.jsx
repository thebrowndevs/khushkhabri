// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";

// export default function SmoothScroll({ children }) {
//     useEffect(() => {
//         const lenis = new Lenis({
//             duration: 2.2,
//             lerp: 0.05,
//             direction: "vertical",
//             gestureDirection: "vertical",
//             smooth: true,
//             mouseMultiplier: 1.1,
//             touchMultiplier: 2,
//             smoothTouch: true,
//             syncTouch: true,
//             infinite: false,
//         });

//         function raf(time) {
//             lenis.raf(time);
//             requestAnimationFrame(raf);
//         }

//         requestAnimationFrame(raf);

//         return () => {
//             lenis.destroy();
//         };
//     }, []);

//     return <>{children}</>;
// }

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
    useEffect(() => {

        const lenis = new Lenis({
            smoothWheel: true,
            smoothTouch: true,

            // 💎 same feel everywhere
            duration: 2.4,
            lerp: 0.045,

            // 🎯 CONTROL SPEED (main part)
            wheelMultiplier: 0.6,
            touchMultiplier: 0.45,

            // ❌ avoid weird jumps
            syncTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
}