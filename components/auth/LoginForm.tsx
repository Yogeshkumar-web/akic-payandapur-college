"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className='bg-white rounded-2xl shadow-lg p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
                        {error}
                    </div>
                )}

                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Email Address
                    </label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                        placeholder='admin@school.edu'
                    />
                </div>

                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                        placeholder='••••••••'
                    />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition'
                    style={{ backgroundColor: "#0B5FFF" }}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
