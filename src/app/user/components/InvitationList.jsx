"use client"
import React from 'react';
import { format } from 'date-fns';
import { ExternalLink, Copy, Edit, Check, Trash2, Link2, PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog ';

export default function InvitationList({ invitations, orderId, isDisabled }) {
    const router = useRouter();
    const [copiedId, setCopiedId] = React.useState(null);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);

    const handleCreateCustomization = async () => {
        setIsCreating(true);
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
            setIsCreating(false);
        }
    };

    const getPrefixForTheme = (themeName) => {
        switch (themeName) {
            case 'sikh1': return 's';      // Laavan
            case 'hindu1': return 'r';     // Royal Palace
            case 'hindu2': return 't';     // Temple Divine
            case 'hindu3': return 'f';     // Floral Elegance
            case 'guruji1': return 'g';    // Guruji Satsang
            default: return 's';
        }
    };

    const copyLink = (slug, id, themeName) => {
        const prefix = getPrefixForTheme(themeName);
        const url = `${window.location.origin}/${prefix}/${slug}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/invitation/delete?id=${deleteId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success("Invitation deleted successfully");
                setIsDeleting(false);
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete invitation");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <>
            <div className="bg-white rounded-sm md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header + Create Button */}
                <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">Your Custom Invitations</h3>
                        <span className="bg-[#8b2c3c]/10 text-[#8b2c3c] px-3 py-1 rounded-full text-xs font-bold">
                            {invitations?.length || 0}
                        </span>
                    </div>

                    <div className="flex items-center">
                        {/* Create Button */}
                        <button
                            type="button"
                            onClick={handleCreateCustomization}
                            disabled={isDisabled || isCreating}
                            className={`px-4 py-2.5 md:px-5 md:py-3 rounded-sm md:rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all w-full md:w-auto
                            ${isDisabled
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                    : 'bg-[#8b2c3c] text-white hover:bg-[#5a1e2b] shadow-sm border border-transparent'
                                }`}
                            title={isDisabled ? "Complete main info above first" : "Create a new invitation"}
                        >
                            {isCreating ? (
                                <div className="w-4 h-4 border-2 border-[#8b2c3c]/30 border-t-[#8b2c3c] rounded-full animate-spin" />
                            ) : (
                                <PlusCircle size={16} />
                            )}
                            <span>{isCreating ? 'Creating...' : 'Create Invitation'}</span>
                        </button>
                    </div>
                </div>

                {/* List Body */}
                <div className="p-5 md:p-6 bg-gray-50/50">
                    {!invitations || invitations.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-gray-200 rounded-sm md:rounded-xl p-8 md:p-12 text-center">
                            <p className="text-sm md:text-base text-gray-400 font-medium mb-1">No Invitations yet.</p>
                            <p className="text-xs md:text-sm text-gray-400">Click "Create Invitation" above to generate a new link for a specific side.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {invitations.map((invite) => (
                                <div
                                    key={invite._id}
                                    className="bg-white rounded-sm md:rounded-[32px] p-5 md:p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6"
                                >
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base md:text-lg truncate max-w-[250px] sm:max-w-none">
                                                {invite.weddingDetails?.groom?.name} & {invite.weddingDetails?.bride?.name}
                                            </h4>
                                            <p className="text-gray-500 text-xs md:text-sm">
                                                Wedding on {invite.weddingDetails?.weddingDate ? format(new Date(invite.weddingDetails.weddingDate), 'MMM d, yyyy') : 'Date not set'}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1 text-[#8b2c3c] bg-[#8b2c3c]/5 px-2 py-0.5 rounded-sm md:rounded-lg w-fit">
                                                <Link2 size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">{invite.slug}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 md:gap-3">
                                        <Link
                                            href={`?inviteId=${invite._id}`}
                                            className="flex-1 sm:w-auto h-auto sm:h-12 flex flex-row items-center justify-center gap-1.5 sm:gap-2 bg-gray-50 text-gray-700 rounded-sm sm:rounded-2xl hover:bg-gray-100 transition-all border border-gray-100 py-2.5 sm:py-0 px-3 sm:px-6 font-bold text-[11px] sm:text-sm"
                                            title="Edit Invitation"
                                        >
                                            <Edit size={14} className="sm:w-5 sm:h-5" />
                                            <span>Edit</span>
                                        </Link>

                                        <button
                                            onClick={() => copyLink(invite.slug, invite._id, invite.themeName)}
                                            className="flex-1 sm:w-auto h-auto sm:h-12 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 bg-gray-50 text-gray-700 rounded-sm sm:rounded-2xl font-bold text-[11px] sm:text-sm hover:bg-gray-100 transition-all border border-gray-100"
                                        >
                                            {copiedId === invite._id ? <Check size={14} className="text-green-600 sm:w-[18px] sm:h-[18px]" /> : <Copy size={14} className="sm:w-[18px] sm:h-[18px]" />}
                                            <span>{copiedId === invite._id ? 'Copied' : 'Share'}</span>
                                        </button>

                                        <a
                                            href={`/${getPrefixForTheme(invite.themeName)}/${invite.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:w-auto h-auto sm:h-12 flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-900 text-white rounded-sm sm:rounded-2xl hover:bg-gray-800 transition-all py-2.5 sm:py-0 px-3 sm:px-6 font-bold text-[11px] sm:text-sm min-w-max"
                                            title="Preview Invitation"
                                        >
                                            <ExternalLink size={14} className="sm:w-5 sm:h-5" />
                                            <span>Preview</span>
                                        </a>

                                        <button
                                            onClick={() => {
                                                setDeleteId(invite._id);
                                                setIsDeleting(true);
                                            }}
                                            className="w-10 sm:w-12 h-auto sm:h-12 py-2.5 sm:py-0 flex items-center justify-center bg-red-50 text-red-500 rounded-sm sm:rounded-2xl hover:bg-red-100 transition-all border border-red-100 shrink-0"
                                            title="Delete Invitation"
                                        >
                                            <Trash2 size={14} className="sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <DeleteConfirmationDialog
                isOpen={isDeleting}
                onOpenChange={setIsDeleting}
                onConfirm={handleDelete}
                isLoading={loading}
                title="Delete Invitation"
                description="Are you sure you want to delete this invitation? This action cannot be undone."
            />
        </>
    );
}
