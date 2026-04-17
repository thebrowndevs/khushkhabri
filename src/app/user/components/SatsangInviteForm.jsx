"use client"
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Share2, Copy, X, Music, CheckCircle2, ChevronDown, ChevronUp, Library } from 'lucide-react';
import { convertToBase64 } from '@/lib/services/convertToBase64';
import MusicSelectionDialog from './MusicSelectionDialog';

export default function SatsangInviteForm({ order, existingInvite }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isMusicUploading, setIsMusicUploading] = useState(false);
    const [isMusicLibraryOpen, setIsMusicLibraryOpen] = useState(false);
    
    // Fallbacks if existingInvite or order.satsangDetails exists
    const sourceData = existingInvite?.satsangDetails || order.satsangDetails || {};
    
    const [formData, setFormData] = useState({
        invitorName: sourceData.invitorName || '',
        date: sourceData.date ? new Date(sourceData.date).toISOString().split('T')[0] : '',
        time: sourceData.time || '1:00 PM Onwards',
        venue: sourceData.venue || '',
        mapLink: sourceData.mapLink || '',
        musicUrl: sourceData.musicUrl || '',
        contacts: sourceData.contacts?.length > 0 ? sourceData.contacts : [{ name: '', phone: '' }]
    });

    const [hasGeneratedLink, setHasGeneratedLink] = useState(!!existingInvite);
    const [isExpanded, setIsExpanded] = useState(!existingInvite);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContactChange = (index, field, value) => {
        const newContacts = [...formData.contacts];
        newContacts[index][field] = value;
        setFormData({ ...formData, contacts: newContacts });
    };

    const addContact = () => {
        if (formData.contacts.length >= 2) {
            toast.error("You can add maximum 2 contacts.");
            return;
        }
        setFormData({ ...formData, contacts: [...formData.contacts, { name: '', phone: '' }] });
    };

    const removeContact = (index) => {
        const newContacts = formData.contacts.filter((_, i) => i !== index);
        setFormData({ ...formData, contacts: newContacts });
    };

    const handleMusicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            toast.error("File too large. Max 10MB allowed.");
            return;
        }

        setIsMusicUploading(true);
        const toastId = toast.loading("Uploading music...");

        try {
            const base64 = await convertToBase64(file);
            const res = await fetch("/api/images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64 }),
            });

            const data = await res.json();
            if (res.ok) {
                setFormData({ ...formData, musicUrl: data.imageURL });
                toast.success("Music uploaded successfully!", { id: toastId });
            } else {
                toast.error(data.error || "Upload failed", { id: toastId });
            }
        } catch (err) {
            console.error("Music upload error:", err);
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setIsMusicUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Saving and Generating Link...");

        const cleanContacts = formData.contacts.filter(c => c.name.trim() || c.phone.trim());

        try {
            const res = await fetch("/api/invitation/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: order._id,
                    isSatsang: true,
                    satsangDetails: {
                        ...formData,
                        contacts: cleanContacts
                    }
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Saved successfully! 🎉", { id: toastId });
                setHasGeneratedLink(true);
                router.refresh();
            } else {
                toast.error(data.error || "Failed to save information", { id: toastId });
            }
        } catch (err) {
            console.error("Save invitation error:", err);
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="space-y-10">
            {/* Generated Link Alert (If already created) */}
            {hasGeneratedLink && existingInvite && (
                <div className="bg-[#8b2c3c]/5 border border-[#8b2c3c]/20 rounded-sm md:rounded-2xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 pr-0 md:pr-4 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-[#8b2c3c]/10 rounded-full flex items-center justify-center text-[#8b2c3c] shrink-0">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">Your Invitation is Ready!</h3>
                        </div>
                        <p className="text-gray-500 mb-6 text-xs md:text-sm">Your Guruji Satsang invitation link is live. Copy it to share with your family and friends via WhatsApp or social media.</p>
                        
                        <button
                            onClick={() => copyToClipboard(`${window.location.origin}/g/${existingInvite.slug.replace(/^\//, '')}`)}
                            className="flex items-center justify-center gap-2 px-6 py-3.5 md:py-4 bg-gray-900 text-white rounded-sm md:rounded-xl hover:bg-gray-800 transition-all shadow-md transform active:scale-[0.98] w-fit"
                            title="Copy Link"
                        >
                            <Copy size={16} className="md:w-5 md:h-5" />
                            <span className="text-sm md:text-base font-bold">Copy Invitation Link</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-sm md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-5 md:p-8">
                <div 
                    className={`flex justify-between items-center cursor-pointer group ${isExpanded ? 'mb-6 md:mb-8' : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#8b2c3c] transition-colors">Satsang Details</h2>
                        <p className="text-xs md:text-sm text-gray-500">Fill in the details for your Guruji Satsang invitation. Once saved, your shareable link will be generated automatically.</p>
                    </div>
                    <button type="button" className="p-2 md:p-2.5 bg-gray-50 hover:bg-[#8b2c3c]/10 text-gray-400 hover:text-[#8b2c3c] rounded-full transition-colors shrink-0">
                        {isExpanded ? <ChevronUp size={20} className="md:w-6 md:h-6" /> : <ChevronDown size={20} className="md:w-6 md:h-6" />}
                    </button>
                </div>

                {isExpanded && (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Event Details Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                <h3 className="font-bold text-gray-800">Event Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Invitor Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="invitorName"
                                        value={formData.invitorName}
                                        onChange={handleChange}
                                        placeholder="e.g. Khanna Family / Tushar Singh"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Date</label>
                                        <input
                                            required
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Time</label>
                                        <input
                                            required
                                            type="text"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            placeholder="e.g. 1 PM Onwards"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Venue (Full Address)</label>
                                    <textarea
                                        required
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="e.g. Khanna Residence, Ashoka Society, New Delhi"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Location Map Link (Google Maps)</label>
                                    <input
                                        type="url"
                                        name="mapLink"
                                        value={formData.mapLink}
                                        onChange={handleChange}
                                        placeholder="e.g. https://goo.gl/maps/..."
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contacts & Media Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                <h3 className="font-bold text-gray-800">Contact Details</h3>
                            </div>
                            <div className="space-y-4">
                                {formData.contacts.map((contact, index) => (
                                    <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl relative group">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={contact.name}
                                                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                                                    placeholder="Contact Name"
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={contact.phone}
                                                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                                                    placeholder="+91 9876543210"
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        {formData.contacts.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeContact(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {formData.contacts.length < 2 && (
                                    <button
                                        type="button"
                                        onClick={addContact}
                                        className="text-sm font-bold text-[#8b2c3c] hover:underline flex items-center gap-1"
                                    >
                                        + Add Another Contact
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Background Music Section */}
                    <div className="pt-8 md:pt-10 border-t border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Music className="text-[#8b2c3c]" size={20} />
                                Background Music
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-1">Select an MP3 file to play in the background of your invitation.</p>
                        </div>

                        <div className="max-w-2xl">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <label className={`flex-1 flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 bg-gray-50 border border-dashed border-gray-200 rounded-sm md:rounded-2xl cursor-pointer hover:border-[#8b2c3c] hover:bg-[#8b2c3c]/5 transition-all w-full ${isMusicUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Music className="text-gray-400 group-hover:text-[#8b2c3c]" size={20} />
                                    <span className="text-xs md:text-sm text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                        {isMusicUploading ? 'Uploading...' : 'Upload MP3 File'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="audio/mpeg,audio/mp3,audio/*"
                                        onChange={handleMusicUpload}
                                        className="hidden"
                                    />
                                </label>

                                <div className="flex items-center justify-center w-full sm:w-auto my-2 sm:my-0 relative">
                                    <div className="w-full h-[1px] bg-gray-200 sm:hidden"></div>
                                    <span className="text-gray-400 font-bold text-xs bg-white px-2 absolute sm:static sm:bg-transparent">OR</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsMusicLibraryOpen(true)}
                                    className="flex-1 w-full sm:w-auto sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-sm md:rounded-2xl hover:bg-gray-800 transition-all font-bold text-xs md:text-sm shadow-sm transform active:scale-[0.98]"
                                    title="Choose from Default Library"
                                >
                                    <Library size={18} />
                                    <span>Choose from Library</span>
                                </button>
                            </div>

                            {formData.musicUrl && (
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between bg-[#8b2c3c]/5 px-4 py-3 rounded-sm md:rounded-2xl border border-[#8b2c3c]/10 gap-3 w-full">
                                    <div className="flex items-center gap-3 min-w-0 pr-2">
                                        <audio src={formData.musicUrl} controls className="max-h-10 w-full sm:w-48 shrink-0" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, musicUrl: '' })}
                                        className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500 text-xs font-bold rounded-xl transition-colors shrink-0 border border-transparent hover:border-red-100"
                                    >
                                        <X size={14} />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-8 flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-6 py-3.5 md:px-12 md:py-4 bg-[#8b2c3c] text-white rounded-sm md:rounded-xl font-bold hover:bg-[#5a1e2b] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.98] flex justify-center items-center gap-2 text-sm md:text-base cursor-pointer"
                        >
                            {loading ? "Processing..." : (hasGeneratedLink ? "Save Changes" : "Save & Generate Link")}
                        </button>
                    </div>
                </form>
                )}
            </div>
            
            <MusicSelectionDialog 
                open={isMusicLibraryOpen}
                onOpenChange={setIsMusicLibraryOpen}
                onSelect={(url) => setFormData({ ...formData, musicUrl: url })}
            />
        </div>
    );
}
