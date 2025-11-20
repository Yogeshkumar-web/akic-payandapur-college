"use client";

import React from "react";

interface SocialLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

export default function FooterTopStripe({
    socialLinks = [
        { name: "Facebook", href: "https://facebook.com" },
        { name: "Twitter", href: "https://twitter.com" },
        { name: "Instagram", href: "https://instagram.com" },
    ],
    email = "info@akicpayandapur.com",
}: {
    socialLinks?: SocialLink[];
    email?: string;
}) {
    return (
        <div className='w-full' style={{ backgroundColor: "#0B5FFF" }}>
            {/* thin stripe: use small height */}
            <div className='max-w-7xl mx-auto px-4 md:px-8 py-1 flex items-center justify-between text-white text-sm'>
                <div className='flex items-center space-x-4'>
                    {socialLinks.map((s) => (
                        <a
                            key={s.name}
                            href={s.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:underline flex items-center gap-2'
                            aria-label={s.name}
                        >
                            {/* simple circle icon with initials */}
                            <span className='w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs'>
                                {s.name[0]}
                            </span>
                            <span className='hidden sm:inline'>{s.name}</span>
                        </a>
                    ))}
                </div>

                <div className='text-right'>
                    {/* user asked: email NOT clickable */}
                    <span className='opacity-90'>{email}</span>
                </div>
            </div>
        </div>
    );
}
