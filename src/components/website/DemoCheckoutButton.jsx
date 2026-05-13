"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthDialog from "@/components/auth/LoginDialog";
import { Sparkles } from "lucide-react";

export default function DemoCheckoutButton({ themeName }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleBuyNow = async () => {
        if (!themeName) {
            toast.error("Theme name is missing.");
            return;
        }

        // If not logged in, open login dialog
        if (!session) {
            setIsLoginDialogOpen(true);
            return;
        }

        const toastId = toast.loading("Creating order...");
        setIsProcessing(true);

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
                setIsProcessing(false);
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
                        body: JSON.stringify({
                            ...response,
                            themeName,
                            userId: session.user.id,
                            amount: 4000,
                        }),
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        toast.success("Theme purchased successfully! 🎉", { id: toastId });
                        setIsProcessing(false);
                        router.push("/user");
                    } else {
                        toast.error("Payment verification failed", { id: toastId });
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: session.user?.name || "",
                    email: session.user?.email || "",
                },
                theme: { color: "#8b2c3c" },
                modal: {
                    ondismiss: () => {
                        toast.dismiss(toastId);
                        toast.error("Payment cancelled");
                        setIsProcessing(false);
                    },
                },
            };

            new window.Razorpay(options).open();
        } catch (err) {
            console.error("Buy theme error:", err);
            toast.dismiss(toastId);
            toast.error("Something went wrong");
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none">
                <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-2xl border border-gray-100 flex items-center justify-between gap-4 w-max animate-in slide-in-from-bottom-5 duration-500">
                    <div className="hidden sm:flex flex-col select-none pr-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Live Demo</span>
                        <span className="text-sm font-bold text-gray-900">Get this template</span>
                    </div>
                    <button
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-[#8b2c3c] text-white rounded-full font-bold text-sm hover:bg-[#5a1e2b] transition-all shadow-md flex items-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        <Sparkles size={16} className={`${isProcessing ? 'animate-pulse' : ''}`} />
                        {isProcessing ? 'Processing' : 'Buy Now - ₹101'}
                    </button>
                </div>
            </div>

            {isLoginDialogOpen && (
                <AuthDialog
                    isOpen={isLoginDialogOpen}
                    onClose={() => setIsLoginDialogOpen(false)}
                />
            )}
        </>
    );
}
