'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/notices', label: 'Notices', icon: '📢' },
    { href: '/admin/study-materials', label: 'Study Materials', icon: '📚' },
    { href: '/admin/contacts', label: 'Contact Submissions', icon: '📧' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2
          className="text-xl font-bold"
          style={{ color: '#0B5FFF', fontFamily: 'Inter, sans-serif' }}
        >
          L.N.D. College
        </h2>
        <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={isActive ? { backgroundColor: '#0B5FFF' } : undefined}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
        >
          <span className="text-xl">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

