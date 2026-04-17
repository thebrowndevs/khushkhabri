"use client"
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';

export default function CreateCustomizationButton({ orderId, isDisabled }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreateCustomization = async () => {
        setLoading(true);
        const toastId = toast.loading("Creating new invitation...");

        try {
            const res = await fetch("/api/invitation/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    isCustomization: true,
                    isCreateNew: true
                }),
            });

            if (res.ok) {
                toast.success("New invitation created! Edit it below.", { id: toastId });
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create invitation", { id: toastId });
            }
        } catch (err) {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-sm md:rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Create Custom Invitation</h3>
                <p className="text-xs md:text-sm text-gray-500">
                    {isDisabled 
                        ? "Please complete and save the Main Information above first to unlock invitation creation."
                        : "Generate a new custom invitation link for a specific side (Bride/Groom) and event selection."}
                </p>
            </div>
            
            <button
                type="button"
                onClick={handleCreateCustomization}
                disabled={isDisabled || loading}
                className={`px-6 py-3.5 md:px-8 md:py-4 rounded-sm md:rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all w-full md:w-auto
                    ${isDisabled 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                        : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                    }`}
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <PlusCircle size={18} className="md:w-5 md:h-5" />
                )}
                <span>{loading ? 'Creating...' : 'Create Invitation'}</span>
            </button>
        </div>
    );
}
