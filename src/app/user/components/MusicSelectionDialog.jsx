"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Play, Square, Library } from 'lucide-react';
import { DEFAULT_MUSIC_TRACKS } from '@/lib/constants/music';

export default function MusicSelectionDialog({ open, onOpenChange, onSelect }) {
    const [playingId, setPlayingId] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (!open) {
            handlePause();
        }
    }, [open]);

    const handlePlay = (track) => {
        if (!track.url) {
            alert("This track's URL is not configured yet. Please wait for the admin to upload the files to Cloudflare.");
            return;
        }

        if (playingId === track.id) {
            handlePause();
        } else {
            if (audioRef.current) {
                audioRef.current.src = track.url;
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setPlayingId(track.id);
            }
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setPlayingId(null);
    };

    const handleSelect = (track) => {
        if (!track.url) {
            alert("This track's URL is not configured yet. Please wait for the admin to upload the files to Cloudflare.");
            return;
        }
        handlePause();
        onSelect(track.url);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col p-0 gap-0 rounded-sm sm:rounded-2xl overflow-hidden bg-gray-50 border-0 shadow-2xl">
                <DialogHeader className="p-6 bg-white border-b border-gray-100 flex-shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Library className="text-[#8b2c3c]" />
                        Background Music Library
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Select a premium background track for your invitation or play them to preview.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 relative">
                    <audio ref={audioRef} onEnded={handlePause} />
                    
                    {DEFAULT_MUSIC_TRACKS.map((track, i) => (
                        <div 
                            key={track.id} 
                            className={`flex items-center justify-between p-3 rounded-sm sm:rounded-xl border transition-all ${
                                playingId === track.id 
                                    ? 'bg-[#8b2c3c]/5 border-[#8b2c3c]/30 shadow-sm' 
                                    : 'bg-white border-gray-100 hover:border-[#8b2c3c]/20 hover:shadow-xs hover:-translate-y-0.5 cursor-pointer'
                            }`}
                            onClick={() => {
                                if (playingId !== track.id) handlePlay(track);
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] md:text-sm font-bold text-gray-400 w-4 md:w-5 text-center shrink-0">
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePlay(track);
                                    }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                                        playingId === track.id 
                                            ? 'bg-[#8b2c3c] text-white shadow-md' 
                                            : 'bg-gray-50 text-gray-600 hover:bg-[#8b2c3c] hover:text-white'
                                    }`}
                                >
                                    {playingId === track.id ? <Square fill="currentColor" size={14} /> : <Play fill="currentColor" size={14} className="ml-0.5" />}
                                </button>
                                <div className="min-w-0 pr-2">
                                    <h4 className={`font-bold text-sm md:text-base truncate ${playingId === track.id ? 'text-[#8b2c3c]' : 'text-gray-900'}`}>
                                        {track.name}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 font-medium">Premium Track</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(track);
                                }}
                                className={`px-4 py-2 rounded-sm md:rounded-lg text-[11px] md:text-xs font-bold transition-all border shrink-0 ${
                                    playingId === track.id
                                        ? 'bg-[#8b2c3c] text-white border-[#8b2c3c] shadow-sm transform active:scale-95'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#8b2c3c] hover:text-[#8b2c3c]'
                                }`}
                            >
                                Choose
                            </button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
