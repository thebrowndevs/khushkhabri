// components/website/SaleCountdownTimer.jsx
"use client";

import { useState, useEffect } from 'react';

export default function SaleCountdownTimer({ saleStart, saleEnd }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isSaleActive, setIsSaleActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile on mount
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        let timer;
        const calculateTimeLeft = () => {
            const now = Date.now();
            const startTime = new Date(saleStart).getTime();
            const endTime = new Date(saleEnd).getTime();
            const difference = endTime - now;

            // Before sale starts
            if (now < startTime) {
                setIsSaleActive(false);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            // After sale ends
            if (difference <= 0) {
                setIsSaleActive(false);
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            setIsSaleActive(true);

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        };

        setTimeLeft(calculateTimeLeft());
        timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', checkIfMobile);
        };
    }, [saleStart, saleEnd]);

    if (!isSaleActive) return null;

    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;
    const totalHours = timeLeft.days * 24 + timeLeft.hours;

    return (
        <div className="flex justify-center my-4 md:my-6">
            <div className={`
                relative overflow-hidden rounded-xl md:rounded-2xl p-[2px] w-full max-w-4xl
                ${isUrgent
                    ? 'bg-gradient-to-r from-amber-500 via-red-500 to-rose-500'
                    : 'bg-gradient-to-r from-primary via-green-600 to-cyan-500'}
            `}>
                <div className="bg-gradient-to-b from-[#faf9f6] to-[#f0ede3] rounded-lg md:rounded-xl p-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* Title Section */}
                        <div className="flex items-center mb-3 md:mb-0">
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-rose-600 whitespace-nowrap">
                                {isUrgent ? 'Hurry up! Sale Ending Soon' : 'Limited Time Offer'}
                            </h3>
                        </div>

                        {/* Timer Section */}
                        <div className="flex space-x-2 sm:space-x-3">
                            {Object.entries(timeLeft).map(([unit, value]) => {
                                const labelMap = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };
                                return (
                                    <div key={unit} className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/80 backdrop-blur-md border border-gray-300 shadow-inner rounded-xl flex items-center justify-center">
                                            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                                                {value.toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                        <span className="mt-1 text-[13px] sm:text-xs text-gray-600 uppercase">
                                            {isMobile ? unit.charAt(0) : labelMap[unit]}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>


                        {/* CTA Section */}
                        <button className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-base md:text-lg font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



{/* Progress bar - only shows when < 3 days remain */ }
{/* {totalHours < 72 && (
                        <div className="mt-3 w-full">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Offer ends in:</span>
                                <span>{Math.floor(totalHours)} hours</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${isUrgent ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'}`}
                                    style={{ width: `${100 - (totalHours / 72 * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    )} */}

{/* Decorative elements */ }
{/* <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div> */}