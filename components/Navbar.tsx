/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const supabase = createClient();
        let mounted = true;

        (async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (!mounted) return;
                setUser(data?.session?.user ?? null);
            } catch (e) {}
        })();

        const { data: sub } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            mounted = false;
            sub?.subscription?.unsubscribe?.();
        };
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        // redirect to login or home
        window.location.href = "/login";
    };

    const navLinks = [
        // { href: "/", label: "Home" },
        { href: "/subjects", label: "Subjects" },
        { href: "/notices", label: "Notice Board" },
        { href: "/resources", label: "Resources" },
        { href: "/contact", label: "Contact" },
        { href: "/gallery", label: "Gallery" },
    ];

    return (
        <nav className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 md:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* LEFT: Brand */}
                    <div className='flex items-center gap-6'>
                        <Link href='/' className='flex items-center gap-2'>
                            <span
                                className='text-xl md:text-2xl font-bold'
                                style={{
                                    color: "#0B5FFF",
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                AKIC Payandapur
                            </span>
                        </Link>

                        {/* DESKTOP LINKS */}
                        <div className='hidden md:flex space-x-6'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className='text-gray-700 hover:text-blue-600 transition font-medium'
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Login/Logout + Mobile Hamburger */}
                    <div className='flex items-center gap-3'>
                        {/* Desktop Login/Logout */}
                        <div className='hidden md:block'>
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className='px-4 py-2 rounded-lg bg-red-600 text-sm text-white hover:bg-red-700 transition'
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href='/login'
                                    className='px-4 py-2 rounded-lg bg-blue-600 text-sm text-white hover:bg-blue-700 transition'
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsOpen((s) => !s)}
                            className='md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800'
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            <svg
                                className='w-6 h-6'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                aria-hidden
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                ) : (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU: show links + login/logout */}
                {isOpen && (
                    <div className='md:hidden py-4 space-y-2 border-t border-gray-100'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className='block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className='px-4 pt-2'>
                            {user ? (
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleLogout();
                                    }}
                                    className='w-full text-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href='/login'
                                    onClick={() => setIsOpen(false)}
                                    className='w-full block text-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
