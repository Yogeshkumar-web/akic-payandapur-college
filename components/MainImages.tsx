"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface MainImagesProps {
    images?: string[];
    interval?: number;
}

export default function MainImages({
    images = [
        "/college_rooms.jpg",
        "/college_gate.jpg",
        "/college_parking.jpg",
        "/college_middle_view.jpg",
        "/group_photo.jpg",
    ],
    interval = 3000,
}: MainImagesProps) {
    const [index, setIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const imageCount = images.length;

    // Client-side only rendering
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Start/restart timer
    const startTimer = () => {
        clearTimer();
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % imageCount);
        }, interval);
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (isClient) {
            startTimer();
        }
        return () => clearTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient, imageCount, interval]);

    // Pause on hover
    const handleMouseEnter = () => clearTimer();
    const handleMouseLeave = () => startTimer();

    // Touch handlers for swipe
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        clearTimer();
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
        if (touchStartX.current == null || touchEndX.current == null) {
            startTimer();
            touchStartX.current = null;
            touchEndX.current = null;
            return;
        }

        const delta = touchStartX.current - touchEndX.current;

        if (Math.abs(delta) > 50) {
            if (delta > 0) {
                setIndex((i) => (i + 1) % imageCount);
            } else {
                setIndex((i) => (i - 1 + imageCount) % imageCount);
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
        startTimer();
    };

    if (!isClient) {
        return <div className='absolute inset-0 bg-gray-200 animate-pulse' />;
    }

    return (
        <div
            className='absolute inset-0 w-full h-full'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Images */}
            {images.map((src, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        i === index
                            ? "opacity-100 z-20"
                            : "opacity-0 z-10 pointer-events-none"
                    }`}
                    aria-hidden={i !== index}
                >
                    <Image
                        src={src}
                        alt={`Slide ${i + 1}`}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
                        className='object-cover'
                        draggable={false}
                        priority={i === 0}
                        quality={75}
                    />

                    {/* Dark overlay */}
                    <div className='absolute inset-0 bg-black/20' />
                </div>
            ))}

            {/* Navigation Dots */}
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30'>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setIndex(i);
                            startTimer();
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/50 hover:bg-white/75"
                        }`}
                    />
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={() => {
                    setIndex((i) => (i - 1 + imageCount) % imageCount);
                    startTimer();
                }}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white z-30 hover:bg-black/70 transition-all flex items-center justify-center text-3xl font-bold'
                aria-label='Previous slide'
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={() => {
                    setIndex((i) => (i + 1) % imageCount);
                    startTimer();
                }}
                className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white z-30 hover:bg-black/70 transition-all flex items-center justify-center text-3xl font-bold'
                aria-label='Next slide'
            >
                ›
            </button>
        </div>
    );
}
