"use client";

import React from "react";

interface SocialLink {
    name: string;
    href: string;
    icon: string;
}

export default function TopStripe({
    socialLinks = [
        { name: "Facebook", href: "https://facebook.com", icon: "📘" },
        { name: "Twitter", href: "https://twitter.com", icon: "🐦" },
        { name: "Instagram", href: "https://instagram.com", icon: "📸" },
        { name: "YouTube", href: "https://youtube.com", icon: "📺" },
    ],
    email = "info@akicpayandapur.com",
    phone = "+91 591 245 6789",
}: {
    socialLinks?: SocialLink[];
    email?: string;
    phone?: string;
}) {
    return (
        <div 
            className='w-full relative overflow-hidden'
            style={{ 
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)',
            }}
        >
            {/* Animated background pattern */}
            <div 
                className='absolute inset-0 opacity-10'
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Gradient overlay for depth */}
            <div 
                className='absolute inset-0'
                style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                }}
            />

            <div className='max-w-7xl mx-auto px-4 md:px-8 py-3 relative z-10'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4'>
                    {/* Left Section - Social Links */}
                    <div className='flex items-center gap-2 md:gap-3'>
                        <span 
                            className='hidden md:inline-block text-xs font-semibold text-white/90 mr-2'
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                letterSpacing: '0.05em',
                            }}
                        >
                            FOLLOW US:
                        </span>
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group relative'
                                aria-label={social.name}
                                title={social.name}
                            >
                                {/* Glow effect on hover */}
                                <div 
                                    className='absolute inset-0 bg-white rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300'
                                    style={{
                                        transform: 'scale(1.2)',
                                    }}
                                />
                                
                                {/* Icon container */}
                                <div 
                                    className='relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-0.5'
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <span className='text-lg'>{social.icon}</span>
                                    <span 
                                        className='hidden lg:inline text-xs font-medium text-white'
                                        style={{
                                            fontFamily: 'Nunito, sans-serif',
                                        }}
                                    >
                                        {social.name}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Right Section - Contact Info */}
                    <div className='flex items-center gap-4 md:gap-6'>
                        {/* Phone */}
                        <div className='flex items-center gap-2 group'>
                            <div 
                                className='flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:scale-110'
                                style={{
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                <span className='text-sm'>📞</span>
                            </div>
                            <a 
                                href={`tel:${phone.replace(/\s/g, '')}`}
                                className='text-xs md:text-sm font-medium text-white/95 hover:text-white transition-colors'
                                style={{
                                    fontFamily: 'Nunito, sans-serif',
                                }}
                            >
                                {phone}
                            </a>
                        </div>

                        {/* Divider */}
                        <div 
                            className='hidden sm:block w-px h-5'
                            style={{
                                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
                            }}
                        />

                        {/* Email */}
                        <div className='flex items-center gap-2 group'>
                            <div 
                                className='flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:scale-110'
                                style={{
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                <span className='text-sm'>✉️</span>
                            </div>
                            <a 
                                href={`mailto:${email}`}
                                className='text-xs md:text-sm font-medium text-white/95 hover:text-white transition-colors'
                                style={{
                                    fontFamily: 'Nunito, sans-serif',
                                }}
                            >
                                {email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div 
                className='h-1'
                style={{
                    background: 'linear-gradient(to right, #FFB703 0%, #FB8500 50%, #FFB703 100%)',
                }}
            />
        </div>
    );
}
