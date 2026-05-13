"use client"
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Settings2, Save, Calendar, Clock, MapPin, X } from 'lucide-react';

const DEFAULT_EVENTS = [
    { name: 'Engagement', enabled: false, date: '', time: '', venue: '', mapLink: '' },
    { name: 'Haldi', enabled: false, date: '', time: '', venue: '', mapLink: '' },
    { name: 'Mehendi', enabled: false, date: '', time: '', venue: '', mapLink: '' },
    { name: 'Cocktail', enabled: false, date: '', time: '', venue: '', mapLink: '' },
    { name: 'Wedding', enabled: true, date: '', time: '', venue: '', mapLink: '' },
    { name: 'Reception', enabled: false, date: '', time: '', venue: '', mapLink: '' },
];

export default function CustomizationForm({ invitation, orderId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [side, setSide] = useState(invitation?.weddingDetails?.side || 'bride');
    const [rsvpNumber, setRsvpNumber] = useState(invitation?.rsvpNumber || '');
    const [events, setEvents] = useState(
        invitation?.events?.length > 0
            ? invitation.events.map(e => ({
                ...e,
                date: e.date ? new Date(e.date).toISOString().split('T')[0] : ''
            }))
            : DEFAULT_EVENTS
    );

    const handleEventToggle = (index) => {
        const newEvents = [...events];
        newEvents[index].enabled = !newEvents[index].enabled;
        setEvents(newEvents);
    };

    const handleEventChange = (index, field, value) => {
        const newEvents = [...events];
        newEvents[index][field] = value;
        setEvents(newEvents);
    };

    const handleSave = async () => {
        setLoading(true);
        const toastId = toast.loading("Saving invitation...");

        try {
            const res = await fetch("/api/invitation/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    inviteId: invitation?._id,
                    side,
                    events,
                    rsvpNumber,
                    isCustomization: true
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Invitation saved! 🎉", { id: toastId });
                router.push(`/user/templates/${orderId}`);
            } else {
                toast.error(data.error || "Failed to save invitation", { id: toastId });
            }
        } catch (err) {
            console.error("Save invitation error:", err);
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 pb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header with Title and Cancel */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#8b2c3c]/5 p-5 md:p-6 rounded-sm md:rounded-2xl border border-[#8b2c3c]/10">
                <div>
                    <h2 className="text-[10px] md:text-sm font-bold text-[#8b2c3c] uppercase tracking-widest mb-1 flex items-center gap-2">
                        Editing Invitation
                        <span className="bg-[#8b2c3c]/10 px-2 py-0.5 rounded text-[10px] font-mono tracking-normal lowercase">{invitation?.slug}</span>
                    </h2>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        {invitation?.weddingDetails?.groom?.name} & {invitation?.weddingDetails?.bride?.name}
                    </h3>
                </div>
                <button
                    onClick={() => router.push(`/user/templates/${orderId}`)}
                    className="px-4 py-2.5 md:px-6 md:py-3 bg-white text-gray-600 rounded-sm md:rounded-xl font-bold border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 w-full md:w-fit text-sm md:text-base"
                >
                    <X size={18} className="md:w-5 md:h-5" />
                    Cancel Editing
                </button>
            </div>

            {/* Side Selection */}
            <div className="bg-white rounded-sm md:rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100">
                <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2 md:gap-3">
                        <Settings2 className="text-[#8b2c3c] w-5 h-5 md:w-6 md:h-6" />
                        Which side are you?
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">This helps us personalize the wording and layout for you.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 max-w-2xl">
                    <button
                        onClick={() => setSide('bride')}
                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${side === 'bride'
                            ? 'border-[#8b2c3c] bg-[#8b2c3c]/5'
                            : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${side === 'bride' ? 'bg-[#8b2c3c] text-white' : 'bg-gray-200 text-gray-500'
                            }`}>B</div>
                        <div className="text-center">
                            <p className={`font-bold ${side === 'bride' ? 'text-[#8b2c3c]' : 'text-gray-700'}`}>Bride Side</p>
                            <p className="text-xs text-gray-500 mt-1">Invitation for girl's family</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSide('groom')}
                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${side === 'groom'
                            ? 'border-[#8b2c3c] bg-[#8b2c3c]/5'
                            : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${side === 'groom' ? 'bg-[#8b2c3c] text-white' : 'bg-gray-200 text-gray-500'
                            }`}>G</div>
                        <div className="text-center">
                            <p className={`font-bold ${side === 'groom' ? 'text-[#8b2c3c]' : 'text-gray-700'}`}>Groom Side</p>
                            <p className="text-xs text-gray-500 mt-1">Invitation for boy's family</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Events Grid */}
            <div className="space-y-6">
                <div className="flex items-end justify-between px-2 md:px-4">
                    <div>
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Wedding Events</h3>
                        <p className="text-xs md:text-sm text-gray-500">Enable and configure the events you want to include.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {events.map((event, index) => (
                        <div
                            key={event.name}
                            className={`bg-white rounded-sm md:rounded-2xl p-5 border transition-all duration-300 ${event.enabled
                                ? 'border-[#8b2c3c]/30 shadow-sm ring-1 ring-[#8b2c3c]/5'
                                : 'border-gray-100 opacity-70 grayscale-[0.5]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${event.enabled ? 'bg-[#8b2c3c]/10 text-[#8b2c3c]' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {event.name}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={event.enabled}
                                        onChange={() => handleEventToggle(index)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8b2c3c]"></div>
                                </label>
                            </div>

                            <div className={`space-y-4 transition-all ${event.enabled ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1.5">
                                        <Calendar size={10} /> Date
                                    </label>
                                    <input
                                        type="date"
                                        value={event.date}
                                        onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#8b2c3c] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1.5">
                                        <Clock size={10} /> Time
                                    </label>
                                    <input
                                        type="time"
                                        value={event.time}
                                        onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#8b2c3c] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1.5">
                                        <MapPin size={10} /> Venue
                                    </label>
                                    <textarea
                                        value={event.venue}
                                        onChange={(e) => handleEventChange(index, 'venue', e.target.value)}
                                        rows={2}
                                        placeholder="Location details..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#8b2c3c] outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1.5">
                                        <MapPin size={10} /> Map Link
                                    </label>
                                    <input
                                        type="url"
                                        value={event.mapLink || ''}
                                        onChange={(e) => handleEventChange(index, 'mapLink', e.target.value)}
                                        placeholder="Google Maps link..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#8b2c3c] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RSVP Number Section */}
            <div className="bg-white rounded-sm md:rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100">
                <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2 md:gap-3">
                        <MapPin className="text-[#8b2c3c] w-5 h-5 md:w-6 md:h-6" />
                        RSVP Contact Number
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">Provide a phone number for guests to RSVP.</p>
                </div>

                <div className="max-w-md">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Phone Number</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength="10"
                        value={rsvpNumber}
                        onChange={(e) => setRsvpNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8b2c3c]/10 focus:border-[#8b2c3c] outline-none transition-all"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-1">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto px-8 py-3.5 md:px-16 md:py-5 bg-[#8b2c3c] text-white rounded-sm md:rounded-xl font-bold hover:bg-[#5a1e2b] transition-all shadow-md transform active:scale-[0.98] disabled:opacity-50 text-sm md:text-base cursor-pointer"
                >
                    <Save size={20} className="md:w-6 md:h-6" />
                    <span>{loading ? 'Saving...' : 'Save Invitation'}</span>
                </button>
            </div>
        </div>
    );
}
