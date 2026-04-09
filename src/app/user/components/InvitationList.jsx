"use client"
import React from 'react';
import { format } from 'date-fns';
import { ExternalLink, Copy, Edit, Check, Trash2, Link2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog ';

export default function InvitationList({ invitations }) {
    const router = useRouter();
    const [copiedId, setCopiedId] = React.useState(null);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

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

    if (!invitations || invitations.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 px-4">
                <h3 className="text-2xl font-bold text-gray-900">Your Custom Invitations</h3>
                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">
                    {invitations.length}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {invitations.map((invite) => (
                    <div
                        key={invite._id}
                        className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#8b2c3c]/5 rounded-2xl flex items-center justify-center text-[#8b2c3c]">
                                <ExternalLink size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">
                                    {invite.weddingDetails?.groom?.name} & {invite.weddingDetails?.bride?.name}
                                </h4>
                                <p className="text-gray-500 text-sm">
                                    Wedding on {invite.weddingDetails?.weddingDate ? format(new Date(invite.weddingDetails.weddingDate), 'MMMM d, yyyy') : 'Date not set'}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 text-[#8b2c3c] bg-[#8b2c3c]/5 px-2 py-0.5 rounded-lg w-fit">
                                    <Link2 size={12} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{invite.slug}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={`?inviteId=${invite._id}`}
                                className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                                title="Edit Invitation"
                            >
                                <Edit size={20} />
                            </Link>

                            <button
                                onClick={() => copyLink(invite.slug, invite._id, invite.themeName)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all border border-gray-100"
                            >
                                {copiedId === invite._id ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                                <span>{copiedId === invite._id ? 'Copied!' : 'Copy Link'}</span>
                            </button>

                            <a
                                href={`/${getPrefixForTheme(invite.themeName)}/${invite.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all"
                                title="Preview Invitation"
                            >
                                <ExternalLink size={20} />
                            </a>

                            <button
                                onClick={() => {
                                    setDeleteId(invite._id);
                                    setIsDeleting(true);
                                }}
                                className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all border border-red-100"
                                title="Delete Invitation"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmationDialog
                isOpen={isDeleting}
                onOpenChange={setIsDeleting}
                onConfirm={handleDelete}
                isLoading={loading}
                title="Delete Invitation"
                description="Are you sure you want to delete this invitation? This action cannot be undone."
            />
        </div>
    );
}
