"use client";

import React, { useState } from 'react';
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { BiLockAlt } from "react-icons/bi";
import Image from 'next/image';

// Zod schema for phone-only form
// const phoneSchema = z.object({
//     phone: z.string().regex(/^\d{10}$/, { message: "Enter a valid 10-digit phone number" }),
// });

const AuthDialog = ({ open, onOpenChange }) => {
    // const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // const form = useForm({
    //     resolver: zodResolver(phoneSchema),
    //     defaultValues: { phone: '' },
    //     mode: 'onSubmit',
    // });

    // const handlePhoneSignIn = form.handleSubmit(async (values) => {
    //     setErrorMsg('');
    //     setIsLoading(true);

    //     try {
    //         const result = await signIn('otp', {
    //             redirect: false,
    //             phone: values.phone,
    //             sessionId: 'ABCX',
    //             otp: '8568',
    //         });

    //         if (result?.error) {
    //             if (result.error.includes('Invalid user')) {
    //                 setErrorMsg('Admin users must login through the admin panel');
    //             } else {
    //                 setErrorMsg(result.error);
    //             }
    //         } else {
    //             onOpenChange(false);
    //             window.location.href = result?.url || '/user';
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         setErrorMsg(error ? error.message : 'Login failed. Please try again.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // });

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setErrorMsg('');
        try {
            await signIn('google', { callbackUrl: '/user' });
        } catch (error) {
            console.error('Google login error:', error);
            setErrorMsg('Google login failed. Please try again.');
            setIsGoogleLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-0 bg-white shadow-2xl rounded-3xl">
                <div className="relative h-32 bg-gradient-to-r from-[#ff7eb3]/50 to-[#ff758c]/50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-[-10%] left-[-10%] w-32 h-32 rounded-full bg-white blur-2xl"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 rounded-full bg-white blur-2xl"></div>
                    </div>
                    {/* <div className="z-10 bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 shadow-inner"> */}
                    <Image src="/logo.png" alt="Khushkhabri Logo" width={160} height={160} className="object-contain" />
                    {/* </div> */}
                </div>

                <div className="p-8 pt-6">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-center text-3xl font-extrabold text-[#5a1e2b] tracking-tight">
                            Welcome Back
                        </DialogTitle>
                        <p className="text-center text-[#7a2535]/70 font-medium mt-2">
                            Create memories that last forever. <br />
                            Sign in to continue your journey.
                        </p>
                    </DialogHeader>

                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full py-7 flex items-center justify-center gap-4 bg-[#f8f9fa] border-2 border-[#f1f3f5] rounded-2xl hover:bg-[#f1f3f5] transition-all duration-300 group shadow-sm hover:shadow-md"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                    >
                        {isGoogleLoading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-[#7a2535] border-t-transparent rounded-full animate-spin"></div>
                                <span className="font-semibold text-[#5a1e2b]">Connecting...</span>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <FcGoogle className="text-2xl" />
                                </div>
                                <span className="text-lg font-bold text-[#5a1e2b]">Continue with Google</span>
                            </>
                        )}
                    </Button>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-widest">
                        <BiLockAlt className="text-sm" />
                        <span>Secure authenticated login</span>
                    </div>

                    {errorMsg && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                            {errorMsg}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
