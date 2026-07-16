import Link from 'next/link'
import { signout } from '@/app/auth/actions'
import Button from '@/components/ui/Button'
import Navbar from '@/components/Navbar'

import { db } from '@/lib/db'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const userRole = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
    columns: {
      role: true,
    },
  })

  if (!userRole || userRole.role !== 'admin') {
    redirect('/')
  }

  const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/notices', label: 'Notices' },
    { href: '/admin/materials', label: 'Study Materials' },
    { href: '/admin/contact', label: 'Contact Queries' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFDF5]">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#EADFD2] bg-white md:block">
          <div className="p-6">
            <h1 className="font-[var(--font-inter)] text-2xl font-extrabold text-[#8B1E2D]">Admin Panel</h1>
          </div>
          <nav className="space-y-2 px-4">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block min-h-11 rounded-xl px-4 py-3 font-bold text-[#6F5555] transition hover:bg-[#FFF7D6] hover:text-[#8B1E2D]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="fixed bottom-0 w-64 border-t border-[#EADFD2] bg-white p-4">
            <form action={signout}>
              <Button variant="outline" className="w-full">
                Sign Out
              </Button>
            </form>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="bg-white shadow-sm md:hidden p-4 flex justify-between items-center">
              <h1 className="text-xl font-extrabold text-[#8B1E2D]">Admin Panel</h1>
          </header>
          <nav className="flex gap-2 overflow-x-auto border-b border-[#EADFD2] bg-white px-4 py-3 md:hidden [scrollbar-width:none]">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex min-h-10 shrink-0 items-center rounded-lg bg-[#FFFDF5] px-3 text-sm font-bold text-[#8B1E2D]">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
