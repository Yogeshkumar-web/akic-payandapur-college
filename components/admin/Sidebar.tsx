"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
    { href: "/admin", label: "Dashboard", icon: "🏠" },
    { href: "/admin/notices", label: "Notices", icon: "📢" },
    { href: "/admin/study-materials", label: "Materials", icon: "📚" },
    { href: "/admin/contacts", label: "Contacts", icon: "📧" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
    const pathname = usePathname() || "";

    return (
        <aside
            className='
            bg-white border-r h-screen
            flex flex-col
            w-16 md:w-64
            transition-all duration-200
        '
        >
            {/* BRAND AREA */}
            <div className='flex items-center justify-center md:justify-start px-2 md:px-6 py-4 border-b gap-3'>
                {/* MOBILE BRAND LOGO (only visible on small) */}
                <div className='w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-gray-900 font-bold md:hidden'>
                    AK
                </div>

                {/* DESKTOP BRAND TEXT */}
                <div className='hidden md:block'>
                    <div
                        className='text-base font-bold text-gray-900'
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        AKIC Payandapur
                    </div>
                    <div className='text-xs text-gray-500'>Admin</div>
                </div>
            </div>

            {/* NAV LINKS */}
            <nav className='flex-1 overflow-y-auto'>
                <ul className='py-3 space-y-1'>
                    {links.map((l) => {
                        const active =
                            pathname === l.href ||
                            pathname.startsWith(l.href + "/");

                        return (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    title={l.label}
                                    className={`
                                        group
                                        flex items-center gap-3
                                        px-3 py-2 md:px-6
                                        ${
                                            active
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }
                                        transition-colors rounded-md mx-2 md:mx-4
                                    `}
                                >
                                    {/* ICON (always visible) */}
                                    <span
                                        className={`
                                            flex items-center justify-center
                                            w-8 h-8 rounded-md
                                            ${active ? "bg-blue-100" : ""}
                                            text-lg
                                        `}
                                    >
                                        {l.icon}
                                    </span>

                                    {/* LABEL (hidden on mobile) */}
                                    <span
                                        className='hidden md:inline font-medium'
                                        style={{
                                            fontFamily: "Nunito, sans-serif",
                                        }}
                                    >
                                        {l.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// export default function Sidebar() {
//     const pathname = usePathname();
//     const router = useRouter();

//     const handleLogout = async () => {
//         const supabase = createClient();
//         await supabase.auth.signOut();
//         router.push("/login");
//         router.refresh();
//     };

//     const menuItems = [
//         { href: "/admin", label: "Dashboard", icon: "📊" },
//         { href: "/admin/notices", label: "Notices", icon: "📢" },
//         {
//             href: "/admin/study-materials",
//             label: "Study Materials",
//             icon: "📚",
//         },
//         { href: "/admin/contacts", label: "Contact Submissions", icon: "📧" },
//     ];

//     return (
//         <aside className='w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col'>
//             <div className='p-6 border-b'>
//                 <h2
//                     className='text-xl font-bold'
//                     style={{
//                         color: "#0B5FFF",
//                         fontFamily: "Inter, sans-serif",
//                     }}
//                 >
//                     AKIC Payandapur
//                 </h2>
//                 <p className='text-sm text-gray-600 mt-1'>Admin Panel</p>
//             </div>

//             <nav className='flex-1 p-4'>
//                 <ul className='space-y-2'>
//                     {menuItems.map((item) => {
//                         const isActive = pathname === item.href;
//                         return (
//                             <li key={item.href}>
//                                 <Link
//                                     href={item.href}
//                                     className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
//                                         isActive
//                                             ? "text-white"
//                                             : "text-gray-700 hover:bg-gray-100"
//                                     }`}
//                                     style={
//                                         isActive
//                                             ? { backgroundColor: "#0B5FFF" }
//                                             : undefined
//                                     }
//                                 >
//                                     <span className='text-xl'>{item.icon}</span>
//                                     <span className='font-medium'>
//                                         {item.label}
//                                     </span>
//                                 </Link>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </nav>

//             <div className='p-4 border-t'>
//                 <button
//                     onClick={handleLogout}
//                     className='w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition'
//                 >
//                     <span className='text-xl'>🚪</span>
//                     <span className='font-medium'>Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// }
