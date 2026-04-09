"use client"
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UploaderDialog from '@/app/admin/media/components/UploaderDialog';
import { Switch } from '@/components/ui/switch';
import { ImageIcon, Youtube, X, Music } from 'lucide-react';
import Image from 'next/image';
import { convertToBase64 } from '@/lib/services/convertToBase64';

export default function InviteForm({ order }) {
    const router = useRouter();
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
    const [isMusicUploading, setIsMusicUploading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(!!order.mainDetails);

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
        <div className="space-y-10">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden p-8 md:p-12">
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Main Information</h2>
                        <p className="text-gray-500">Fill in the core details for your wedding invitation.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Bride Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                <span className="w-8 h-8 flex items-center justify-center bg-pink-50 text-pink-500 rounded-full font-bold text-sm">B</span>
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
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Groom Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-500 rounded-full font-bold text-sm">G</span>
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
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
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
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all text-gray-700"
                        />
                    </div>

                    {/* Pre-wedding Photos Section */}
                    <div className="pt-10 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <ImageIcon className="text-[#8b2c3c]" size={20} />
                                    Pre-wedding Photos
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Add up to 10 photos (9:16 aspect ratio recommended, max 2MB each)</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600">Show Section</span>
                                <Switch
                                    checked={formData.showPreWeddingPhotos}
                                    onCheckedChange={(checked) => handleSwitchChange('showPreWeddingPhotos', checked)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {formData.preWeddingPhotos.map((url, index) => (
                                <div key={index} className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-gray-100 group">
                                    <Image
                                        src={url}
                                        alt={`Pre-wedding ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {formData.preWeddingPhotos.length < 10 && (
                                <button
                                    type="button"
                                    onClick={() => setIsUploaderOpen(true)}
                                    className="aspect-[9/16] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#8b2c3c] hover:text-[#8b2c3c] transition-all bg-gray-50/50"
                                >
                                    <ImageIcon size={24} />
                                    <span className="text-xs font-bold">Add Photo</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Wedding Video Section */}
                    <div className="pt-10 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Youtube className="text-[#8b2c3c]" size={20} />
                                    Wedding Video
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Add your wedding video YouTube link</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600">Show Section</span>
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
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Background Music Section */}
                    <div className="pt-10 border-t border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Music className="text-[#8b2c3c]" size={20} />
                                Background Music
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Select an MP3 file and it will be uploaded automatically.</p>
                        </div>

                        <div className="max-w-2xl">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Music File (MP3)</label>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <label className={`flex-1 flex items-center gap-3 px-5 py-3.5 bg-gray-50 border border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#8b2c3c] hover:bg-[#8b2c3c]/5 transition-all w-full ${isMusicUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Music className="text-gray-400 group-hover:text-[#8b2c3c]" size={20} />
                                    <span className="text-sm text-gray-500 font-medium">
                                        {isMusicUploading ? 'Uploading...' : formData.musicUrl ? 'Change Background Music' : 'Click to Upload MP3 File'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="audio/mpeg,audio/mp3,audio/*"
                                        onChange={handleMusicUpload}
                                        className="hidden"
                                    />
                                </label>

                                {formData.musicUrl && (
                                    <div className="flex items-center gap-3 bg-[#8b2c3c]/5 px-4 py-3 rounded-2xl border border-[#8b2c3c]/10 w-full sm:w-auto">
                                        <div className="w-8 h-8 bg-[#8b2c3c] rounded-full flex items-center justify-center text-white">
                                            <Music size={14} className="animate-pulse" />
                                        </div>
                                        <div className="flex-1 min-w-0 pr-2">
                                            <p className="text-xs font-bold text-[#8b2c3c] truncate">Music Uploaded</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, musicUrl: '' })}
                                            className="p-1.5 hover:bg-[#8b2c3c]/10 rounded-full text-[#8b2c3c] transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
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

                    <div className="pt-8 flex flex-wrap gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-12 py-4 bg-[#8b2c3c] text-white rounded-2xl font-bold hover:bg-[#5a1e2b] transition-all shadow-lg shadow-[#8b2c3c]/20 disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.98]"
                        >
                            {loading ? "Saving..." : "Save Main Information"}
                        </button>

                        {saveSuccess && (
                            <button
                                type="button"
                                onClick={handleCreateCustomization}
                                className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-md transform active:scale-[0.98] flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                Create Invitation
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
