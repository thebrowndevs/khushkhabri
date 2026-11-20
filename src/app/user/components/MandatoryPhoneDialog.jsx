"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaWhatsapp } from "react-icons/fa";
import { FiLogOut, FiShield, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";

export default function MandatoryPhoneDialog() {
    const { data: session, status, update } = useSession();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [hasCheckedDb, setHasCheckedDb] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            // If phone is already present in session, no need to show popup
            if (session.user.phone && session.user.phone.trim().length >= 10) {
                setIsOpen(false);
                return;
            }

            // Otherwise, double check from backend /api/users/[id]
            if (!hasCheckedDb && session.user.id) {
                fetch(`/api/users/${session.user.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setHasCheckedDb(true);
                        if (data.success && data.user?.phone && data.user.phone.trim().length >= 10) {
                            // Update session with DB phone
                            update({ phone: data.user.phone });
                            setIsOpen(false);
                        } else {
                            setIsOpen(true);
                        }
                    })
                    .catch(() => {
                        setHasCheckedDb(true);
                        setIsOpen(true);
                    });
            } else if (!session.user.phone) {
                setIsOpen(true);
            }
        } else if (status === "unauthenticated") {
            setIsOpen(false);
        }
    }, [status, session?.user?.phone, session?.user?.id, hasCheckedDb, update]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const cleanPhone = phone.trim().replace(/\D/g, "");
        if (cleanPhone.length !== 10) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/user/phone", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: cleanPhone }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.message || "Failed to save phone number. Please try again.");
                setLoading(false);
                return;
            }

            toast.success("WhatsApp number registered successfully! 🎉");
            // Update client session with the new phone
            await update({ phone: data.phone || cleanPhone });
            setIsOpen(false);
        } catch (err) {
            console.error("Phone submit error:", err);
            setError("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent
                className="sm:max-w-[440px] p-0 overflow-hidden border-0 bg-white shadow-2xl rounded-3xl [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                {/* Header Banner */}
                <div className="relative bg-gradient-to-br from-[#0c3928] via-[#082e1f] to-[#041d13] p-6 text-white text-center overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* <div className="w-14 h-14 rounded-2xl bg-[#128C7E]/40 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-lg mb-3"> */}
                        <FaWhatsapp className="text-6xl mb-3 text-emerald-400" />
                        {/* </div> */}
                        <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                            Link Your WhatsApp Number
                        </DialogTitle>
                        {/* <DialogDescription className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-[320px]">
                            We need your WhatsApp number to deliver your invitations, RSVP updates, and order confirmations.
                        </DialogDescription> */}
                    </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-7 pt-0 sm:pt-0">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                WhatsApp Number
                            </label>
                            <div className="relative flex items-center">
                                {/* <span className="absolute left-3.5 text-sm font-semibold text-gray-500 border-r border-gray-200 pr-2.5">
                                    +91
                                </span> */}
                                <Input
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    placeholder="991XX XXXXX"
                                    value={phone}
                                    onChange={(e) => {
                                        setError("");
                                        setPhone(e.target.value.replace(/\D/g, ""));
                                    }}
                                    className=" h-12 rounded-xl border-gray-200 focus:border-[#0a5c36] focus:ring-[#0a5c36] text-base font-medium tracking-wide"
                                    autoFocus
                                    required
                                />
                            </div>
                            {/* <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                                <FiShield className="text-emerald-600 shrink-0" />
                                Your phone number is kept secure and never shared.
                            </p> */}
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl flex items-center gap-2">
                                <FiAlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || phone.trim().length !== 10}
                            className="w-full h-12 bg-[#0a5c36] hover:bg-[#074729] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-emerald-950/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving Number...</span>
                                </div>
                            ) : (
                                <>
                                    <FaWhatsapp className="text-lg text-emerald-300" />
                                    <span>Continue to Dashboard</span>
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Bottom Logout Option if user wants to switch account */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>Signed in as <strong className="text-gray-600">{session?.user?.email}</strong></span>
                        <button
                            type="button"
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                        >
                            <FiLogOut className="text-xs" />
                            Log Out
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
