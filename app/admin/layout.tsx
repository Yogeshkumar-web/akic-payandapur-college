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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md shrink-0 hidden md:block">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
              Dashboard
            </Link>
            <Link href="/admin/notices" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
              Notices
            </Link>
            <Link href="/admin/materials" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
              Study Materials
            </Link>
            <Link href="/admin/contact" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
              Contact Queries
            </Link>
          </nav>
          <div className="absolute bottom-0 w-64 p-4 border-t">
            <form action={signout}>
              <Button variant="outline" className="w-full">
                Sign Out
              </Button>
            </form>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm md:hidden p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
              {/* Mobile menu button could go here */}
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
