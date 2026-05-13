"use client"
import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UploaderDialog from '@/app/admin/media/components/UploaderDialog';
import { Switch } from '@/components/ui/switch';
import { ImageIcon, Youtube, X, Music, ChevronDown, ChevronUp, Library, Play } from 'lucide-react';
import Image from 'next/image';
import MusicSelectionDialog from './MusicSelectionDialog';

export default function InviteForm({ order, hasCustomizations = false }) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        brideName: order.mainDetails?.brideName || '',
        brideFatherName: order.mainDetails?.brideFatherName || '',
        brideMotherName: order.mainDetails?.brideMotherName || '',
        groomName: order.mainDetails?.groomName || '',
        groomFatherName: order.mainDetails?.groomFatherName || '',
        groomMotherName: order.mainDetails?.groomMotherName || '',
        weddingDate: order.mainDetails?.weddingDate ? new Date(order.mainDetails.weddingDate).toISOString().split('T')[0] : '',
        preWeddingPhotos: order.mainDetails?.preWeddingPhotos || [],
        showPreWeddingPhotos: order.mainDetails?.showPreWeddingPhotos !== undefined ? order.mainDetails.showPreWeddingPhotos : true,
        weddingVideo: order.mainDetails?.weddingVideo || '',
        showWeddingVideo: order.mainDetails?.showWeddingVideo !== undefined ? order.mainDetails.showWeddingVideo : true,
        musicUrl: order.mainDetails?.musicUrl || '',
    });
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [isMusicLibraryOpen, setIsMusicLibraryOpen] = useState(false);
    const [isMusicUploading, setIsMusicUploading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(!!order.mainDetails);

    // Custom Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSwitchChange = (name, checked) => {
        setFormData({ ...formData, [name]: checked });
    };

    const handleRemoveImage = (index) => {
        const newPhotos = [...formData.preWeddingPhotos];
        newPhotos.splice(index, 1);
        setFormData({ ...formData, preWeddingPhotos: newPhotos });
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
        const toastId = toast.loading("Saving information...");

        try {
            const res = await fetch("/api/invitation/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: order._id,
                    ...formData,
                    isCustomization: false
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Main information saved! 🎉", { id: toastId });
                setSaveSuccess(true);
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

    const handleCreateCustomization = async () => {
        setLoading(true);
        const toastId = toast.loading("Creating new customization...");

        try {
            const res = await fetch("/api/invitation/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: order._id,
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
        <div className="space-y-5">
            <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden p-2 md:p-2">
                <div
                    className={`flex justify-between items-center cursor-pointer gap-4 group p-4 md:p-6 bg-[#8b2c3c]/5 rounded-sm hover:bg-[#8b2c3c]/10 transition-all ${isExpanded ? 'mb-6 md:mb-8' : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#8b2c3c] transition-colors">Main Information</h2>
                        <p className="text-xs md:text-sm text-gray-500">Fill in the core details for your wedding invitation.</p>
                    </div>
                    <button type="button" className="p-2.5 md:p-3 bg-[#8b2c3c] text-white rounded-sm transition-transform duration-300 shadow-md">
                        {isExpanded ? <ChevronUp size={20} className="md:w-6 md:h-6" /> : <ChevronDown size={20} className="md:w-6 md:h-6" />}
                    </button>
                </div>

                {isExpanded && (
                    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Bride Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                    <span className="w-8 h-8 flex items-center justify-center bg-pink-50 text-pink-500 rounded-sm font-bold text-sm">B</span>
                                    <h3 className="font-bold text-gray-800">Bride's Details</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Bride's Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="brideName"
                                            value={formData.brideName}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Father's Name</label>
                                        <input
                                            type="text"
                                            name="brideFatherName"
                                            value={formData.brideFatherName}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Mother's Name</label>
                                        <input
                                            type="text"
                                            name="brideMotherName"
                                            value={formData.brideMotherName}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Groom Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-500 rounded-sm font-bold text-sm">G</span>
                                    <h3 className="font-bold text-gray-800">Groom's Details</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Groom's Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="groomName"
                                            value={formData.groomName}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Father's Name</label>
                                        <input
                                            type="text"
                                            name="groomFatherName"
                                            value={formData.groomFatherName}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Mother's Name</label>
                                        <input
                                            type="text"
                                            name="groomMotherName"
                                            value={formData.groomMotherName}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Wedding Date */}
                        <div className="pt-6 border-t border-gray-100 max-w-sm">
                            <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Wedding Date</label>
                            <input
                                required
                                type="date"
                                name="weddingDate"
                                value={formData.weddingDate}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-gray-700"
                            />
                        </div>

                        {/* Pre-wedding Photos Section */}
                        <div className="pt-8 md:pt-10 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <ImageIcon className="text-[#8b2c3c]" size={20} />
                                        Pre-wedding Photos
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">Add up to 10 photos (9:16 aspect ratio recommended, max 2MB each)</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-sm self-start sm:self-auto border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-600">Show Section</span>
                                    <Switch
                                        checked={formData.showPreWeddingPhotos}
                                        onCheckedChange={(checked) => handleSwitchChange('showPreWeddingPhotos', checked)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {formData.preWeddingPhotos.map((url, index) => (
                                    <div key={index} className="relative aspect-[9/16] rounded-sm overflow-hidden border border-gray-100 group">
                                        <img
                                            src={url}
                                            alt={`Pre-wedding ${index + 1}`}
                                            className="object-cover h-full w-full"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {formData.preWeddingPhotos.length < 10 && (
                                    <button
                                        type="button"
                                        onClick={() => setIsUploaderOpen(true)}
                                        className="aspect-[9/16] rounded-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#8b2c3c] hover:text-[#8b2c3c] transition-all bg-gray-50/50"
                                    >
                                        <ImageIcon size={24} />
                                        <span className="text-xs font-bold">Add Photo</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Wedding Video Section */}
                        <div className="pt-8 md:pt-10 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <Youtube className="text-[#8b2c3c]" size={20} />
                                        Wedding Video
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">Add your wedding video YouTube link</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-sm self-start sm:self-auto border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-600">Show Section</span>
                                    <Switch
                                        checked={formData.showWeddingVideo}
                                        onCheckedChange={(checked) => handleSwitchChange('showWeddingVideo', checked)}
                                    />
                                </div>
                            </div>

                            <div className="max-w-2xl">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">YouTube Link</label>
                                <input
                                    type="url"
                                    name="weddingVideo"
                                    value={formData.weddingVideo}
                                    onChange={handleChange}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-sm focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                />
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

                        <UploaderDialog
                            open={isUploaderOpen}
                            onOpenChange={setIsUploaderOpen}
                            onUploadSuccess={(urls) => {
                                const combined = [...formData.preWeddingPhotos, ...urls].slice(0, 10);
                                setFormData({ ...formData, preWeddingPhotos: combined });
                            }}
                        />

                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3.5 md:px-12 md:py-4 bg-[#8b2c3c] text-white rounded-sm font-bold hover:bg-[#5a1e2b] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.98] w-full sm:w-auto text-sm md:text-base cursor-pointer"
                            >
                                {loading ? "Saving..." : "Save Main Information"}
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
