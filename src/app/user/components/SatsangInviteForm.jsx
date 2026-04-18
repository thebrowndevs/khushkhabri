"use client"
import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Share2, Copy, X, Music, CheckCircle2, ChevronDown, ChevronUp, Library, Play } from 'lucide-react';
import MusicSelectionDialog from './MusicSelectionDialog';

export default function SatsangInviteForm({ order, existingInvite }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isMusicUploading, setIsMusicUploading] = useState(false);
    const [isMusicLibraryOpen, setIsMusicLibraryOpen] = useState(false);

    // Custom Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

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

        if (file.size > 50 * 1024 * 1024) {
            toast.error("File too large. Max 50MB allowed.");
            return;
        }

        setIsMusicUploading(true);
        const toastId = toast.loading("Uploading music...");

        try {
            const formDataToUpload = new FormData();
            formDataToUpload.append("file", file);
            formDataToUpload.append("userId", order.user?._id || order.user || "user");
            formDataToUpload.append("type", "music");

            const res = await fetch("/api/r2-presign-put", {
                method: "POST",
                body: formDataToUpload
            });

            const data = await res.json();
            if (res.ok) {
                setFormData({ ...formData, musicUrl: data.publicUrl });
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

    // Audio Player Handlers
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-10">
            {/* Generated Link Alert (If already created) */}
            {hasGeneratedLink && existingInvite && (
                <div className="bg-[#8b2c3c]/5 border border-[#8b2c3c]/20 rounded-sm p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 pr-0 md:pr-4 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-[#8b2c3c]/10 rounded-sm flex items-center justify-center text-[#8b2c3c] shrink-0">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">Your Invitation is Ready!</h3>
                        </div>
                        <p className="text-gray-500 mb-6 text-xs md:text-sm">Your Guruji Satsang invitation link is live. Copy it to share with your family and friends via WhatsApp or social media.</p>

                        <button
                            onClick={() => copyToClipboard(`${window.location.origin}/g/${existingInvite.slug.replace(/^\//, '')}`)}
                            className="flex items-center justify-center gap-2 px-6 py-3.5 md:py-4 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-all shadow-md transform active:scale-[0.98] w-fit"
                            title="Copy Link"
                        >
                            <Copy size={16} className="md:w-5 md:h-5" />
                            <span className="text-sm md:text-base font-bold">Copy Invitation Link</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden p-5 md:p-8">
                <div
                    className={`flex justify-between items-center cursor-pointer group ${isExpanded ? 'mb-6 md:mb-8' : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#8b2c3c] transition-colors">Satsang Details</h2>
                        <p className="text-xs md:text-sm text-gray-500">Fill in the details for your Guruji Satsang invitation. Once saved, your shareable link will be generated automatically.</p>
                    </div>
                    <button type="button" className="p-2 md:p-2.5 bg-gray-50 hover:bg-[#8b2c3c]/10 text-gray-400 hover:text-[#8b2c3c] rounded-sm transition-colors shrink-0">
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
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-gray-700"
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
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all resize-none"
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
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                        <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded-sm relative group">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        value={contact.name}
                                                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                                                        placeholder="Contact Name"
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        value={contact.phone}
                                                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                                                        placeholder="+91 9876543210"
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-sm"
                                                    />
                                                </div>
                                            </div>
                                            {formData.contacts.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeContact(index)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-500 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                                <p className="text-xs md:text-sm text-gray-500 mt-1">Select an MP3 file and it will be uploaded automatically.</p>
                            </div>

                            <div className="max-w-2xl">
                                {!formData.musicUrl ? (
                                    <>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Select Music File (MP3)</label>
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <label className={`flex-1 flex items-center gap-3 px-5 py-4 bg-white border-2 border-dashed border-gray-200 rounded-sm cursor-pointer hover:border-[#8b2c3c] hover:bg-[#8b2c3c]/5 transition-all w-full group ${isMusicUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                                <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-gray-400 group-hover:text-[#8b2c3c] group-hover:bg-[#8b2c3c]/10 transition-colors">
                                                    <Music size={20} />
                                                </div>
                                                <span className="text-sm text-gray-500 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
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
                                                className="flex-1 w-full sm:w-auto sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-all font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
                                            >
                                                <Library size={18} />
                                                <span>Choose from Library</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-white border border-gray-100 p-5 rounded-sm shadow-sm">
                                        <audio
                                            ref={audioRef}
                                            src={formData.musicUrl}
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                            onEnded={() => setIsPlaying(false)}
                                        />
                                        <div className="flex flex-col gap-5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={togglePlay}
                                                        className="w-12 h-12 bg-[#8b2c3c] text-white rounded-sm flex items-center justify-center hover:bg-[#5a1e2b] transition-all shadow-md transform active:scale-95"
                                                    >
                                                        {isPlaying ? <span className="w-4 h-4 rounded-xs border-2 border-white bg-white block" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                                                    </button>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-none mb-1">Background Music Selected</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Premium Audio Track</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max={duration || 0}
                                                        value={currentTime}
                                                        onChange={handleSeek}
                                                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#8b2c3c]"
                                                    />
                                                    <div className="flex justify-between text-[11px] font-bold text-gray-400 tabular-nums">
                                                        <span>{formatTime(currentTime)}</span>
                                                        <span>{formatTime(duration)}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, musicUrl: '' })}
                                                    className="w-fit px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-500 hover:text-[#8b2c3c] hover:border-[#8b2c3c] rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                                                >
                                                    <Library size={12} />
                                                    Change Music
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-8 flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-6 py-3.5 md:px-12 md:py-4 bg-[#8b2c3c] text-white rounded-sm font-bold hover:bg-[#5a1e2b] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.98] flex justify-center items-center gap-2 text-sm md:text-base cursor-pointer"
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
