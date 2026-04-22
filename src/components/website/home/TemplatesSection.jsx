"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import AuthDialog from "@/components/auth/LoginDialog";
import Link from "next/link";

import { THEMES } from "@/lib/constants/themes";

export default function TemplatesSection() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [buyingTheme, setBuyingTheme] = useState(null); // tracks which theme is being purchased
    const [themePrice, setThemePrice] = useState(null);

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    // Fetch price from DB (all themes same price, so just get one)
    useEffect(() => {
        async function fetchPrice() {
            try {
                const res = await fetch("/api/themes");
                const data = await res.json();
                if (data.themes?.length > 0) {
                    setThemePrice({
                        original: data.themes[0].originalPrice,
                        discounted: data.themes[0].discountedPrice
                    });
                }
            } catch (err) {
                console.error("Failed to fetch theme price:", err);
            }
        }
        fetchPrice();
    }, []);

    const handleBuyNow = async (themeName) => {
        // If not logged in, open login dialog
        if (!session) {
            setBuyingTheme(themeName);
            setIsLoginDialogOpen(true);
            return;
        }

        const toastId = toast.loading("Creating order...");
        setBuyingTheme(themeName);

        try {
            // Create order
            const res = await fetch("/api/theme-order/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ themeName, userId: session.user.id }),
            });
            const data = await res.json();

            if (!res.ok || !data.razorpayOrderId) {
                toast.error(data.error || "Failed to create order", { id: toastId });
                setBuyingTheme(null);
                return;
            }

            // Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency || "INR",
                name: "Khushkhabri",
                description: `Buy Theme: ${themeName}`,
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    // Verify payment
                    toast.loading("Verifying payment...", { id: toastId });
                    const verifyRes = await fetch("/api/theme-order/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        // body: JSON.stringify(response),
                        body: JSON.stringify({
                            ...response,
                            themeName,
                            userId: session.user.id,
                            amount: themePrice?.discounted || 4000,
                        }),
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        toast.success("Theme purchased successfully! 🎉", { id: toastId });
                        setBuyingTheme(null);
                        router.push("/user");
                    } else {
                        toast.error("Payment verification failed", { id: toastId });
                        setBuyingTheme(null);
                    }
                },
                prefill: {
                    name: session.user?.name || "",
                    email: session.user?.email || "",
                },
                theme: { color: "#8b2c3c" },
                modal: {
                    ondismiss: () => {
                        toast.dismiss(toastId); // 👈 loading hatao
                        toast.error("Payment cancelled"); // 👈 new toast
                        setBuyingTheme(null);
                    },
                },
            };

            new window.Razorpay(options).open();
        } catch (err) {
            console.error("Buy theme error:", err);
            toast.dismiss(toastId);
            toast.error("Something went wrong");
            setBuyingTheme(null);
        }
    };

    // After login, retry the purchase
    useEffect(() => {
        if (session && buyingTheme && !isLoginDialogOpen) {
            handleBuyNow(buyingTheme);
        }
    }, [session, isLoginDialogOpen]);

    const discountedPrice = themePrice?.discounted || 4000;
    const originalPrice = themePrice?.original || 7000;
    const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

    return (
        <>
            <section className="relative w-full pt-20 pb-0 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-5xl font-semibold text-[#5a1e2b] tracking-tighter max-w-3xl mx-auto"
                        >
                            Choose a Design Your Family Will Be Proud to Share
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-4 text-gray-700 text-lg sm:text-xl"
                        >
                            Browse our handpicked collection of invitation designs
                        </motion.p>

                        {/* Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6"
                        >
                            {[
                                { icon: "✔", text: "RSVP Ready" },
                                { icon: "⚡", text: "Editable Instantly" },
                                { icon: "📱", text: "Mobile Friendly" },
                                { icon: "🚀", text: "Publish in 10 min" },
                            ].map((badge, idx) => (
                                <span key={idx} className="flex items-center gap-2 bg-[#fff5f6] text-[#8b2c3c] border border-[#8b2c3c]/20 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
                                    <span className="text-base">{badge.icon}</span>
                                    {badge.text}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-7 sm:gap-10">
                        {THEMES.map((theme) => (
                            <motion.div
                                key={theme.id}
                                className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-white/50 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] max-w-[360px]"
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-gray-100 group">
                                    <a href={`${theme.demoUrl}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                        {/* Desktop Image */}
                                        <Image
                                            src={theme.image}
                                            alt={theme.title}
                                            fill
                                            className="hidden sm:block object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                                        />
                                        {/* Mobile Mockup */}
                                        <Image
                                            src={theme.mobileImage}
                                            alt={theme.title}
                                            fill
                                            className="block sm:hidden object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                                        />
                                    </a>

                                    {/* Discount Badge */}
                                    <div className="absolute top-4 left-4 bg-[#8b2c3c] text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg z-20 animate-pulse">
                                        {discountPercent}% OFF
                                    </div>

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#8b2c3c] shadow-sm z-10">
                                        {theme.category}
                                    </div>

                                    {/* Most Loved Badge for Royal Palace */}
                                    {theme.title === "Royal Palace" && (
                                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 z-10">
                                            ❤️ Most Loved
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center px-2 flex flex-col flex-1">
                                    <h3 className="text-2xl font-semibold text-[#5a1e2b] mb-1">{theme.title}</h3>
                                    <p className="text-gray-500 text-xs mb-2 flex-1 line-clamp-2">{theme.description}</p>

                                    {/* Footer Section: Price & Actions */}
                                    <div className="w-full mt-auto pt-2 border-t border-gray-100 flex flex-col gap-4">
                                        <div className="flex items-end justify-between px-1">
                                            <div className="flex flex-col text-left">
                                                <span className="text-xs text-gray-400 line-through font-medium leading-none mb-1.5">
                                                    ₹{originalPrice.toLocaleString()}
                                                </span>
                                                <span className="text-2xl font-bold text-[#8b2c3c] leading-none">
                                                    ₹{discountedPrice.toLocaleString()}
                                                </span>
                                            </div>
                                            <a
                                                href={theme.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-semibold text-[#8b2c3c] hover:text-[#5a1e2b] flex items-center gap-1 transition-colors"
                                            >
                                                See Live Demo <span className="text-lg leading-none mb-0.5">→</span>
                                            </a>
                                        </div>

                                        <button
                                            onClick={() => handleBuyNow(theme.themeName)}
                                            disabled={buyingTheme === theme.themeName}
                                            className="w-full py-3 bg-[#8b2c3c] text-white rounded-xl text-sm font-medium hover:bg-[#5a1e2b] transition-all disabled:opacity-60 disabled:cursor-wait shadow-sm hover:shadow-md"
                                        >
                                            {buyingTheme === theme.themeName ? "..." : "Get This Template"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Login Dialog */}
            <AuthDialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
            />
            <Toaster position="top-right" richColors />
        </>
    );
}
