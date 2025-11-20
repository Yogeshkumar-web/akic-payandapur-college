"use client";

import Image from "next/image";

export default function FooterBranding({
    leftLogoUrl = "/up-board-logo.png",
    rightImageUrl = "/up-board-logo.png",
}: {
    leftLogoUrl?: string;
    rightImageUrl?: string;
}) {
    return (
        <div className='w-full mx-auto px-4 md:px-8 py-8'>
            <div className='bg-white rounded-2xl p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-10'>
                {/* Left Logo */}
                <div className='shrink-0'>
                    <Image
                        width={450}
                        height={450}
                        src={leftLogoUrl}
                        alt='UP Board Logo'
                        className='w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain rounded-md shadow-md bg-white p-2'
                    />
                </div>

                {/* Center Text */}
                <div className='flex-1 text-center'>
                    {/* FIRST LINE — RED + EXTRA BOLD */}
                    <h2
                        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-600 leading-tight'
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        AKIC Payandapur, Moradabad
                    </h2>

                    {/* SECOND LINE — BLACK */}
                    <p
                        className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-3 text-black font-semibold leading-snug'
                        style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                        आर्य कृषक इण्टर कॉलेज, पायन्दापुर, मुरादाबाद
                    </p>

                    {/* THIRD LINE — RED */}
                    <p className='mt-4 md:mt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-600 font-semibold'>
                        <em>A government inter college established in 1992</em>
                    </p>
                </div>

                {/* Right Image — Maa Saraswati */}
                <div className='shrink-0'>
                    <Image
                        width={450}
                        height={450}
                        src={rightImageUrl}
                        alt='Maa Saraswati'
                        className='w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover rounded-md shadow-md bg-white p-1'
                    />
                </div>
            </div>
        </div>
    );
}
