
"use client";

import Image from "next/image";

export default function CollegeBranding({
    leftLogoUrl = "/maa.png",
    rightImageUrl = "/up-board-logo.png",
}: {
    leftLogoUrl?: string;
    rightImageUrl?: string;
}) {
    return (
        <div className='w-full mx-auto px-4 md:px-8 py-6 md:py-10'>
            <div 
                className='relative overflow-hidden rounded-3xl shadow-2xl'
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
            >
                {/* Decorative background pattern */}
                <div 
                    className='absolute inset-0 opacity-10'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                {/* Gradient overlay for depth */}
                <div 
                    className='absolute inset-0'
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                    }}
                />

                {/* Content Container */}
                <div className='relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20'>
                    {/* Left Logo with glow effect */}
                    <div className='shrink-0 relative group'>
                        <div 
                            className='absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity'
                            style={{
                                transform: 'scale(1.15)',
                            }}
                        />
                        <div className='relative rounded-2xl p-3 sm:p-4 md:p-5 shadow-md transform group-hover:scale-105 transition-transform duration-300'>
                            <Image
                                width={600}
                                height={600}
                                src={leftLogoUrl}
                                alt='Maa Saraswati'
                                className='w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain'
                            />
                        </div>
                    </div>

                    {/* Center Text - Enhanced Typography */}
                    <div className='flex-1 text-center space-y-4 md:space-y-6'>
                        {/* Main College Name - English with Maroon Gradient */}
                        <h1
                            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight'
                            style={{ 
                                fontFamily: "Inter, sans-serif",
                                background: 'linear-gradient(to right, #8B1538 0%, #6B0F2A 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: '0 2px 10px rgba(139, 21, 56, 0.3)',
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                                letterSpacing: '0.05em',
                            }}
                        >
                            AKIC Payandapur
                        </h1>

                        {/* Location - Red on White Badge */}
                        <div 
                            className='inline-block px-6 py-2 rounded-full'
                            style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid #DC2626',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            }}
                        >
                            <p 
                                className='text-lg md:text-xl lg:text-2xl font-bold'
                                style={{ 
                                    fontFamily: "Nunito, sans-serif",
                                    letterSpacing: '0.05em',
                                    color: '#DC2626',
                                }}
                            >
                                Moradabad, Uttar Pradesh
                            </p>
                        </div>

                        {/* Hindi Name - Deep Red */}
                        <h2
                            className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug'
                            style={{ 
                                fontFamily: "Noto Sans Devanagari, sans-serif",
                                color: '#991B1B',
                                textShadow: '0 2px 8px rgba(153, 27, 27, 0.4)',
                                letterSpacing: '0.02em',
                            }}
                        >
                            आर्य कृषक इण्टर कॉलेज
                        </h2>

                        <h3
                            className='text-xl sm:text-2xl md:text-3xl font-semibold'
                            style={{ 
                                fontFamily: "Noto Sans Devanagari, sans-serif",
                                color: '#7F1D1D',
                                textShadow: '0 2px 8px rgba(127, 29, 29, 0.4)',
                            }}
                        >
                            पायन्दापुर, मुरादाबाद
                        </h3>

                        {/* Tagline with decorative elements - Black */}
                        <div className='pt-4 md:pt-6'>
                            <div className='flex items-center justify-center gap-4 mb-3'>
                                <div 
                                    className='h-px flex-1 max-w-20'
                                    style={{
                                        background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.5), transparent)',
                                    }}
                                />
                                <div 
                                    className='text-2xl'
                                    style={{ color: '#DC2626' }}
                                >
                                    ✦
                                </div>
                                <div 
                                    className='h-px flex-1 max-w-20'
                                    style={{
                                        background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.5), transparent)',
                                    }}
                                />
                            </div>
                            
                            <p 
                                className='text-base sm:text-lg md:text-xl lg:text-2xl font-medium italic'
                                style={{
                                    fontFamily: "Georgia, serif",
                                    color: '#f0f0f1',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    letterSpacing: '0.03em',
                                }}
                            >
                                "A Government Inter College Established in 1992"
                            </p>

                            <div className='flex items-center justify-center gap-4 mt-3'>
                                <div 
                                    className='h-px flex-1 max-w-20'
                                    style={{
                                        background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.5), transparent)',
                                    }}
                                />
                                <div 
                                    className='text-2xl'
                                    style={{ color: '#DC2626' }}
                                >
                                    ✦
                                </div>
                                <div 
                                    className='h-px flex-1 max-w-20'
                                    style={{
                                        background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.5), transparent)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Excellence Badge - Red and Black */}
                        <div className='pt-4'>
                            <div 
                                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full'
                                style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid #DC2626',
                                    boxShadow: '0 4px 6px rgba(220, 38, 38, 0.2)',
                                }}
                            >
                                <span className='text-2xl'>🏆</span>
                                <span 
                                    className='text-sm md:text-base font-bold'
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        letterSpacing: '0.05em',
                                        background: 'linear-gradient(to right, #DC2626 0%, #991B1B 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    30+ YEARS OF EXCELLENCE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Logo with glow effect */}
                    <div className='shrink-0 relative group'>
                        <div 
                            className='absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity'
                            style={{
                                transform: 'scale(1.15)',
                            }}
                        />
                        <div className='relative bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-xl transform group-hover:scale-105 transition-transform duration-300'>
                            <Image
                                width={600}
                                height={600}
                                src={rightImageUrl}
                                alt='UP Board Logo'
                                className='w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain'
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom decorative wave */}
                <div 
                    className='absolute bottom-0 left-0 right-0 h-2'
                    style={{
                        background: 'linear-gradient(to right, #FFB703, #FB8500, #FFB703)',
                    }}
                />
            </div>
        </div>
    );
}
